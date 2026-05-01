# 🎬 Movie Hub

https://movie-tracker-app-chi.vercel.app/

---

## Overview

Movie Hub is a React-based web app that allows users to browse, search, and save their favorite movies. It integrates with the TMDB API to display real-time movie data and demonstrates core front-end development concepts like state management, API handling, and conditional rendering.

---
## Screenshots
<img width="1833" height="883" alt="image" src="https://github.com/user-attachments/assets/652cf5d0-0acb-415c-836b-f2cda4c187fb" />

<img width="1692" height="827" alt="image" src="https://github.com/user-attachments/assets/ee165ac9-ab8f-4cc0-9fdd-d2e5d7458e77" />

<img width="1869" height="899" alt="image" src="https://github.com/user-attachments/assets/0e23f6a6-2ccf-4c30-8da2-4c963b7f8e7e" />



## Features

* Browse popular movies on load
* Search for movies with dynamic results
* Flip card UI to view additional movie details
* Login system (client-side authentication simulation)
* Add/remove favorites
* Favorites persist during session
* Responsive layout for desktop and mobile

---

## Tech Stack

* **React (Vite)**
* **JavaScript (ES6+)**
* **CSS**
* **TMDB API**
* **Vercel (deployment)**

---

## Key Concepts Demonstrated

* API integration using fetch
* State management with `useState` and `useEffect`
* Conditional rendering based on login state
* Event handling and component interaction
* Separation of concerns (UI vs logic)
* Environment variables for secure API handling

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

Clone the repo:

```
git clone https://github.com/Mattlambo/movie-tracker-app.git
cd movie-tracker-app
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root:

```
VITE_TMDB_TOKEN=your_tmdb_token_here
```

---

## What I Learned

* How to structure a React project using Vite
* Handling asynchronous API calls and loading states
* Managing UI state vs application state
* Debugging environment variable issues in production
* Deploying a React app with Vercel

---

## Future Improvements

* Persist favorites with localStorage
* Add pagination or infinite scroll
* Enhance authentication flow

---

## Author

Matt Lambo
GitHub: https://github.com/Mattlambo
