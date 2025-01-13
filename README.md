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

---

## My Role
As the sole developer of this project, I was responsible for:
- Designing and implementing the backend API using Node.js and Express.js.
- Building the frontend interface with React.js and TailwindCSS.
- Integrating MongoDB for data storage and Mongoose for schema management.
- Developing reusable React components and custom hooks.
- Implementing JWT-based authentication and protected routes.
- Deploying both the backend and frontend to production environments.

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
3. Configure environment variables in `config.env`.
4. Start the server:
   ```bash
   npm run dev
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

## Deployment
### Backend:
- Use a platform like Heroku or AWS for deployment.
- Ensure environment variables are configured in the production environment.

### Frontend:
- Deploy using Vercel or Netlify.
- Ensure API endpoints are updated to match the deployed backend.

---

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes with clear messages.
4. Push your branch and open a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

---

## Contact
For any inquiries or collaboration, feel free to contact me at ahmed.adel.dev@hotmail.com.

