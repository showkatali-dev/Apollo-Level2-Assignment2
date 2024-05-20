import express from 'express';
import cors from 'cors';

const app = express();

app.use([cors(), express.json()]);

app.get('/', (req, res) => {
  res.send(`<h1 style="text-align:center">Hurrah!! Server is running...</h1>`);
});

app.get('/health', (req, res) => {
  res.send({
    message: 'OK',
  });
});

app.use((req, res) => {
  res.status(404).send({
    success: false,
    message: 'Route not found',
  });
});

export default app;
