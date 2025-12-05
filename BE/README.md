# Quiz Backend

Backend for IT quiz website using NodeJS, Express, MongoDB (Mongoose).

## Features
- REST API for managing questions, users, results
- Environment config with dotenv
- MongoDB integration with mongoose

## Setup
1. Clone repo
2. Run `npm install`
3. Create `.env` file (see sample)
4. Run `npm start` or `npm run dev`

## Folder Structure
- models/: Mongoose models
- routes/: Express routes
- controllers/: Business logic

## Environment Variables
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/quiz_app
```
