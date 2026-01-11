# Chatify AI
## Header & Badges
[![Build Status](https://img.shields.io/travis/kaihere14/chatify-ai.svg?branch=main)](https://travis-ci.org/kaihere14/chatify-ai)
[![Coverage Status](https://coveralls.io/repos/github/kaihere14/chatify-ai/badge.svg?branch=main)](https://coveralls.io/github/kaihere14/chatify-ai?branch=main)
[![Version](https://img.shields.io/npm/v/chatify-ai.svg)](https://www.npmjs.com/package/chatify-ai)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/kaihere14/chatify-ai/blob/main/LICENSE)
[![Demo](https://img.shields.io/badge/Demo-Chatify%20AI-green.svg)](https://chatify-ai.vercel.app)
[![Documentation](https://img.shields.io/badge/Documentation-Chatify%20AI-blue.svg)](https://github.com/kaihere14/chatify-ai/blob/main/README.md)

## Overview
Chatify AI is a web-based chat application built using React, Tailwind CSS, and Vite. It provides a simple and intuitive interface for users to log in, chat with others, and manage their accounts.

## Features
* **Authentication**: Users can log in and out of the application using their credentials.
* **Chat Interface**: A simple and intuitive chat interface for users to communicate with each other.
* **Account Management**: Users can manage their accounts, including updating their profiles and passwords.
* **Real-time Updates**: The application provides real-time updates for chat messages and user status.

## Tech Stack
* **Frontend**: React, Tailwind CSS, Vite
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JSON Web Tokens (JWT)

## Architecture
The application is built using a modular architecture, with separate components for authentication, chat interface, and account management. The frontend is built using React, with Tailwind CSS for styling and Vite for building and bundling. The backend is built using Node.js and Express.js, with MongoDB as the database.

### Project Structure
The project is structured into the following directories:
* `Components`: Contains all the React components used in the application.
* `src`: Contains the application's source code, including the `App.jsx` and `main.jsx` files.
* `public`: Contains the application's public assets, including the `index.html` file.
* `vite.config.js`: Contains the Vite configuration for building and bundling the application.

## Getting Started
### Prerequisites
* Node.js (version 16 or higher)
* npm (version 8 or higher)
* Vite (version 3 or higher)

### Installation
1. Clone the repository using `git clone https://github.com/kaihere14/chatify-ai.git`.
2. Navigate to the project directory using `cd chatify-ai`.
3. Install the dependencies using `npm install`.
4. Start the development server using `npm run dev`.

### Configuration
The application uses the following environment variables:
* `REACT_APP_API_URL`: The URL of the backend API.
* `REACT_APP_AUTH_TOKEN`: The authentication token used to authenticate with the backend API.

### Example Configuration
```bash
REACT_APP_API_URL=https://chatify-backend-eight.vercel.app
REACT_APP_AUTH_TOKEN=your_auth_token_here
```

## Usage
### Authentication
To log in, navigate to the login page and enter your credentials. If you don't have an account, you can create one by clicking on the "Sign up" button.

### Chat Interface
To start a conversation, navigate to the chat interface and enter the name of the user you want to chat with. You can also create a new conversation by clicking on the "New Conversation" button.

### Account Management
To manage your account, navigate to the account management page and update your profile information. You can also change your password by clicking on the "Change Password" button.

## Development
### Setting up the Development Environment
1. Clone the repository using `git clone https://github.com/kaihere14/chatify-ai.git`.
2. Navigate to the project directory using `cd chatify-ai`.
3. Install the dependencies using `npm install`.
4. Start the development server using `npm run dev`.

### Running Tests
To run the tests, use the command `npm run test`.

### Code Style Guidelines
The application uses the following code style guidelines:
* Use ES6 syntax for JavaScript files.
* Use JSX syntax for React components.
* Use Tailwind CSS for styling.

### Debugging Tips
To debug the application, use the following tips:
* Use the browser's developer tools to inspect the application's HTML, CSS, and JavaScript code.
* Use the `console.log` function to log messages to the console.
* Use the `debugger` statement to pause the application's execution and inspect the current state.

## Deployment
### Production Deployment
To deploy the application to production, use the following steps:
1. Build the application using `npm run build`.
2. Deploy the application to a hosting platform, such as Vercel or Netlify.

### Docker Deployment
To deploy the application using Docker, use the following steps:
1. Build the Docker image using `docker build -t chatify-ai .
2. Run the Docker container using `docker run -p 3000:3000 chatify-ai`.

## API Documentation
### Endpoints
The application provides the following endpoints:
* `GET /me`: Returns the current user's profile information.
* `POST /login`: Logs in the user and returns an authentication token.
* `POST /signup`: Creates a new user account and returns an authentication token.
* `GET /conversations`: Returns a list of conversations for the current user.
* `POST /conversations`: Creates a new conversation and returns the conversation ID.

### Authentication
The application uses JSON Web Tokens (JWT) for authentication. To authenticate with the application, include the `Authorization` header with the `Bearer` token in the request.

## Contributing
To contribute to the application, use the following steps:
1. Fork the repository using `git fork https://github.com/kaihere14/chatify-ai.git`.
2. Clone the repository using `git clone https://github.com/your-username/chatify-ai.git`.
3. Create a new branch using `git branch feature/your-feature`.
4. Commit your changes using `git commit -m "Your commit message"`.
5. Push your changes using `git push origin feature/your-feature`.
6. Create a pull request using `git pull-request`.

## Troubleshooting
### Common Issues
* **Authentication errors**: Make sure you are using the correct authentication token and that it has not expired.
* **Chat interface issues**: Make sure you are using the correct conversation ID and that the conversation exists.

### FAQ
* **Q: How do I log in to the application?**
A: To log in to the application, navigate to the login page and enter your credentials.
* **Q: How do I create a new conversation?**
A: To create a new conversation, navigate to the chat interface and click on the "New Conversation" button.

## Roadmap
The application is currently in the development phase. The following features are planned for future releases:
* **Group conversations**: Support for group conversations with multiple users.
* **File sharing**: Support for sharing files between users.
* **Video conferencing**: Support for video conferencing between users.

## License & Credits
The application is licensed under the MIT license. The following dependencies are used in the application:
* **React**: A JavaScript library for building user interfaces.
* **Tailwind CSS**: A utility-first CSS framework for building custom user interfaces.
* **Vite**: A development server and bundler for building and deploying web applications.
* **Node.js**: A JavaScript runtime for building server-side applications.
* **Express.js**: A Node.js framework for building web applications.
* **MongoDB**: A NoSQL database for storing data.
* **JSON Web Tokens (JWT)**: A token-based authentication system for securing web applications.

## Acknowledgments
The application is built using the following open-source libraries and frameworks:
* **React**: A JavaScript library for building user interfaces.
* **Tailwind CSS**: A utility-first CSS framework for building custom user interfaces.
* **Vite**: A development server and bundler for building and deploying web applications.
* **Node.js**: A JavaScript runtime for building server-side applications.
* **Express.js**: A Node.js framework for building web applications.
* **MongoDB**: A NoSQL database for storing data.
* **JSON Web Tokens (JWT)**: A token-based authentication system for securing web applications.

## Third-Party Attributions
The application uses the following third-party libraries and frameworks:
* **React**: A JavaScript library for building user interfaces.
* **Tailwind CSS**: A utility-first CSS framework for building custom user interfaces.
* **Vite**: A development server and bundler for building and deploying web applications.
* **Node.js**: A JavaScript runtime for building server-side applications.
* **Express.js**: A Node.js framework for building web applications.
* **MongoDB**: A NoSQL database for storing data.
* **JSON Web Tokens (JWT)**: A token-based authentication system for securing web applications.