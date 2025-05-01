se# Task Manager App

A full-stack task management application built with Next.js, MongoDB, Redux, and JWT authentication.

---

## 🔧 Tech Stack

- **Frontend:** Next.js (App Router), Redux Toolkit, TailwindCSS
- **Backend:** Next.js API routes
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT-based auth

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB URI (can use MongoDB Atlas)
- `.env` file setup

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/task-manager-app.git
cd task-manager-app

2. Install dependencies

npm install

3. Add .env file

MONGODB_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret

4. Run the dev server

npm run dev

App will be live at http://localhost:3000


---

🧠 Architecture & Technical Choices

Next.js App Router for unified backend + frontend

Redux Toolkit + Thunks for global state and async tasks

Axios instance with interceptors to handle JWT headers

MongoDB for flexibility in schema (tasks, users)

Modular API structure (routes, controllers, models)



---

🗃️ Database Schema

User

{
  name: String,
  email: String,
  password: String (hashed)
}

Task

{
  title: String,
  description: String,
  scheduledDate: Date,
  completed: Boolean,
  important: Boolean,
  userId: ObjectId (ref to User)
}


---

🌱 Seed Data

Test Users:

test1@example.com / password123

test2@example.com / password123


Each user has 2–3 demo tasks:

Mix of completed, important, and pending


Seed file: seed.js in /scripts or use Postman collection.


---

🧪 How to Run Locally

1. Clone & install


2. Add .env


3. Run:



npm run dev

4. Login with test credentials (or register new user)


5. Add / Edit / Toggle / Delete tasks




---

📦 Author

Made with ❤️ by [Your Name]

---

### ✅ 4. Add Seed Data

- Create a script like `scripts/seed.js` to insert test users + tasks
- OR include Postman collection + environment setup

---

### ✅ 5. Share Repository Link

Once pushed, copy the GitHub link like:
https://github.com/Kakrote/TaskNest
