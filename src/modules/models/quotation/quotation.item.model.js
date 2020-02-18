import validator from 'validator';
import { Schema } from 'mongoose';

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  designType: {
    type: String,
    required: true,
    enum: ['REDCORE_DESIGN', 'CUSTOM_DESIGN'],
  },
  designID: {
    type: String,
    required: false,
  },
  designURL: {
    type: String,
    required: false,
    validate: {
      validator(designURL) {
        return validator.isURL(designURL);
      },
      message: 'Invalid design URL',
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
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'ISSUED', 'EXPIRED'],
  },
  issuedDate: {
    type: Date,
    rquired: false,
  },
});

ItemSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      designType: this.designType,
      designID: this.designID,
      designURL: this.designURL,
      quantity: this.quantity,
      material: this.material,
      collarType: this.collarType,
      sleeveType: this.sleeveType,
      price: this.price,
      issuedDate: this.issuedDate,
      status: this.status,
    };
  },
};

export default ItemSchema;

