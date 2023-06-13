import { useCallback, useEffect, useState } from 'react';
import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../assets/img/mjolnir.png';

interface RandomCharProps {
  name: string;
  description: string;
  thumbnail: string;
  homepage: string;
  wiki: string;
}

const initialPageData = {
  name: '',
  description: '',
  thumbnail: '',
  homepage: '',
  wiki: '',
};

const RandomChar = () => {
  const [char, setChar] = useState<RandomCharProps>(initialPageData);

  const { name, description, thumbnail, homepage, wiki } = char;

  const replasedDescription = `Too mysterious a character...`;

  const marvelService = new MarvelService();

  const onCharLoaded = (incomingChar: RandomCharProps) => {
    setChar(incomingChar);
  };

  const handleUpdateChar = useCallback(() => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    marvelService
      .getCharacter(id)
      .then(onCharLoaded)
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    handleUpdateChar();
  }, []);

  useEffect(() => {
    if (description.length >= 180) {
      const replacedStr = `${description.slice(0, 170)}...`;
      setChar({ ...char, description: replacedStr });
    }
  }, [description]);

  return (
    <div className="randomchar">
      <div className="randomchar__block">
        <img
          src={thumbnail}
          alt="Random character"
          className="randomchar__img"
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr">
            {description.length > 0 ? description : replasedDescription}
          </p>
          <div className="randomchar__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
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
