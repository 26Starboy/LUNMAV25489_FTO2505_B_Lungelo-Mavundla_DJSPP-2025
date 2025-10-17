/**
 * GroupHeader.jsx
 * Component to display the header for a group of favorite episodes
 */

import React from 'react';

/**
 * GroupHeader component
 * @param {Object} props
 * @param {string} props.title - Show title
 * @param {number} props.count - Number of episodes in the group
 * @returns {JSX.Element}
 */
const GroupHeader = ({ title, count }) => {
  return (
    <div className="group-header" role="heading" aria-level="2">
      <h2>{title} ({count} episodes)</h2>
    </div>
  );
};

export default GroupHeader;
