<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FitCall - README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            line-height: 1.6;
            margin: 20px;
        }

        h1 {
            color: #2c3e50;
        }

        h2, h3 {
            color: #34495e;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        ul li::before {
            content: "💡";
            margin-right: 10px;
        }

        code {
            background-color: #eaeaea;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: "Courier New", Courier, monospace;
        }

        pre {
            background-color: #eaeaea;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }

        a {
            color: #2980b9;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .section {
            margin-bottom: 30px;
        }

        .emoji {
            font-size: 1.2em;
        }
    </style>
</head>

<body>

    <h1>💪 FitCall - Personalized Fitness Training Platform</h1>

    <div class="section">
        <h2>🔍 Overview</h2>
        <p>FitCall is a comprehensive platform designed to connect users with expert fitness trainers. The platform provides personalized fitness training through video calls, real-time chat, and customized diet plans. With a focus on seamless user experience and robust functionality, FitCall is built to meet the needs of both trainers and users in the digital fitness landscape.</p>
    </div>

    <div class="section">
        <h2>⭐ Key Features</h2>
        <ul>
            <li>Personalized Video Calls: Integrated with WebRTC for real-time video sessions between users and trainers.</li>
            <li>Real-Time Chat: Powered by Socket.IO, allowing users and trainers to communicate instantly.</li>
            <li>Custom Diet Plans: Trainers can create and share diet plans tailored to individual users.</li>
            <li>Secure Authentication: OAuth integration ensures secure and seamless user login.</li>
            <li>Responsive Design: User-friendly interface with enhanced responsiveness using Tailwind CSS.</li>
            <li>Analytics & Reporting: Provides insights and tracking to monitor progress and performance.</li>
            <li>Payment Integration: Stripe integration for secure and easy payment processing.</li>
        </ul>
    </div>

    <div class="section">
        <h2>🛠️ Technologies Used</h2>
        <ul>
            <li><strong>Frontend:</strong> React.js, TypeScript, Redux, Tailwind CSS, Material UI, RTK Query</li>
            <li><strong>Backend:</strong> Node.js, Express.js, TypeScript, WebRTC, Socket.IO, JWT (for authentication)</li>
            <li><strong>Database:</strong> MongoDB, Firebase (for real-time data handling)</li>
            <li><strong>Deployment:</strong> AWS (EC2, Nginx), Docker, Vercel, Render</li>
            <li><strong>Payment Integration:</strong> Stripe</li>
            <li><strong>Other Tools:</strong> Git, Postman, Figma</li>
        </ul>
    </div>

    <div class="section">
        <h2>🚀 Installation and Setup</h2>

        <h3>Prerequisites</h3>
        <p>Ensure you have the following installed on your machine:</p>
        <ul>
            <li><strong>Node.js</strong> (v14.x or later)</li>
            <li><strong>npm</strong> or <strong>yarn</strong></li>
            <li><strong>MongoDB</strong> (Running locally or on a cloud service like MongoDB Atlas)</li>
            <li><strong>Docker</strong> (Optional, for containerized deployment)</li>
        </ul>

        <h3>Steps to Run the Project</h3>
        <ol>
            <li>
                <strong>Clone the Repository:</strong>
                <pre><code>git clone https://github.com/yourusername/fitcall.git
cd fitcall</code></pre>
            </li>
            <li>
                <strong>Install Dependencies:</strong> Navigate to the backend and frontend directories and install the required dependencies.
                <pre><code># Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install</code></pre>
            </li>
            <li>
                <strong>Environment Variables:</strong> Create a <code>.env</code> file in the root of both the frontend and backend directories. Here’s a basic setup:
                <ul>
                    <li><strong>Backend:</strong>
                        <pre><code>PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key</code></pre>
                    </li>
                    <li><strong>Frontend:</strong>
                        <pre><code>REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_KEY=your_stripe_public_key</code></pre>
                    </li>
                </ul>
            </li>
            <li>
                <strong>Start the Backend Server:</strong> In the backend directory:
                <pre><code>npm run dev</code></pre>
                This will start the backend server on <code>http://localhost:5000</code>.
            </li>
            <li>
                <strong>Start the Frontend Server:</strong> In the frontend directory:
                <pre><code>npm start</code></pre>
                The frontend will be accessible at <code>http://localhost:3000</code>.
            </li>
            <li>
                <strong>Running with Docker (Optional):</strong> If you prefer running the project using Docker, you can use the provided <code>Dockerfile</code> and <code>docker-compose.yml</code>.
                <pre><code>docker-compose up --build</code></pre>
                This will build the Docker images and start the containers for both the frontend and backend.
            </li>
        </ol>
    </div>

    <div class="section">
        <h2>🤝 Contributing</h2>
        <p>Contributions are welcome! Please feel free to submit a pull request or open an issue.</p>
    </div>

    <div class="section">
        <h2>📄 License</h2>
        <p>This project is licensed under the MIT License.</p>
    </div>

</body>

</html>
