# Echoes - Your Emotional Time Capsule

Echoes is a secure, beautifully designed app that lets users record voice, text, or video messages to their future self or loved ones, triggered by life events, dates, or even AI-detected emotional states.

## Features

- **Secure Authentication**: JWT-based authentication for user security
- **Multi-format Messages**: Support for text, voice, and video messages
- **AI Enhancement**: OpenAI-powered message enhancement
- **Scheduled Delivery**: Messages delivered on specific dates or events
- **Subscription Plans**: Free, Premium, and Pro plans
- **Responsive Design**: Works on all devices

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- OpenAI for AI enhancement
- Stripe for payments
- Nodemailer for email delivery
- Node-cron for scheduled tasks

### Frontend
- React with React Router
- Styled Components for styling
- Axios for API requests

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd server
   npm install