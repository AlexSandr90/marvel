import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import { useCallback, useEffect, useState } from 'react';
import { CharItemType } from '../../types/CharItemType';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

const initialPageData = null;

type ComicsType = { resourceURI: string; name: string };

const Char = ({ charInfo }: any) => {
  const { comics, thumbnail, name, homepage, description, wiki } = charInfo;

  const emptyThumbnail =
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={{
            objectFit: `${
              description === emptyThumbnail ? 'cover' : 'contain'
            }`,
          }}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>

      <div className="char__descr">
        {description
          ? description
          : 'There is no description to this character'}
      </div>

      <div className="char__comics">Comics: </div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics?.map((char: ComicsType, index: number) => {
          return index <= 9 ? (
            <li className="char__comics-item" key={char.name}>
              {char.name}
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
};

const CharInfo = ({ charId }: { charId: any }) => {
  const [charInfo, setCharInfo] = useState<CharItemType | null>(
    initialPageData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    handleLoadCharInfo(charId);
  }, [charId]);

  const updateChar = (char: CharItemType) => {
    setCharInfo(char);
    setIsLoading(false);
    setIsError(false);
  };

  const onError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  const handleLoadCharInfo = useCallback((id: any) => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    marvelService
      .getCharacter(id)
      .then((res) => {
        updateChar(res);
      })
      .catch((error) => onError());
  }, []);

  const skeleton = charInfo || isLoading || isError ? null : <Skeleton />;
  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = !(isLoading || isError || !charInfo) ? (
    <Char charInfo={charInfo} />
  ) : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default CharInfo;
