// src/components/SortSelect.jsx

// Props:
// - value: the currently selected sort option
// - onChange: function to update the selected sort option
export default function SortSelect({ value, onChange }) {
  return (
    // ----------------------------
    // Render a select dropdown for sorting options
    // ----------------------------
    <select
      className="sort-select"       // CSS class for styling
      value={value}                 // Controlled component: reflects current sort value
      onChange={e => onChange(e.target.value)} // Call parent handler on change
    >
      {/* Sort options */}
      <option value="a-z">A-Z</option>
      <option value="z-a">Z-A</option>
      <option value="old-new">Oldest to Newest</option>
      <option value="new-old">Newest to Oldest</option>
    </select>
  )
}
