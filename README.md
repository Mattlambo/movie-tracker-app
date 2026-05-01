# 🎬 Movie Hub

https://movie-tracker-app-chi.vercel.app/

---

## Overview

Movie Hub is a React application that allows users to browse and search movies using the TMDB API, with a client-side login system and an interactive UI for managing favorites.

The project focuses on handling real-world front-end concerns such as API data flow, state synchronization, and UI feedback based on user interaction.

---

## Screenshots

<img width="1833" height="883" alt="image" src="https://github.com/user-attachments/assets/652cf5d0-0acb-415c-836b-f2cda4c187fb" />

<img width="1692" height="827" alt="image" src="https://github.com/user-attachments/assets/ee165ac9-ab8f-4cc0-9fdd-d2e5d7458e77" />

<img width="1869" height="899" alt="image" src="https://github.com/user-attachments/assets/0e23f6a6-2ccf-4c30-8da2-4c963b7f8e7e" />

---

## Features

* Browse trending movies on initial load via TMDB API
* Search functionality with dynamic query updates
* Flip-card UI to reveal additional movie details
* Client-side login simulation with conditional UI rendering
* Add/remove favorites with immediate visual feedback
* Favorites persist using localStorage
* Responsive layout for mobile and desktop

---

## Tech Stack

* **React (Vite)**
* **JavaScript (ES6+)**
* **CSS**
* **TMDB API**
* **Vercel (deployment)**

---

## Key Concepts Demonstrated

* API integration using `fetch`
* State management with `useState` and `useEffect`
* Conditional rendering based on login state
* Event handling and component interaction
* Separation of concerns (UI vs logic)
* Environment variables for secure API handling

---

## Key Design Decisions

* Used `localStorage` for lightweight persistence without introducing backend complexity
* Chose a flip-card UI to display additional movie details without navigating away
* Centralized API calls in `App.jsx` to maintain a single source of truth for movie data

---

## Challenges & Solutions

* **Production Deployment Issue (Vercel)**

  * The app built successfully locally but failed in production due to case-sensitive file paths
  * Windows development environment did not catch incorrect SVG import casing, while Vercel (Linux) required exact matches
  * Resolved by aligning file names and import statements exactly, reinforcing cross-environment consistency

---

## Project Structure

```
src/
  ├── App.jsx
  ├── MovieCard.jsx
  ├── login.jsx
  ├── main.jsx
  ├── App.css
  ├── index.css
```

---

## Getting Started

```bash
git clone https://github.com/Mattlambo/movie-tracker-app.git
cd movie-tracker-app
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_TMDB_TOKEN=your_tmdb_token_here
```

---

## What I Learned

* Managing data flow from API → state → UI in a React application
* Structuring components to separate presentation and logic
* Handling conditional rendering based on authentication state
* Debugging production-only issues caused by environment differences
* Importance of consistent file naming and validating builds before deployment

---

## Future Improvements

* Add pagination or infinite scroll
* Improve authentication with a backend solution
* Enhance UI feedback for loading and error states

---

## Author

Matt Lambo
GitHub: https://github.com/Mattlambo
