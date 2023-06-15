import { CharItemType } from '../../types/CharItemType';

const RandomView = ({
  char,
  replasedDescription,
}: {
  char: CharItemType;
  replasedDescription: string;
}) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const emptyThumbnail =
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={{
          objectFit: `${description === emptyThumbnail ? 'cover' : 'contain'}`,
        }}
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
  );
};

export default RandomView;
