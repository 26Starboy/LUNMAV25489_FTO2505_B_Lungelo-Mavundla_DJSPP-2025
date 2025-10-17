import React from 'react';

const SortControls = ({ onSortChange, onGroupChange, groups }) => (
  <div className="sort-controls">
    <label>Sort by:</label>
    <select onChange={e => onSortChange(e.target.value)}>
      <option value="newest">Newest Added</option>
      <option value="oldest">Oldest Added</option>
      <option value="az">Title A–Z</option>
      <option value="za">Title Z–A</option>
    </select>

    <label>All Shows:</label>
    <select onChange={e => onGroupChange(e.target.value)}>
      <option value="all">All Shows</option>
      {groups.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
  </div>
);

export default SortControls;
