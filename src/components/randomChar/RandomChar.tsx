import { useCallback, useEffect, useState } from 'react';
import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import mjolnir from '../../assets/img/mjolnir.png';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { CharItemType } from '../../types/CharItemType';
import RandomView from './RandomView';

const initialPageData = {
  name: '',
  description: '',
  thumbnail: '',
  homepage: '',
  wiki: '',
};

const RandomChar = () => {
  const [char, setChar] = useState<CharItemType>(initialPageData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { description } = char;

  const replasedDescription = `Too mysterious a character...`;

  const marvelService = new MarvelService();

  const onCharLoaded = (incomingChar: CharItemType) => {
    setChar(incomingChar);
    setIsLoading(false);
    setIsError(false);
  };

  const onError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  const handleUpdateChar = useCallback(() => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    setIsLoading(true);
    marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
  }, []);

  useEffect(() => {
    handleUpdateChar();

    // const intervalId = setInterval(() => handleUpdateChar(), 3000);
    // return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (description.length >= 180) {
      const replacedStr = `${description.slice(0, 170)}...`;
      setChar({ ...char, description: replacedStr });
    }
  }, [description]);

  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = !(isLoading || isError) ? (
    <RandomView char={char} replasedDescription={replasedDescription} />
  ) : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={handleUpdateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;
