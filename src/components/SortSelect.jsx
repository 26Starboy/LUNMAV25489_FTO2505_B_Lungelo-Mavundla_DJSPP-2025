export default function SortSelect({ value, onChange }) {
  return (
    <select className="sort-select" value={value} onChange={e => onChange(e.target.value)}>
      <option value="a-z">A-Z</option>
      <option value="z-a">Z-A</option>
      <option value="old-new">Oldest to Newest</option>
      <option value="new-old">Newest to Oldest</option>
    </select>
  )
}