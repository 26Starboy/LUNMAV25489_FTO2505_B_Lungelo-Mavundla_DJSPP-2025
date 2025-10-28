// Example: src/components/SearchBar.jsx
export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-bar"
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search podcasts..."
    />
  )
}