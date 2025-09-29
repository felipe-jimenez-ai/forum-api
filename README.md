# 🗣️ Q\&A Forum Backend API

## 1. Overview

This project is a secure, scalable, and production-ready REST API backend for a question-and-answer forum. Built with NestJS and TypeORM, it supports full, persistent CRUD (Create, Read, Update, Delete) operations for questions and answers. The API features robust user authentication using JSON Web Tokens (JWT) and includes functionality to export all forum data to an Excel spreadsheet.

This project was completed as part of a timed technical challenge, demonstrating rapid development, professional coding practices, and advanced problem-solving.

## 2. Core Technologies

* **Framework**: **NestJS (TypeScript)** for its modular architecture, which enforces a clean separation of concerns and accelerates development.
* **Database**: **SQLite** with **TypeORM** for lightweight, file-based persistent data storage. This choice allows for rapid setup while providing the reliability of a real database.
* **Authentication**: **Passport.js** (`passport-jwt`) for handling token-based authentication. User passwords are securely hashed using **`bcrypt`**.
* **Data Export**: **`exceljs`** to generate `.xlsx` spreadsheets from forum data.
* **Security \& Validation**:
    * **`class-validator`** to validate and sanitize all incoming request data.
    * **`helmet`** to apply essential and secure HTTP headers.
    * **CORS** enabled to allow access from a frontend application.


## 3. Getting Started

### Prerequisites

* Node.js (v16 or later)
* npm


### Installation \& Running

1. **Clone the repository:**

```bash
git clone https://github.com/felipe-jimenez-ai/forum-api.git
cd [your-project-directory]
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run start:dev
```


* The server will start on `http://localhost:3000`.
* On the first run, a `database.sqlite` file will be automatically created in the project's root directory, and the database schema will be synchronized.
* A default user (`username: testuser`, `password: testpassword`) is automatically seeded into the database.


## 4. API Endpoints

All endpoints are prefixed with `/forum`. Endpoints marked as **(Protected)** require a valid JWT Bearer Token in the `Authorization` header.

### Authentication

* `POST /auth/login`
    * Authenticates a user and returns a JWT `access_token`.


### Forum CRUD Operations

* `GET /forum`
    * **(Public)** Retrieves a list of all questions with their associated answers.
* `POST /forum/questions`
    * **(Protected)** Creates a new question.
* `PATCH /forum/questions/:id`
    * **(Protected)** Updates an existing question by its ID.
* `DELETE /forum/questions/:id`
    * **(Protected)** Deletes a question and all of its associated answers.
* `POST /forum/answers`
    * **(Protected)** Creates a new answer for a specific question.
* `PATCH /forum/answers/:id`
    * **(Protected)** Updates an existing answer by its ID.
* `DELETE /forum/answers/:id`
    * **(Protected)** Deletes a single answer by its ID.


### Data Export

* `GET /forum/export`
    * **(Protected)** Generates an Excel file named `forum_data.xlsx` containing all questions and answers and saves it to the `/public` directory. The file is accessible at `http://localhost:3000/forum_data.xlsx`.


## 5. Final Deliverables

* **Full Source Code**: The complete, well-commented NestJS project.
* **`database.sqlite`**: The database file will be generated on first run.
* **This `README.md` file**: Comprehensive documentation explaining the project architecture, setup, and API usage.

