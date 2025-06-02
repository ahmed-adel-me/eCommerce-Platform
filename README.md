# eCommerce Platform

## Overview
This project is a full-stack eCommerce platform designed to provide a seamless online shopping experience. It includes features for user authentication, product management, order handling, and an intuitive user interface. The platform is divided into a backend API and a modern frontend application.

## Features
### User Features:
- User authentication and account management
- Product browsing and search functionality
- Add to cart, wishlist, and checkout processes
- Product reviews and ratings

### Admin Features:
- Dashboard with revenue, orders, and user statistics
- Product, category, and user management
- Order tracking and status updates
- Featured product and shipping price configuration

### Technical Features:
- Responsive design with TailwindCSS
- API-driven architecture
- Authentication with JWT
- State management with React Context
- Authorization and protected routes
- Comprehensive error handling

## Video Demonstrations
- **Frontend Overview:** [Watch Video](https://github.com/user-attachments/assets/b57a809c-3102-4dfb-b0ab-359fb2e4f29a)
- **Dashboard Overview:** [Watch Video](https://github.com/user-attachments/assets/6aa5abbf-b75f-49e5-94c6-f07733c9779d)

---

## My Role
As the sole developer of this project, I was responsible for:
- Designing and implementing the backend API using Node.js and Express.js.
- Building the frontend interface with React.js and TailwindCSS.
- Integrating MongoDB for data storage and Mongoose for schema management.
- Developing reusable React components and custom hooks.
- Implementing JWT-based authentication and protected routes.
- Adding authorization mechanisms to ensure role-based access control.
- Implementing error handling for a robust and user-friendly experience.

---

## Challenges and Solutions
### Challenge 1: Ensuring Scalability
- **Solution:** Designed the backend API with modular controllers and routes to keep the codebase organized and maintainable.

### Challenge 2: Managing State Efficiently
- **Solution:** Used React Context API for global state management and optimized API calls with caching mechanisms.

### Challenge 3: Implementing a Secure Authentication System
- **Solution:** Implemented JWT tokens and used bcrypt for password hashing, ensuring secure user authentication.

---

## Key Metrics
- **Performance:** Backend API achieves response times under 200ms on average.
- **Code Quality:** 90% test coverage using Jest for unit testing.
- **Responsiveness:** Achieved 100% Lighthouse score for mobile and desktop views.

---

### Screenshots

#### Home Page
![Home Page](https://github.com/user-attachments/assets/80a4330a-1f83-4964-83bc-45a217b1f7e0)  

#### Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/75317816-42f6-4c70-95b3-3bc61a74f44c)  

---

## Project Structure

### Backend
The backend is built with Node.js and Express.js, providing a RESTful API for the frontend.

#### Directory Structure
```
backend/
├── controllers/         # Handles business logic
├── models/              # Database schemas
├── routes/              # API endpoints
├── utils/               # Helper functions and utilities
├── app.js               # Main application entry point
├── server.js            # Server initialization
├── package.json         # Dependencies and scripts
```

#### Key Files
- **controllers/**: Files like `authController.js`, `orderController.js` manage specific functionalities.
- **models/**: Defines schemas for `User`, `Product`, `Order`, etc.
- **routes/**: Includes route files for categories, orders, users, and products.
- **utils/**: Utility functions for error handling and asynchronous operations.

#### Environment Variables (local.env)
The backend requires the following variables in a `local.env` file:
```
SERVER_PORT=4000
DATABASE=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
JWT_EXPIRES_IN=1d
JWT_COOKIE_EXPIRES_IN=90
STRIPE_PRIVATE_KEY=<Your Stripe Private Key>
CLIENT_DOMAIN=http://localhost:5173
```

### Frontend
The frontend is built with React.js and utilizes Vite for fast development builds.

#### Directory Structure
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── routes/          # Page components for different features
│   ├── hooks/           # Custom React hooks
│   ├── api/             # API integration and endpoints
│   ├── assets/          # Icons, images, and styles
│   ├── utils/           # Helper functions
│   ├── index.css        # Global styles
│   ├── main.jsx         # Entry point
├── public/              # Public assets
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # TailwindCSS configuration
├── vite.config.js       # Vite configuration
```

#### Key Files
- **components/**: Includes reusable components like `Filter.jsx` and `ProductCard.jsx`.
- **routes/**: Organized into admin, cart, product, and auth-related pages.
- **hooks/**: Provides custom hooks for handling categories, products, and user authentication.
- **api/**: Contains modularized API calls for authentication, orders, products, etc.

#### Environment Variables (.env)
The frontend requires the following variables in a `.env` file:
```
VITE_BASE_URL=http://localhost:4000/api
VITE_FIREBASE_API_KEY=<Your Firebase API Key>
VITE_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
VITE_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
VITE_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
VITE_FIREBASE_APP_ID=<Your Firebase App ID>
```

---

## Setup and Installation

### Prerequisites
- Node.js (v14 or above)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `local.env`.
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`.
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Technologies Used

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

### Frontend:
- React.js
- Vite
- TailwindCSS
- Axios for API requests

### DevOps:
- ESLint for linting
- PostCSS for CSS processing
- dotenv for environment variables

---


## Contact
For any inquiries or collaboration, feel free to contact me at ahmed.adel.dev@hotmail.com.

