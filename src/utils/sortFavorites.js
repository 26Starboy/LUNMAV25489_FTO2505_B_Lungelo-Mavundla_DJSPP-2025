export const sortFavorites = (favorites, sortBy) => {
  let sorted = [...favorites];
  switch (sortBy) {
    case 'newest':
      sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      break;
    case 'oldest':
      sorted.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
      break;
    case 'az':
      sorted.sort((a, b) => a.episodeTitle.localeCompare(b.episodeTitle));
      break;
    case 'za':
      sorted.sort((a, b) => b.episodeTitle.localeCompare(a.episodeTitle));
      break;
    default:
      break;
  }
  return sorted;
};