# PC Forge

A React application where users can browse PC components and share their own.
Course project for the **ReactJS** course.

## Features

- Home page with all parts loaded from the REST API + search
- Part details page
- Register, login and logout (JSON Server Auth)
- Add, edit and delete parts (only the owner can edit or delete)
- Protected pages for logged-in users
- 404 page, responsive design

## Technologies

- React + Vite
- React Router
- JSON Server + json-server-auth (REST API with authentication)

## How to run

Requirements: Node.js (LTS) and Git.

```bash
npm install
npm start
```

`npm start` runs both:

- the REST API on http://localhost:3030 (`npm run server`)
- the React app on http://localhost:5173 (`npm run dev`)

Demo account: **demo@pcforge.com / demo123**

To restore the original data, stop the servers and run `npm run db:reset`.

## Project structure

```
server/db.json        database
server/routes.json    access rules (who can read/write)
src/api.js            all REST API requests
src/context/          AuthContext.jsx - the logged-in user
src/components/       Navbar, PartCard, PartForm
src/pages/            Home, PartDetails, Login, Register, CreatePart, EditPart
src/App.jsx           routes, footer and 404 page
src/main.jsx          entry point
src/index.css         styles
```

## Routes

| URL             | Page         | Access         |
| --------------- | ------------ | -------------- |
| /               | Home         | everyone       |
| /parts/:id      | Part details | everyone       |
| /login          | Login        | everyone       |
| /register       | Register     | everyone       |
| /create         | Add part     | logged-in only |
| /parts/:id/edit | Edit part    | logged-in only |
| *               | 404          | everyone       |

## REST API

| Method | URL        | Description         |
| ------ | ---------- | ------------------- |
| POST   | /register  | create an account   |
| POST   | /login     | log in, get a token |
| GET    | /parts     | all parts           |
| GET    | /parts/:id | one part            |
| POST   | /parts     | add a part          |
| PATCH  | /parts/:id | edit a part         |
| DELETE | /parts/:id | delete a part       |
