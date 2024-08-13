# 💪 FitCall - Personalized Fitness Training Platform

## 🔍 Overview
FitCall is a comprehensive platform designed to connect users with expert fitness trainers. The platform provides personalized fitness training through video calls, real-time chat, and customized diet plans. With a focus on seamless user experience and robust functionality, FitCall is built to meet the needs of both trainers and users in the digital fitness landscape.

## ⭐ Key Features
- 💻 **Personalized Video Calls**: Integrated with WebRTC for real-time video sessions between users and trainers.
- 📨 **Real-Time Chat**: Powered by Socket.IO, allowing users and trainers to communicate instantly.
- 🍽️ **Custom Diet Plans**: Trainers can create and share diet plans tailored to individual users.
- 🔒 **Secure Authentication**: OAuth integration ensures secure and seamless user login.
- 📱 **Responsive Design**: User-friendly interface with enhanced responsiveness using Tailwind CSS.
- 📊 **Analytics & Reporting**: Provides insights and tracking to monitor progress and performance.
- 💳 **Payment Integration**: Stripe integration for secure and easy payment processing.

## 🛠️ Technologies Used
- **Frontend:** React.js, TypeScript, Redux, Tailwind CSS, Material UI, RTK Query
- **Backend:** Node.js, Express.js, TypeScript, WebRTC, Socket.IO, JWT (for authentication)
- **Database:** MongoDB, Firebase (for real-time data handling)
- **Deployment:** AWS (EC2, Nginx), Docker, Vercel
- **Payment Integration:** Stripe
- **Other Tools:** Git, Postman, Figma


## 🎥 Explore FitCall

- **🌐 Live Site:** [FitCall](https://fitcall-beta.vercel.app/)
- **📂 GitHub Repository:** [FitCall- Frontend](https://github.com/shabil15/fitcall--frontend) , [FitCall- Backend](https://github.com/shabil15/backend-fitcall)



## 🚀 Installation and Setup

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v14.x or later)
- **npm** 
- **MongoDB** (Running locally or on a cloud service like MongoDB Atlas)
- **Docker** (Optional, for containerized deployment)

### Steps to Run the Project
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/shabil15/backend-fitcall.git
    cd fitcall
    ```
2. **Install Dependencies:** Navigate to the backend and frontend directories and install the required dependencies.
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```
3. **Environment Variables:** Create a `.env` file in the root of both the frontend and backend directories. Here’s a basic setup:
    - **Backend:**
        ```bash
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        STRIPE_SECRET_KEY=your_stripe_secret_key
        ```
4. **Start the Backend Server:** In the backend directory:
    ```bash
    npm run dev
    ```
    This will start the backend server on `http://localhost:5000`.

5. **Start the Frontend Server:** In the frontend directory:
    ```bash
    npm start
    ```
    The frontend will be accessible at `http://localhost:3000`.

6. **Running with Docker (Optional):** If you prefer running the project using Docker, you can use the provided `Dockerfile` and `docker-compose.yml`.
    ```bash
    docker-compose up --build
    ```
    This will build the Docker images and start the containers for both the frontend and backend.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue.


