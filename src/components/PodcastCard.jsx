import { Link } from "react-router-dom";

const PodcastCard = ({ id, title, description, genre, seasons, updated, image }) => {
  const shortDescription =
    description?.length > 100 ? description.slice(0, 100) + "..." : description;
  const formattedDate = updated
    ? new Date(updated).toLocaleDateString()
    : "Unknown";

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{shortDescription}</p>
        <p className="text-xs text-gray-500">Genre: {genre}</p>
        <p className="text-xs text-gray-500">Seasons: {seasons}</p>
        <p className="text-xs text-gray-400">Last updated: {formattedDate}</p>

        <Link
          to={`/show/${id}`}
          className="mt-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600 self-start"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PodcastCard;
