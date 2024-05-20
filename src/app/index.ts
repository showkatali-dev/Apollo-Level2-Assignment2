import express from 'express';
import cors from 'cors';
import { productRoute } from './modules/product/product.route';
import { globalErrorHandler, notFoundHandler } from './middlewares/error';
import { orderRoute } from './modules/order/order.route';

const app = express();

app.use([cors(), express.json()]);

app.get('/', (_req, res) => {
  res.send(`<h1 style="text-align:center">Hurrah!! Server is running...</h1>`);
});

app.get('/health', (_req, res) => {
  res.send({
    message: 'OK',
  });
});

app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

app.use([notFoundHandler, globalErrorHandler]);

export default app;
