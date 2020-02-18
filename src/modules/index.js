import quotationRoutes from './routes/quotation.route';
import orderRoutes from './routes/order.route';

export default app => {
  app.use('/api/v1/quotation', quotationRoutes);
  app.use('/api/v1/order', orderRoutes);

  app.get('/', (req, res) => {
    res.status(500).send('Invalid URL');
  });
};
