// src/components/GenreFilter.jsx
// Dropdown to filter podcasts by genre

export default function GenreFilter({ genres, value, onChange }) {
  return (
    <select
      className="genre-filter"
      value={value}
      onChange={e => onChange(e.target.value)} // Notify parent of the selected genre
    >
      {/* Default option for no filtering */}
      <option value="">All Genres</option>

      {/* Map all available genres into dropdown options */}
      {genres.map(g => (
        <option key={g.id} value={g.title}>
          {g.title}
        </option>
      ))}
    </select>
  )
}
