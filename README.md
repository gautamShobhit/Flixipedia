# Flixipedia - AI-Powered Movie Recommendation Engine

## Project Overview

Flixipedia is a cutting-edge movie recommendation platform that leverages the power of AI (specifically Google Gemini and Groq) to provide personalized movie suggestions. Users can simply type in a prompt describing their mood, preferences, or any specific criteria, and Flixipedia will generate a list of recommended movies along with a brief reason for each suggestion. The application integrates with The Movie Database (TMDB) to fetch comprehensive movie details, including posters, plot summaries, release dates, and ratings.

## Features

- **AI-Powered Recommendations:** Get personalized movie suggestions based on natural language prompts using Gemini AI and Groq.
- **Detailed Movie Information:** View comprehensive details for each recommended movie, including poster, title, overview, release date, and average ratings from TMDB.
- **Recommendation Reasons:** Understand _why_ a movie is recommended with a concise AI-generated reason.
- **Responsive Search Interface:** A user-friendly and responsive search bar with debouncing, client-side caching, and graceful rate-limit handling for a smooth experience.
- **Redux for State Management:** Efficient and predictable state management using Redux Toolkit.
- **Fallback AI Provider:** Seamlessly switches to Groq if the primary Gemini AI service encounters issues.

## Technologies Used

- **Frontend:**
  - React.js
  - Redux Toolkit (for state management)
  - Tailwind CSS (for styling)
  - React Router DOM (for navigation)
- **Backend (API Route):**
  - Node.js
  - Google Gemini API (Primary AI model)
  - Groq API (Fallback AI model)
  - The Movie Database (TMDB) API

## Setup Instructions

Follow these steps to get Flixipedia up and running on your local machine:

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd FLIXIPEDIA
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Obtain API Keys

Flixipedia requires API keys for the following services:

- **Google Gemini API:** Obtain your API key from the [Google AI Studio](https://ai.google.dev/).
- **Groq API:** Obtain your API key from the [Groq Console](https://console.groq.com/).
- **The Movie Database (TMDB) API:** Register for an API key on the [TMDB website](https://developers.themoviedb.org/3/getting-started/introduction).

### 4. Configure Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```
VITE_TMDB_KEY="YOUR_TMDB_API_KEY"
VITE_APP_GEMINI_KEY="YOUR_GEMINI_API_KEY"
VITE_APP_GROQ_KEY="YOUR_GROQ_API_KEY"
```

Replace `"YOUR_TMDB_API_KEY"`, `"YOUR_GEMINI_API_KEY"`, and `"YOUR_GROQ_API_KEY"` with your actual API keys.

### 5. Run the Application

```bash
npm start
# or
yarn start
```

The application will typically open in your browser at `http://localhost:3000`.

## Usage

1.  **Enter a Movie Prompt:** In the search bar, type a description of the movies you're looking for (e.g., "action movies with a strong female lead," "sci-fi thrillers from the 90s," "feel-good romantic comedies").
2.  **View Recommendations:** The AI will process your request and display a list of recommended movies with a brief explanation for each.
3.  **Explore Movie Details:** Click on any movie tile to view more detailed information about that movie from TMDB.

## Future Enhancements (Optional)

- User authentication and personalized watchlists.
- Advanced filtering and sorting options for recommendations.
- Integration with other movie streaming services.
- Ability to rate movies and provide feedback to improve AI recommendations.
- Dark mode/light mode toggle.
