import mongoose, { Schema } from 'mongoose';
import QuotationItem from './quotation.item.model';

const Quotation = new Schema({
  customerid: {
    type: Schema.Types.ObjectId,
    required: [true, 'CustomerID is required!'],
    trim: true,
    validate: {
      validator(customerid) {
        return new mongoose.Types.ObjectId(customerid) === customerid;
      },
      message: '{VALUE} is not a valid customerId!',
    },
  },
  items: [QuotationItem],
  requestDate: {
    type: Date,
    rquired: true,
    default: Date.now,
  },
});

Quotation.methods = {
  toJSON() {
    return {
      _id: this._id,
      customerid: this.customerid,
      items: this.items,
      requestDate: this.requestDate,
    };
  },
};

export default mongoose.model('Quotation', Quotation, 'quotation');
