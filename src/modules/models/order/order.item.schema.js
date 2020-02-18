/* ///////////////////////////////
      File Removed(Not Used)
//////////////////////////////*/

import validator from 'validator';
import { Schema } from 'mongoose';

const OrderSchema = new Schema({
  designURL: {
    type: String,
    required: true,
    validate: {
      validator(designURL) {
        return validator.isURL(designURL);
      },
      message: 'Invalid design URL',
    },
  },
  designType: {
    type: String,
    required: true,
    enum: ['REDCORE_DESIGN', 'CUSTOM_DESIGN'],
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator(quantity) {
        return /\d+/.test(quantity);
      },
      message: '{VALUE} is not a valid quantity',
    },
  },
  material: {
    type: String,
    required: true,
  },
  collarType: {
    type: String,
    required: false,
    enum: ['CHINESE', 'NO_COLLAR'],
  },
  sleeveType: {
    type: String,
    required: false,
    enum: ['LONG', 'SHORT', 'NO_SLEEVE'],
  },
  price: {
    type: Number,
    required: false,
    validate: {
      validator(price) {
        return /\d+/.test(price);
      },
      message: '{VALUE} is not a valid price',
    },
  },
  garmentId: {
    type: Schema.Types.ObjectId,
  },
});

OrderSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      designURL: this.designURL,
      designType: this.designType,
      quantity: this.quantity,
      material: this.material,
      collarType: this.collarType,
      sleeveType: this.sleeveType,
      price: this.price,
      garmentId: this.garmentId,
    };
  },
};

export default OrderSchema;

