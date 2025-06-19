## 🗂️ Project Structure

```

ARIN ASSESMENT/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── campaign.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── css/
│   │   │   ├── dashboard.css
│   │   │   ├── login.css
│   │   │   └── navbar.css
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── App.js
│   │   └── index.js
├── README.md

````

````

### Running the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your environment variables (e.g., database credentials, JWT secret):

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=campaign_db
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   node index.js
   ```

   By default, it will run on `http://localhost:5000`

---


### Running the Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```
