import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    items: Object,
    cartTotal: Number,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    phoneNumber: Number,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

const Order = models?.Order || model("Order", OrderSchema);
export default Order;
