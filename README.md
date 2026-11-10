# 🏋️ Fitness Buddy — AI-Powered Health & Fitness Coach

> **Problem Statement #13** — Built with IBM Granite (watsonx.ai) · Node.js · Express

Fitness Buddy is a conversational AI health and fitness coach that provides personalized workout plans, nutrition guidance, daily motivation, and habit tracking — all powered by **IBM Granite** through **IBM watsonx.ai**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **AI Chat Coach** | Natural conversation with IBM Granite for any fitness/nutrition question |
| 🏃 **Workout Planner** | Custom home workouts by fitness level, goal & duration |
| 🥗 **Meal Planner** | Nutritious meal ideas by diet type, goal & allergies |
| ⚡ **Daily Motivation** | Inspirational quotes + actionable tips |
| 🗓 **Habit Tracker** | Track 6 daily health habits with visual progress |
| 📱 **Responsive UI** | Works on desktop and mobile |

---

## 🛠 Tech Stack

- **AI Model**: IBM Granite (`ibm/granite-13b-chat-v2`) via **IBM watsonx.ai**
- **Cloud**: IBM Cloud (IAM authentication)
- **Backend**: Node.js + Express
- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework needed)

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+
- An **IBM Cloud** account (free/lite tier works)
- An **IBM watsonx.ai** project

### 2. Get IBM Credentials
1. Go to [IBM Cloud](https://cloud.ibm.com) → **Manage → Access (IAM) → API Keys** → Create an API Key
2. Go to [watsonx.ai](https://dataplatform.cloud.ibm.com/wx/home) → Create a Project → Copy the **Project ID**

### 3. Configure `.env`
Edit the `.env` file in the project root:

```env
IBM_API_KEY=your_actual_ibm_api_key_here
WATSONX_PROJECT_ID=your_actual_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
GRANITE_MODEL_ID=ibm/granite-13b-chat-v2
```

### 4. Install & Run

```bash
cd fitness-buddy
npm install
npm start
```

Open your browser at **http://localhost:3000**

---

## 📁 Project Structure

```
fitness-buddy/
├── server.js                  # Express server + API routes
├── package.json
├── .env                       # IBM credentials (DO NOT commit)
├── services/
│   └── graniteService.js      # IBM Granite / watsonx.ai integration
└── public/
    ├── index.html             # App shell & all views
    ├── style.css              # Dark-theme UI styles
    └── app.js                 # Frontend logic & API calls
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check + model info |
| POST | `/api/chat` | Main conversational AI endpoint |
| POST | `/api/workout` | Generate a custom workout plan |
| POST | `/api/nutrition` | Generate a meal plan |
| GET | `/api/motivation` | Get daily motivation |

### Example — Chat Request
```json
POST /api/chat
{
  "message": "Give me a 20-minute HIIT workout for beginners",
  "history": []
}
```

### Example — Workout Request
```json
POST /api/workout
{
  "fitnessLevel": "beginner",
  "goal": "weight loss",
  "duration": 30
}
```

---

## 🌍 IBM Granite Regions

| Region | URL |
|---|---|
| US South (default) | `https://us-south.ml.cloud.ibm.com` |
| EU Frankfurt | `https://eu-de.ml.cloud.ibm.com` |
| Tokyo | `https://jp-tok.ml.cloud.ibm.com` |
| London | `https://eu-gb.ml.cloud.ibm.com` |

---

## ⚠️ Disclaimer
Fitness Buddy provides general wellness guidance only. Always consult a qualified healthcare professional before starting a new fitness or nutrition program, especially if you have existing health conditions.

---

**Made with ❤️ using IBM Granite on watsonx.ai**
