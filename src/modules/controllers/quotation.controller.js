import HttpStatus from 'http-status-codes';
import Quotation from '../models/quotation/quotation.model';

export async function addQuotation(req, res) {
  try {
    const quotation = await Quotation.create(req.body);
    return res.status(201).json(quotation);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function deleteQuotation(req, res) {
  try {
    const quotation = await Quotation.findById(req.body._id);
    await quotation.remove();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

export async function updateQuotation(req, res) {
  try {
    const quotation = await Quotation.findById(req.body._id);

    Object.keys(req.body).forEach(key => {
      quotation[key] = req.body[key];
    });

    return res.status(HttpStatus.OK).json(await quotation.save());
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

export async function getQuotation(req, res) {
  try {
    const quotation = await Quotation.findById(req.query._id);
    if (!quotation) {
      return res.sendStatus(404);
    }
    return res.status(HttpStatus.OK).json(quotation);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

export async function getQuotationList(req, res) {
  try {
    Quotation.find({ customerid: req.query.customer_id }, (err, quotations) => {
      if (err) {
        return res.sendStatus(HttpStatus.EXPECTATION_FAILED);
      }
      res.status(HttpStatus.OK).json(quotations);
    });
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

export async function deleteAll(req, res) {
  try {
    return Quotation.deleteMany({ customerid: req.query.customer_id }, (err) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
      }
      return res.sendStatus(HttpStatus.OK);
    });
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}
