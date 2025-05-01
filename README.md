# Task Manager App

A full-stack task management application built with Next.js, MongoDB, Redux, and JWT authentication.

---


### 👤 Test Users

You can use any of the following test accounts to log in:

| Email                | Password   |
|----------------------|------------|
| user1@example.com    | password1  |
| user2@example.com    | password2  |
| user3@example.com    | password3  |
| user4@example.com    | password4  |
| user5@example.com    | password5  |
| user6@example.com    | password6  |
| user7@example.com    | password7  |
| user8@example.com    | password8  |
| user9@example.com    | password9  |
| user10@example.com   | password10 |


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
- `.env` file configured

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/task-manager-app.git
cd task-manager-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add `.env` file

```env
MONGO_URI="your_mongo_connection_string"
JWT_SECRET=your_jwt_secret
```

> 💡 If your MongoDB password contains special characters like `#`, wrap the URI in double quotes and encode them (e.g., `#` → `%23`).

### 4. Run the dev server

```bash
npm run dev
```

The app will be live at: [http://localhost:3000](http://localhost:3000)

---

## 🧠 Architecture & Technical Choices

- Next.js App Router for full-stack pages and APIs  
- Redux Toolkit + Thunks for global state and async logic  
- Axios instance with interceptors to handle JWT headers  
- MongoDB for flexible schema design (users, tasks)  
- Modular codebase (controllers, models, routes, middleware)  

---

## 🗃️ Database Schema

### User

```js
{
  name: String,
  email: String,
  password: String (hashed)
}
```

### Task

```js
{
  title: String,
  description: String,
  scheduledDate: Date,
  completed: Boolean,
  important: Boolean,
  userId: ObjectId (ref to User)
}
```

---

## 🌱 Seed Data

You can populate the database with sample data using the `seed.ts` script.

### 🔹 How to Run the Seed Script

1. Ensure your `.env` file is configured with `MONGO_URI`.  
2. Run the script using:

```bash
npm run seed
```

This will:

- Delete all existing users and tasks
- Create 10 test users
- Each user gets 10 demo tasks (random `important` and `completed` flags)

### 📝 Script Location

The seed script is located at:

```
/seed.ts
```

Add this to your `package.json` to run it easily:

```json
"scripts": {
  "seed": "ts-node seed.ts"
}
```

---

## 🧪 How to Use Locally

1. Clone the repo and install dependencies  
2. Create your `.env` file  
3. Run the development server:

```bash
npm run dev
```

4. Optionally seed the database:

```bash
npm run seed
```

5. Log in with a test account from above or register a new one  
6. Add, edit, toggle, or delete tasks  

---

## 📦 Author

Made with ❤️ by Anshul

---

## 🔗 Share Repository

Once your project is live on GitHub, share it like:

```
https://github.com/Kakrote/TaskNest
```