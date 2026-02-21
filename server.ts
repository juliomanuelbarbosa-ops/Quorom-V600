import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://quorom-v600.vercel.app', 'http://localhost:3000'] // Replace with your actual production URL
    : true, // Allow all origins in development
  credentials: true
}));
app.use(express.json());

// Mock WiFi markers API (used by GeoSentinel / ChainSight)
app.get('/api/get_markers.php', (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat & lng required' });

  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lng as string);

  const mockData = Array.from({ length: 15 }, (_, i) => ({
    ssid: `QUORUM_NODE_${i + 1}`,
    mac: `00:1A:2B:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}`,
    encryption: ['None', 'WPA2', 'WPA3'][i % 3],
    lat: latitude + (Math.random() - 0.5) * 0.015,
    lon: longitude + (Math.random() - 0.5) * 0.015,
    signal: Math.floor(Math.random() * 40) + 60,
  }));

  res.json(mockData);
});

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', version: 'v600' }));

// Initialize GoogleGenAI (lazy initialization to avoid crashes if key is missing)
let ai: GoogleGenAI | null = null;
const getGoogleGenAI = () => {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set.');
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

// Gemini AI Proxy Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { model, contents, config } = req.body;

    if (!model || !contents) {
      return res.status(400).json({ error: 'Model and contents are required.' });
    }

    const genAI = getGoogleGenAI();
    const responseStream = await genAI.models.generateContentStream({
      model,
      contents,
      config,
    });

    res.setHeader('Content-Type', 'text/plain');
    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }
    res.end();
  } catch (error: any) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: error.message || 'An error occurred with the Gemini API.' });
  }
});

// Vite dev / production static
async function startServer() {
  if (process.env.NODE_ENV === 'development') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Quorum-V600 listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);