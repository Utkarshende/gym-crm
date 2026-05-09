# Gym CRM Management System
A full-stack Gym Management CRM built using the MERN Stack.
This application helps gym owners manage members, memberships, payments, and member records efficiently.

## Live Demo

You can access the live version of the application and the API documentation using the links below:

### 🌐 Frontend (Client)
- **URL:** [https://sfcgym.netlify.app/](https://sfcgym.netlify.app/)

### ⚙️ Backend (API)
- **URL:** [https://gym-crm-backend-yu86.onrender.com](https://gym-crm-backend-yu86.onrender.com)

---

> **Note:** Since the backend is hosted on a free tier, the initial request might take a minute to load as the server "wakes up."

# Features

* Member Management
* Add / Edit / Delete Members
* View Member Details
* Payment Management
* Monthly Revenue Tracking
* Pending Payment Tracking
* Authentication System
* Protected Routes
* Responsive UI
* Dashboard Analytics
* CSV Export

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Deployment

* Netlify (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

# Project Structure
gym-crm/
│
├── client/
│    ├── src/  
│    ├── components/
│    ├── pages/
│    ├── layouts/
│    └── services/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/

## Installation
1. Clone Repository
git clone YOUR_GITHUB_REPO_URL

2. Install Frontend Dependencies
cd clientnpm install

3. Install Backend Dependencies
cd servernpm install

## Environment Variables
Create a .env file inside the server folder.
* PORT=5000
* MONGO_URI=your_mongodb_connection_string
* JWT_SECRET=your_secret_key

## Run Application

Start Backend
npm run server

Start Frontend
npm run dev

## Screens Included

* Dashboard
* Add Member
* Edit Member
* Payment Dashboard
* Login & Register

## API Endpoints
Members
GET     /api/membersPOST    /api/membersPUT     /api/members/:idDELETE  /api/members/:id

Payments
POST  /api/payments/:id/payGET   /api/payments/pending/listGET   /api/payments/revenue/month

Auth
POST /api/auth/loginPOST /api/auth/register

## Responsive Design
The application is fully responsive and works on:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

## Authentication

* JWT Based Authentication
* Protected Routes
* Local Storage Token Management

## Deployment

*Frontend Deployment*
Deployed on *Netlify*.

*Backend Deployment*
Deployed on *Render*.

*Database*
*MongoDB* Atlas Cloud Database.

## Author
Utkarsha Shende

MERN Stack Developer

Full Stack Web Developer

## License
This project is open-source and free to use for learning purposes.