# Posts and Comments Viewer

A single-page application that displays posts and their comments from JSONPlaceholder API.

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/HaruYQing/vera-assignment.git
   cd vera-assignment
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create an `.env` file in the root directory with the following content:

   ```
   VITE_LOGGED_IN_USER_EMAIL=Eliseo@gardner.biz
   ```

   This simulates an authenticated user who can delete their own comments.

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

## Features Included

### Main Page

- Displays all posts in a table with the following columns:
  - Index (Auto-incremented ID)
  - Title (Clickable to navigate to post details)
  - User (Name)
- Implemented a Refresh button with an icon that fetches updated data from the API
- Added responsive design with a maximum width of 1600px
- Applied custom MUI styling for components

### Post Details Page

- Shows detailed information about the selected post:
  - Title
  - User (Name)
  - Body
- Comments section displays all comments associated with the post
- Comments are structured in a list showing:
  - Name
  - Body

### Authentication and User Features

- Simulated authentication using environment variables
- Users can delete comments, but only if they were posted by the currently logged-in user (identified by email)
- Added confirmation dialog before comment deletion

### Technical Implementation

- Built with React and TypeScript for type safety
- Used React Router for navigation between pages
- Implemented Material UI components for consistent styling
- Created a responsive layout that works well on different screen sizes
- Utilized Context API for auth state management
- Implemented error handling for API requests

### Optional Enhancements Implemented

- Added pagination on the main posts table for improved data handling
- Implemented authentication simulation via environment variables
- Restricted comment deletion to the logged-in user's own comments
- Added confirmation dialog before deletion

## Development Notes

- The application uses JSONPlaceholder as a mock API, which means that while delete operations appear to work, they don't actually modify the server data.
- For demonstration purposes, the email "Eliseo@gardner.biz" is used to simulate a logged-in user. This user can delete their own comments (the first comment on the first post).

## Development Process

This project was completed over several shorter work sessions, totaling approximately one full working day of effort.
