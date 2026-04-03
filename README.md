# 🩺 Smart Diagnosis API

An AI-powered medical diagnosis REST API built with **Node.js**, **Express**, **MongoDB**, and **Google Gemini AI**. It accepts patient symptoms and returns the most likely medical conditions with probabilities and next steps.

---

## 📁 Project Structure

```
src/
├── controllers/     # Route handler logic
├── db/              # MongoDB connection
├── errors/          # Custom error handling
├── models/          # Mongoose schemas
├── routes/          # Express route definitions
├── services/        # AI service (Gemini integration)
└── index.js         # App entry point
```

---

## ⚙️ Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/smart-diagnosis-api.git
cd smart-diagnosis-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and fill in your values:
```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/smart-diagnosis
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the server
```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

---

## 🔌 API Endpoints

### `POST /diagnose`
Submit symptoms to get an AI-powered diagnosis.

**Request Body:**
```json
{
  "symptoms": "fever, cough"
}
```

**Response:**
```json
{
  "symptoms": "fever, cough",
  "conditions": [
    {
      "name": "COVID-19",
      "probability": 75,
      "next_steps": "Get a PCR test and consult a physician."
    },
    {
      "name": "Influenza",
      "probability": 20,
      "next_steps": "Take a flu test and rest with antiviral medication."
    }
  ],
  "id": "63f1a2b4c8e9d1234567890a"
}
```

> **Note:** The number of conditions returned scales with the number of symptoms — 1 symptom returns 1 condition, 2 symptoms return 2, and 3+ return 3.

---

### `GET /history`
Retrieve all past diagnosis records stored in the database.

**Response:**
```json
[
  {
    "_id": "63f1a2b4c8e9d1234567890a",
    "symptoms": "fever, cough",
    "conditions": [...],
    "createdAt": "2026-04-03T10:00:00.000Z"
  }
]
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Data persistence |
| Google Gemini AI | Diagnosis generation |
| dotenv | Environment config |
| nodemon | Dev hot-reloading |

---

## 📄 License

ISC
