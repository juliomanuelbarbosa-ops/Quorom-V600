import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const app = express();

// Mock Znerox API endpoint
app.get('/api/get_markers.php', (req, res) => {
  const { lat, lng } = req.query;
  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lng as string);

  // Generate some realistic-looking mock data around the user's location
  const mockData = Array.from({ length: 15 }, (_, i) => ({
    ssid: `QUORUM_NODE_${i + 1}`,
    mac: `00:1A:2B:${Math.floor(Math.random() * 255).toString(16)}:${Math.floor(Math.random() * 255).toString(16)}:${Math.floor(Math.random() * 255).toString(16)}`,
    encryption: i % 3 === 0 ? 'None' : 'WPA2',
    lat: latitude + (Math.random() - 0.5) * 0.01,
    lon: longitude + (Math.random() - 0.5) * 0.01,
  }));

  res.json(mockData);
});

async function startServer() {
  if (process.env.NODE_ENV === 'development') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(3000, '0.0.0.0', () => {
    console.log('Server listening on port 3000');
  });
}

startServer();
