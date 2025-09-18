# Xeref.ai Blueprint

## 1. Overview

Xeref.ai is a full-stack web application designed as a central hub for AI-powered productivity and community engagement. It integrates a variety of AI models, task management features, and external services to provide a comprehensive user experience.

## 2. Architecture

- **Frontend (xeref.ai):** A Next.js application responsible for the user interface and user experience.
- **Backend (bugrakarsli.com):** A set of Next.js API routes that provide backend services for the frontend.
- **Database:** Cloud Firestore is used for data storage.
- **Authentication:** Firebase Authentication is used for user management.
- **AI Models:** The application integrates with multiple AI models, including Google's Gemini, OpenAI's GPT models, and others.

## 3. Core Features

- **User Authentication:** Secure sign-in and account management.
- **Interactive Chat:** A real-time chat interface with a variety of AI models.
- **Task Management:** A comprehensive task management system with AI-powered features.
- **External Integrations:** Connections to external services like Slack, Skool, and YouTube.
- **Billing and Subscriptions:** Integration with Stripe for handling payments and subscriptions.
- **Learning Resources:** A dedicated page for articles, guides, and tutorials.

## 4. Key Pages and Components

- **`/login`:** The main entry point for users, featuring an embedded introductory video.
- **`/` (Home):** The main application view, with a three-panel resizable layout.
  - **Left Panel:** Main navigation and chat history.
  - **Center Panel:** The main chat interface.
  - **Right Panel:** A multi-purpose panel for tasks, ideas, notes, and settings.
- **`/pricing`:** The pricing page with a four-tier subscription model.
- **`/changelog`:** A page that displays the latest updates and changes to the application.
- **`/learning`:** A hub for learning resources and tutorials.

## 5. Development Environment

- **Framework:** Next.js with TypeScript.
- **Styling:** Tailwind CSS with Shadcn/ui.
- **Deployment:** The application is designed to be deployed on a modern hosting platform that supports Next.js.
- **Configuration:** The `.idx/dev.nix` file is used to configure the development environment in IDX.
