# 💸 Digital Wallet API

A secure, modular, and role-based backend API for a digital wallet system — similar to **bKash** or **Nagad** — built with **Express.js** and **Mongoose**.  
This API supports user wallet management, money transfer, agent cash-in/out, and admin-level monitoring & control.

🌐 Live API URL: [https://digitalwallet-tawny.vercel.app/api/v1](https://digitalwallet-tawny.vercel.app/api/v1)

---

## 🚀 Project Overview

This project is a **digital wallet backend system** designed to enable users to perform financial operations securely, while ensuring strict role-based access control.

It includes:

- 🔐 JWT-based authentication & authorization
- 🏦 Wallet creation & management
- 💸 Add money, withdraw, and send money
- 🧑‍💼 Agent-based cash-in and cash-out system
- 🛡️ Admin controls for users, wallets, and transactions
- 📜 Full transaction history and tracking

---

## ⚙️ Environment Variables (`.env`)

> 🛠️ Create a `.env` file in the project root and paste the following configuration:

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb+srv://assignment_5:wj3k11kHc9jsafhl@cluster0.iagloem.mongodb.net/assignment_5?retryWrites=true&w=majority&appName=Cluster0

BCRYPT_SALT_ROUND=10
AMMOUNT=50

JWT_ACCESS_SECRET=Very Secret
JWT_EXPIRES_SECRET=1d
JWT_REFRESH_SECRET=VERY VERY SECRET
JWT_REFRESH_EXPIRES=365d



---

## 📁 Folder Structure

```bash
src/
├── modules/
│   ├── auth/              # Login, register, JWT
│   ├── user/              # User & agent management
│   ├── wallet/            # Wallet logic
│   └── transaction/       # Transaction handling
├── middlewares/           # Auth & error handling
├── config/                # DB & environment setup
├── utils/                 # Helpers & common logic
├── app.ts                 # Express app entry point



---

## 🧑‍💻 Roles & Permissions

| Role      | Capabilities                                                                         |
| --------- | ------------------------------------------------------------------------------------ |
| 🧑‍💻 User | Add money, withdraw, send money, view history                                        |
| 🏪 Agent  | Cash-in, cash-out, view commission                                                   |
| 🛡️ Admin | View all users, wallets, transactions, block/unblock wallets, approve/suspend agents |

---

## 🔑 Authentication & Authorization

- JWT-based authentication  
- Secure password hashing with **bcrypt**  
- Automatic wallet creation on registration (default balance: ৳50)  
- Role-based middleware (`auth(Role.USER)`, `auth(Role.AGENT)`, `auth(Role.ADMIN)`)

---

## 📌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint         | Role | Description                 |
| ------ | ---------------- | ---- | --------------------------- |
| POST   | `/auth/register` | All  | Register new user or agent |
| POST   | `/auth/login`    | All  | Login and receive JWT      |

---

### 👤 User Routes

| Method | Endpoint           | Role  | Description                |
| ------ | ------------------ | ----- | -------------------------- |
| GET    | `/users/me`        | All   | Get own profile            |
| GET    | `/users/`          | Admin | View all users             |
| GET    | `/users/agent`     | Admin | View all agents            |
| PATCH  | `/users/block/:id` | Admin | Block/unblock user wallet  |
| PATCH  | `/users/agent/:id` | Admin | Approve/suspend agent      |

---

### 💰 Wallet Routes

| Method | Endpoint               | Role  | Description                |
| ------ | ---------------------- | ----- | -------------------------- |
| GET    | `/wallet/me`           | User  | Get own wallet             |
| POST   | `/wallet/deposit`      | User  | Add money                  |
| POST   | `/wallet/withdraw`     | User  | Withdraw money             |
| POST   | `/wallet/send`         | User  | Send money to another user |
| POST   | `/wallet/cash-in/:id`  | Agent | Cash-in to user wallet     |
| POST   | `/wallet/cash-out/:id` | Agent | Cash-out from user wallet  |

---

### 🔄 Transaction Routes

| Method | Endpoint                   | Role       | Description               |
| ------ | -------------------------- | ---------- | ------------------------- |
| GET    | `/transactions/me`         | User/Agent | View own transactions     |
| GET    | `/transactions/commission` | Agent      | View commission history   |
| GET    | `/transactions/`           | Admin      | View all transactions     |
| GET    | `/transactions/:id`        | Admin      | View specific transaction |

---

## 🧪 API Testing (Postman)

Use **Postman** to test all endpoints.  
Example flow:

1. **Register** → `POST /auth/register`  
2. **Login** → `POST /auth/login`  
3. **Add Money** → `POST /wallet/deposit`  
4. **Send Money** → `POST /wallet/send`  
5. **Agent Cash-in** → `POST /wallet/cash-in/:id`  
6. **Admin View All Users** → `GET /users/`

✅ All protected routes require a **JWT Token** in the `Authorization` header:

middleware (auth(Role.USER), auth(Role.AGENT), auth(Role.ADMIN))












