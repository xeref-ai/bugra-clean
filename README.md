# Xeref.ai

## Table of Contents

- [Xeref.ai](#xerefai)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
  - [License](#license)

## Description

Xeref.ai is a modern productivity app that combines an AI assistant with an intelligent to-do list. Chat with various AI models, get task ideas generated automatically, and watch as the AI ranks them by difficulty. Built with Next.js, React, and Shadcn/UI.

## Features

*   **AI Chat Assistant:**
    *   Send messages and receive responses from AI agents.
    *   Choose between different AI agents (e.g., GPT 4.1, Gemini 2.5 Flash (Thinking), Gemini 2.5 Pro 06-05, DeepSeek: R1 0528, Claude 4 Sonnet, GPT 4.5, Grok 3, Claude 4 Sonnet Thinking).
    *   **Speech-to-Text:** Use the microphone button to dictate messages (requires browser permission).
    *   **Ultra Search:** Get an AI-generated explanation for the text currently in the input box.
    *   Do not reset chat history.
    *   *Agent/Chat Mode:* UI switch included for future differentiation in interaction styles (currently cosmetic).
*   **Intelligent To-Do List:**
    *   Add tasks with descriptions.
    *   AI automatically ranks task difficulty (Easy, Medium, Hard) upon addition.
    *   Tasks are visually distinguished by difficulty:
        *   **Easy:** Green background
        *   **Medium:** Orange background
        *   **Hard:** Red background
        *   *(Note: Text color is white for readability on all backgrounds)*
    *   Mark tasks as completed.
    *   Archive completed tasks to a separate "Archived Tasks" list.
    *   Permanently delete all archived tasks.
*   **AI Idea Generation:**
    *   After sending a message, the AI generates **three** related task ideas based on your message and automatically adds them to the to-do list with ranked difficulty.
    *   A notification confirms when tasks have been added.
*   **Layout & UI:**
*   **Vectorization Tool:**
    *   This feature will introduce an AI-powered tool that allows users to transform raster images (JPG, PNG) into vector graphics (SVG, EPS).
    *   **Use Cases:**
        *   Converting logos to vector for scalability.
        *   Turning hand-drawn sketches into editable vector art.
        *   Vectorizing charts or diagrams for presentations.
    *   The backend will use an AI model and an API to perform this action.
    * The AI model and the API will be implemented later.



*   **Layout & UI:**
    *   Split-screen layout: Chat on the left, To-Do list on the right.
    *   Header includes a user profile dropdown (currently shows a static email).
    *   Toast notifications for feedback (e.g., errors, tasks added).

## Tech Stack

*   **Frontend:** [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn/ui](https://ui.shadcn.com/)
*   **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit)
*   **Backend:** [Firebase](https://firebase.google.com/)

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v20 or later)
*   [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/xeref.ai.git
    cd xeref.ai
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

    .
    ├── public
    ├── src
    │   ├── app
    │   ├── components
    │   ├── lib
    │   └── ...
    ├── ...

*   **`public`**: Contains static assets like images and fonts.
*   **`src/app`**: Contains the main application code, including pages and API routes.
*   **`src/components`**: Contains reusable React components.
*   **`src/lib`**: Contains utility functions and libraries.

## Scripts

*   **`npm run dev`**: Starts the development server.
*   **`npm run build`**: Builds the application for production.
*   **`npm run start`**: Starts the production server.
*   **`npm run lint`**: Lints the code using ESLint.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
