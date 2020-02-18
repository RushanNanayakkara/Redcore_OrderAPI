import mongoose, { Schema } from 'mongoose';

const Order = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['PLACED', 'ONGOING', 'COMPLETE'],
  },
  customerid: {
    type: Schema.Types.ObjectId,
    required: [true, 'CustomeId is required!'],
    trim: true,
    validate: {
      validator(customerid) {
        return new mongoose.Types.ObjectId(customerid) === customerid;
      },
      message: '{VALUE} is not a valid customerId!',
    },
  },
  garmentid: {
    type: Schema.Types.ObjectId,
    required: false,
    trim: true,
    validate: {
      validator(customerid) {
        return new mongoose.Types.ObjectId(customerid) === customerid;
      },
      message: '{VALUE} is not a valid garmentId!',
    },
  },
  quotationid: {
    type: Schema.Types.ObjectId,
    required: [true, 'QuotationId is required!'],
    trim: true,
    validate: {
      validator(customerid) {
        return new mongoose.Types.ObjectId(customerid) === customerid;
      },
      message: '{VALUE} is not a valid quotationId!',
    },
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    validate: {
      validator(amount) {
        return /\d+/.test(amount);
      },
      message: '{VALUE} is not a valid amount',
    },
  },
  price: {
    type: Number,
    default: 0,
    validate: {
      validator(price) {
        return /\d+/.test(price);
      },
      message: '{VALUE} is not a valid price',
    },
  },

  paid: {
    type: Number,
    default: 0,
    validate: {
      validator(paid) {
        return /\d+/.test(paid);
      },
      message: '{VALUE} is not a valid value for paid field',
    },
  },

  placeddate: {
    type: Date,
    default: Date.now,
  },
  duedate: {
    type: Date,
    default: Date.now,
  },
});

Order.methods = {
  toJSON() {
    return {
      _id: this._id,
      status: this.status,
      customerid: this.customerid,
      garmentId: this.garmrntid,
      quotationId: this.quotationid,
      amount: this.amount,
      price: this.price,
      paid: this.paid,
      placeddate: this.placeddate,
      duedate: this.duedate,
      name: this.name,
    };
  },
};

export default mongoose.model('Order', Order, 'order');
