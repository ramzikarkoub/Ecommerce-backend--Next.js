import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parentCategory: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: [{ type: Object }],
});

const Category = models.Category || model("Category", CategorySchema);
export default Category;
