import { useCallback, useEffect, useState } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { CharItemType } from '../../types/CharItemType';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import List from './List';

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

  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = !(isLoading || isError) ? (
    <List charList={charList} onChartSelected={onChartSelected} />
  ) : null;

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
