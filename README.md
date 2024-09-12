# Social Network API

## Description
The Social Network API is a back-end application built with MongoDB, Mongoose, and Express.js. It allows users to create and manage their social media interactions, including users, thoughts, reactions, and friends. The API supports various operations, such as creating, reading, updating, and deleting users and thoughts. Additionally, users can add friends, post reactions to thoughts, and manage their friend lists. This API is tested using Insomnia and follows RESTful principles.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Technologies](#technologies)
- [License](#license)
- [Walkthrough Video](#walkthrough-video)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/wcburnette/Social-Network.git
2. Navigate to the project directory:
    cd social-network-api
3. Install dependencies:
    npm install
4. Set up MongoDB connection in config/connection.js:
    mongoose.connect('mongodb://localhost/social-network-api');
5. Start the application:
    npm start

## Usage
To start the server, use the following command:
    npm start
Once the server is running, use Insomnia Core to test the various API routes. The Mongoose models will sync to the MongoDB database upon startup.

Example: API Request via Insomnia
GET Users:

URL: http://localhost:3001/api/users
Response: JSON data for all users
POST New User:

URL: http://localhost:3001/api/users
Body:
{
  "username": "johndoe",
  "email": "johndoe@example.com"
}
Response: User created successfully

## API Routes
Users
GET /api/users: Get all users
GET /api/users/:userId: Get a single user by ID
POST /api/users: Create a new user
PUT /api/users/:userId: Update a user by ID
DELETE /api/users/:userId: Delete a user by ID
POST /api/users/:userId/friends/:friendId: Add a friend to a user
DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user

Thoughts
GET /api/thoughts: Get all thoughts
GET /api/thoughts/:thoughtId: Get a single thought by ID
POST /api/thoughts: Create a new thought
PUT /api/thoughts/:thoughtId: Update a thought by ID
DELETE /api/thoughts/:thoughtId: Delete a thought by ID
POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought
DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Delete a reaction from a thought

## Models
User Model
username (String, required, unique)
email (String, required, unique, valid email format)
friends (Array of ObjectIds referencing Users)
thoughts (Array of ObjectIds referencing Thoughts)

Thought Model
thoughtText (String, required, max length 280)
username (String, required)
reactions (Array of reactions)

Reaction Model
reactionBody (String, required, max length 280)
username (String, required)
createdAt (Date, default to current date, with getter for formatting)

## Technologies
Node.js: Server-side JavaScript runtime
Express.js: Web framework for Node.js
MongoDB: NoSQL database
Mongoose: ODM library for MongoDB
Insomnia: API testing tool

## License
This project is licensed under the MIT License.
This README includes key sections like installation, usage instructions, API routes, models, technologies, and license details.

## Walkthrough Video
https://1drv.ms/v/s!Ajvx8AL_kpmUhp9uuKw10s6h6brXwA?e=vhxGfA

