# Contact Manager Application

This project is a Contact Manager application with a React-based frontend and a Node.js/Express backend, utilizing SQLite for data storage. It allows users to perform CRUD (Create, Read, Update, Delete) operations on their contacts.

## Live Links

- **Frontend:** [https://contact-manager-by-sairam.onrender.com](https://contact-manager-by-sairam.onrender.com)
- **Backend:** [https://contact-manager-nxtwave.onrender.com](https://contact-manager-nxtwave.onrender.com)

## Features

- **Display Contacts List:** View all saved contacts.
- **Add a Contact:** Fill out a form to add a new contact (name, email, phone).
- **Edit Contact:** Update existing contact details.
- **Delete Contact:** Remove contacts from the list.
- **Responsive UI:** Optimized for mobile, tablet, and desktop screens.
- **Modern & Minimal UI:** Clean and visually appealing interface.
- **User Feedback:** Displays success/error messages after operations.

## Technologies Used

### Frontend

- **React:** JavaScript library for building user interfaces.
- **Axios:** Promise-based HTTP client for API requests.
- **CSS:** Styling components for a responsive design.

### Backend

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web framework for Node.js.
- **SQLite3:** Lightweight, file-based relational database.
- **Knex.js:** SQL query builder for database interactions.
- **CORS:** Middleware to handle Cross-Origin Resource Sharing.
- **dotenv:** Module to load environment variables.

## Installation

To run the application locally, follow these steps:

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SaiRamaKrishnaa/contact-manager-backend.git
   cd contact-manager-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   ```

4. **Run database migrations:**

   ```bash
   npx knex migrate:latest
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../contact-manager-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   The frontend application will run on `http://localhost:3001`.

