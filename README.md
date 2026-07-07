# Mernoo Admin Dashboard

Mernoo is a full-stack web application built on the MERN stack (MongoDB, Express, React, Node.js) designed as an administrative dashboard to manage **Users**, **Products**, and **Orders**. It features an isolated backend API paired with a fast, modern frontend powered by Vite and Tailwind CSS.

## 📂 Project Structure

```
mernoo-main/
├── backend/
│   ├── src/
│   │   ├── config/       # Database connection setup
│   │   ├── controllers/  # Core business logic for routes
│   │   ├── model/        # Mongoose database schemas
│   │   ├── routes/       # Express route definitions
│   │   └── utils/        # Fallback memory stores if DB is unconfigured
│   ├── server.js         # Entry point for the Express API
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/        # Dashboard, Users, Products, and Orders views
    │   ├── services/     # API request clients (Axios abstraction)
    │   ├── App.jsx       # Client side layout and router distribution
    │   └── main.jsx      # Vite client mounter
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18.x or higher recommended)
- npm or yarn
- MongoDB instance (Local or Atlas cloud URI)

### 1. Backend Configuration

1. Navigate into the backend directory:
   ```bash
   cd backend
   ```

2. Install the server dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `backend/` folder and add your environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Run the backend development server:
   ```bash
   npm run dev
   ```

   The server defaults to run on `http://localhost:5000`.

### 2. Frontend Configuration

1. Navigate into the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

3. Run the frontend build runner using Vite:
   ```bash
   npm run dev
   ```

4. Open the given local URL (typically `http://localhost:5173`) in your web browser.

## 🛠️ API Specifications

The Express backend exposes RESTful API endpoints under the following root paths:

### User Routes (`/api/users`)

- `GET /` - Retrieve all users.
- `GET /:id` - Fetch a single user by ID.
- `POST /` - Create a new user.
- `PUT /:id` - Update fields of an existing user.
- `DELETE /:id` - Remove a user profile.

### Product Routes (`/api/products`)

- `GET /` - List inventory items.
- `GET /:id` - Detail individual specifications.
- `POST /` - Insert new product details.
- `PUT /:id` - Adjust pricing, descriptions, or inventory numbers.
- `DELETE /:id` - De-list a product item.

### Order Routes (`/api/orders`)

- `GET /` - View ledger history of placed transactions.
- `GET /:id` - Target a distinct invoice profile.
- `POST /` - Check out new order payloads.
- `PUT /:id` - Update verification/fulfillment step states.
- `DELETE /:id` - Cancel/void a records transaction slot.

## 💻 Tech Stack Features Applied

- **Backend Framework:** Node.js with Express running ES modules syntax layout (`import`/`export`).
- **Database Object Modeling:** Mongoose mapping rules for seamless structural data flows to MongoDB clusters.
- **CORS Management:** Pre-configured Cross-Origin Resource Sharing handling routing communication from the browser client safely.
- **Frontend UI Layout:** React 18 wrapper architecture with single-page compilation routes utilizing `react-router-dom`.
- **Styling Utilities:** Native theme layouts constructed dynamically via utility classes provided by Tailwind CSS.

## 📦 Production Builds

To compile the React project into highly optimized static production assets:

```bash
cd frontend
npm run build
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/chaitanyamulampaka/mernoo/issues) if you want to contribute.

## 📄 License

This project is currently unlicensed.

## 👤 Author

**Chaitanya Mulampaka**
- GitHub: [@chaitanyamulampaka](https://github.com/chaitanyamulampaka)
