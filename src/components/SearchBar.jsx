// src/components/SearchBar.jsx

// Props:
// - value: current input text
// - onChange: callback to update search state
export default function SearchBar({ value, onChange }) {
  return (
    // ----------------------------
    // Input field for searching podcasts
    // ----------------------------
    <input
      className="search-bar"          // CSS styling
      type="text"                     // Text input
      value={value}                   // Controlled input value
      onChange={e => onChange(e.target.value)} // Update state on input change
      placeholder="Search podcasts..." // Placeholder text
    />
  )
}
