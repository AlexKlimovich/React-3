interface Props {
  nameFilter: string;
  ratingFilter: string;
  showOnlyFavorites: boolean;
  onNameChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onToggleFavorites: () => void;
}

export function SearchFilter({
  nameFilter,
  ratingFilter,
  showOnlyFavorites,
  onNameChange,
  onRatingChange,
  onToggleFavorites,
}: Props) {
  return (
    <div className="searchPoint">
      <div>
        <h2 className="secondHeadline">Найти место</h2>
      </div>
      <div className="form-field">
        <label className="textContent">Название места: </label>
        <br />
        <input
          type="text"
          className="fieldStyle"
          value={nameFilter}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label className="textContent">Рейтинг места: </label>
        <select
          value={ratingFilter}
          onChange={(e) => onRatingChange(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>
        </select>
      </div>
      <button className="favBtn" onClick={onToggleFavorites}>
        {showOnlyFavorites ? 'Показать все' : 'Показать избранное'}
      </button>
    </div>
  );
}
