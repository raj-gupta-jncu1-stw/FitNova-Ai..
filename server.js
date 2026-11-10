require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const granitService = require('./services/graniteService');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ────────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: process.env.APP_NAME || 'Fitness Buddy',
    model: process.env.GRANITE_MODEL_ID || 'ibm/granite-13b-chat-v2',
    timestamp: new Date().toISOString()
  });
});

// Main chat endpoint — calls IBM Granite via watsonx.ai
app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const reply = await granitService.chat(message.trim(), history);
    res.json({ reply });
  } catch (err) {
    console.error('[/api/chat] Error:', err.message);
    res.status(500).json({
      error: 'Failed to get a response from IBM Granite.',
      details: err.message
    });
  }
});

// Quick-action endpoints
app.post('/api/workout', async (req, res) => {
  const { fitnessLevel = 'beginner', goal = 'general fitness', duration = 30 } = req.body;
  const prompt = `Suggest a ${duration}-minute home workout for a ${fitnessLevel} with goal: ${goal}. Include warm-up, main exercises with sets/reps, and cool-down.`;
  try {
    const reply = await granitService.chat(prompt, []);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/nutrition', async (req, res) => {
  const { dietType = 'balanced', goal = 'maintain weight', allergies = 'none' } = req.body;
  const prompt = `Suggest a simple, nutritious one-day meal plan for someone on a ${dietType} diet aiming to ${goal}. Allergies/restrictions: ${allergies}.`;
  try {
    const reply = await granitService.chat(prompt, []);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/motivation', async (req, res) => {
  const prompt = 'Give me one powerful, short motivational fitness quote and one concrete tip to stay consistent with workouts today.';
  try {
    const reply = await granitService.chat(prompt, []);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏋️  Fitness Buddy running at http://localhost:${PORT}`);
  console.log(`   Model : ${process.env.GRANITE_MODEL_ID || 'ibm/granite-13b-chat-v2'}`);
  console.log(`   Env   : ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
