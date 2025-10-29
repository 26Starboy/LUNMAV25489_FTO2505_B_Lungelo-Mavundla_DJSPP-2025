# Podcast Explorer

**Lungelo Mavundla – DJSPP-2025**

Podcast Explorer is a fully responsive web application built with React, Zustand, and React Router that allows users to browse, search, filter, and play podcasts. Users can also save favorites, track listening progress, and toggle between light and dark themes.

---

## Table of Contents

- Demo
- Features
- Tech Stack
- Project Structure
- Installation
- Available Scripts
- Components Overview
- State Management
- API
- Styling & Responsiveness
- Future Improvements

---

## Demo

*(Optional: Add a live demo link if hosted on Vercel or Netlify)*

---

## Features

- Browse Podcasts: View a grid of all available podcasts with images, titles, genres, and last updated info.
- Search & Filter: Search podcasts by title, filter by genre, and sort by alphabetical or date order.
- Recommended Carousel: A Swiper carousel shows top podcasts based on current filtered results.
- Podcast Detail Modal: View a podcast’s description, genres, seasons, episodes, and metadata.
- Audio Playback: Play, pause, resume, and seek episodes with progress tracking.
- Favorites: Mark episodes or shows as favorites and view them in a dedicated Favorites page.
- Global Player: Persistent audio player at the bottom of the page showing currently playing episode.
- Light/Dark Mode: Toggle the theme with a global theme button.
- Episode Progress Tracking: Resume playback from where you left off.

---

## Tech Stack

- React – UI library for building components
- React Router DOM – Routing between pages
- Zustand – Lightweight state management
- Swiper – Carousel for recommended podcasts
- HTML5 Audio API – For audio playback
- CSS – Custom styling
- Netlify API – Fetch podcasts from a placeholder API

---

## Project Structure

src/
├── api/          # Functions to fetch podcasts
├── components/   # Reusable UI components
├── pages/        # Page-level components: Home, ShowDetail, Favourites
├── store/        # Zustand stores for global state
└── data/         # Static genre data
