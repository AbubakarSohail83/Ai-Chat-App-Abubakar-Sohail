AI CHAT MODULE AND SUBSCRIPTION HANDLER

This is a simple backend service for managing AI chat interactions and subscription bundles, built with TypeScript, Express, and Prisma.

It’s structured following Clean Architecture / Domain-Driven Design (DDD) principles, so each module is independent and easy to maintain.

__Features__:

__Auth Module__:

______User signup, login, and profile retrieval

______JWT-based authentication

__Chat Module__:

______Users can ask questions (mocked AI responses)

______Tracks monthly usage: 3 free messages/month

______Stores question, answer, and tokens

__Subscription Module__:

______Create subscription bundles: Basic / Pro / Enterprise

______Billing cycles: monthly or yearly

______Automatically calculates max messages per subscription

__Infrastructure__

PostgreSQL database with Prisma ORM

Global error handling middleware

Clean folder structure (Domain, Repository, Controller layers)

__Getting Started__
Prerequisites:

Node.js 20+

PostgreSQL

Setup

Clone the repo and enter the folder:

git clone <repo-url>
cd ai-chat-module


Install dependencies:

npm install


Create a .env file set your PostgreSQL URL and JWT secret.

Run Prisma migrations:

npx prisma migrate dev --name init


Start the development server:

npm run dev


Server should now be running on http://localhost:3000
