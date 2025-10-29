import React from 'react' // @import React library for building UI components
import ReactDOM from 'react-dom/client' // @import Renders React components into the DOM
import { BrowserRouter } from 'react-router-dom' // @import Enables client-side routing
import App from './App.jsx' // @import Main application component
import './styles/App.css' // @import Global stylesheet

// Create the React root and render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* React dev helper that highlights potential issues */}
    <BrowserRouter> {/* Wraps App to enable routing */}
      <App /> {/* Main application */}
    </BrowserRouter>
  </React.StrictMode>
)
