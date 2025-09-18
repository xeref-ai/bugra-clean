# Xeref.ai

Xeref.ai is a full-stack web application designed as a central hub for AI-powered productivity and community engagement. It integrates a variety of AI models, task management features, and external services to provide a comprehensive user experience.

## Project Structure

The project is a Next.js application with TypeScript. The main components of the project are organized as follows:

-   `src/app/`: This directory contains the main application pages and API routes.
    -   `api/`: This subdirectory contains all of the backend API routes for the application.
        -   `chat/`: This subdirectory contains the API routes for the chat functionality, including integrations with various AI models.
        -   `skool/`: This subdirectory contains the API routes for the Skool integration.
        -   `stripe/`: This subdirectory contains the API routes for the Stripe integration.
    -   `(pages)/`: The `app` directory also contains the main pages for the application, such as the login page, the home page, and the pricing page.
-   `src/components/`: This directory contains the reusable React components used throughout the application.
-   `src/lib/`: This directory contains the core application logic, such as the AI model integrations, the chat service, and the Firebase integration.
-   `docs/`: This directory contains the project documentation, including the project blueprint and launch strategy.

## Getting Started

To get started with the project, you will need to have Node.js and npm installed. You will also need to have a Firebase project set up with Firestore and Firebase Authentication enabled.

1.  Install the dependencies:
    ```
    npm install
    ```
2.  Create a `.env.local` file with your Firebase project configuration.
3.  Run the development server:
    ```
    npm run dev
    ```

This will start the development server on `http://localhost:3000`.

## Key Pages

-   `/login`: The main entry point for users, featuring an embedded introductory video.
-   `/`: The main application view, with a three-panel resizable layout.
-   `/pricing`: The pricing page with a four-tier subscription model.
-   `/changelog`: A page that displays the latest updates and changes to the application.
-   `/learning`: A hub for learning resources and tutorials.
