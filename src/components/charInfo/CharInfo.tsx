import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import { useCallback, useEffect, useState } from 'react';
import { CharItemType } from '../../types/CharItemType';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import Char from './Char';

const initialPageData = null;

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
