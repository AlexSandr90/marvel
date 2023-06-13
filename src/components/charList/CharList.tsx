import { useCallback, useEffect, useState } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { CharItemType } from '../../types/CharItemType';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = ({ onChartSelected }: { onChartSelected: any }) => {
  const [charList, setCharList] = useState<CharItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const marvelServise = new MarvelService();

  const onCharListLoaded = (charListLoaded: CharItemType[]) => {
    setCharList(charListLoaded);
    setIsLoading(false);
    setIsError(false);
  };

  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  const handleCharListLoaded = useCallback(() => {
    marvelServise.getAllCharacters().then(onCharListLoaded).catch(onError);
  }, []);

  useEffect(() => {
    handleCharListLoaded();
  }, []);

  const renderChars = useCallback(() => {
    const charItems = charList.map((char: CharItemType) => {
      const { id, thumbnail, name } = char;
      const emptyThumbnail: string =
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

      return (
        <li className="char__item" key={id} onClick={() => onChartSelected(id)}>
          <img
            src={thumbnail}
            alt={name}
            style={{
              objectFit: `${thumbnail === emptyThumbnail ? 'unset' : 'cover'}`,
            }}
          />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{charItems}</ul>;
  }, [charList]);

  const chars = renderChars();

  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = !(isLoading || isError) ? chars : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}

      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
