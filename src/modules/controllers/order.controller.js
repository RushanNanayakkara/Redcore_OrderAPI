import HttpStatus from 'http-status-codes';
import Order from '../models/order/order.model';

export async function addOrder(req, res) {
  try {
    const order = await Order.create(req.body);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function deleteOrder(req, res) {
  try {
    const order = await Order.findById(req.body._id);
    await order.remove();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

export async function updateOrder(req, res) {
  try {
    const order = await Order.findById(req.body._id);

    Object.keys(req.body).forEach(key => {
      order[key] = req.body[key];
    });

    return res.status(HttpStatus.OK).json(await order.save());
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

export async function getOrder(req, res) {
  try {
    const order = await Order.findById(req.query._id);
    if (!order) {
      return res.sendStatus(404);
    }
    return res.status(HttpStatus.OK).json(order);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

export async function getOrderList(req, res) {
  try {
    Order.find({ customerid: req.query.customer_id }, (err, orders) => {
      if (err) {
        return res.sendStatus(HttpStatus.EXPECTATION_FAILED);
      }
      res.status(HttpStatus.OK).json(orders);
    });
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

export async function deleteAll(req, res) {
  try {
    return Order.deleteMany({ customerid: req.query.customer_id }, (err) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
      }
      return res.sendStatus(HttpStatus.OK);
    });
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

