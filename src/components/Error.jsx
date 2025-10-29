// src/components/Error.jsx
// Displays an error message

export default function Error({ message }) {
  return (
    <div className="error">
      {/* Show the passed error message */}
      Error: {message}
    </div>
  )
}
