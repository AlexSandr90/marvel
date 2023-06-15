import { CharItemType } from '../../types/CharItemType';

const List = ({
  charList,
  onChartSelected,
}: {
  charList: CharItemType[];
  onChartSelected: (id: string | undefined) => void;
}) => {
  const charItems = charList.map((char: CharItemType) => {
    const { id, thumbnail, name } = char;
    const emptyThumbnail: string =
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    return (
      <li
        className="char__item"
        key={id}
        onClick={() => {
          onChartSelected(id);
        }}
      >
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
};

export default List;
