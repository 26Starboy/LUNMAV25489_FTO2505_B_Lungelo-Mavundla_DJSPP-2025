export default function GenreFilter({ genres, value, onChange }) {
  return (
    <select className="genre-filter" value={value} onChange={e => onChange(e.target.value)}>
      <option value="">All Genres</option>
      {genres.map(g => (
        <option key={g.id} value={g.title}>
          {g.title}
        </option>
      ))}
    </select>
  )
}