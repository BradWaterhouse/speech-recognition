# React Speech Recognition App

This is a simple React application that uses the Web Speech API to transcribe speech to text and integrates with OpenAI's ChatGPT to provide answers to users' spoken questions. The application allows users to start and stop speech recognition using buttons, display the transcribed text on the screen, and automatically fetch a response from ChatGPT based on the transcribed text.

## Features

- **Start and Stop Speech Recognition**: Users can start and stop the speech recognition process with buttons.
- **Display Transcribed Text**: The recognized speech is displayed as text on the screen.
- **Fetch Responses from ChatGPT**: The app automatically sends the transcribed text as a query to ChatGPT and displays the response.
- **Automatic Stop on Silence**: The recognition stops automatically when the user stops speaking.
- **Browser Compatibility Check**: The app checks if the user's browser supports the Web Speech API.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **CSS**: Styling is handled using external CSS files.
- **Web Speech API**: A browser API for speech recognition.
- **OpenAI ChatGPT API**: An API to generate responses based on user input.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node Package Manager, which comes with Node.js, to manage project dependencies.
- **OpenAI API Key**: You need an API key from OpenAI to use the ChatGPT functionality.

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/react-speech-recognition-app.git

2. **Navigate to project directory**

   ```bash
   cd react-speech-recognition-app

3. **Install dependencies**

   ```bash
   npm install

4. **Create .env file**

   In the root of the project directory, create a .env file and add your OpenAI API key:

   ```bash
   REACT_APP_CHAT_GPT_API_KEY=your_openai_api_key_here

5. **Start Server (http://localhost:3000.)**

   ```bash
   npm start
