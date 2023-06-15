import { useCallback, useEffect, useState } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { CharItemType } from '../../types/CharItemType';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import List from './List';

type CharListProps = {
  charList: CharItemType[];
  isLoading: boolean;
  isPaginateLoading: boolean;
  isError: boolean;
  isEnded: boolean;
  pageOffset: number;
};

const initialState = {
  charList: [],
  isLoading: true,
  isPaginateLoading: false,
  isError: false,
  isEnded: false,
  pageOffset: 0,
};

const CharList = ({ onChartSelected }: { onChartSelected: any }) => {
  const [charListState, setCharListState] =
    useState<CharListProps>(initialState);

  const {
    isError,
    isEnded,
    charList,
    isLoading,
    pageOffset,
    isPaginateLoading,
  } = charListState;

  const marvelServise = new MarvelService();

  const onCharListLoaded = useCallback((charListLoaded: CharItemType[]) => {
    let ended = false;
    if (charListLoaded.length < 9) {
      ended = true;
    }
    setCharListState((prevState: CharListProps) => {
      return {
        ...prevState,
        charList: [...prevState.charList, ...charListLoaded],
        isLoading: false,
        isError: false,
        isPaginateLoading: false,
        isEnded: ended,
      };
    });
  }, []);

  const onError = () => {
    setCharListState((prevState: CharListProps) => {
      return {
        ...prevState,
        isLoading: false,
        isError: true,
      };
    });
  };

  const handleCharListLoaded = useCallback((offset: number) => {
    marvelServise
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError);
  }, []);

  const onPageCount = () => {
    setCharListState((prevState: CharListProps) => {
      return {
        ...prevState,
        isPaginateLoading: true,
        pageOffset: prevState.pageOffset + 9,
      };
    });
  };

  useEffect(() => {
    handleCharListLoaded(pageOffset);
  }, [pageOffset]);

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

      <button
        onClick={onPageCount}
        disabled={isPaginateLoading}
        className="button button__main button__long"
        style={{ display: `${isEnded ? 'none' : 'block'}` }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
