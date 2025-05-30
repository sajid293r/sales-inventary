import mongoose from "mongoose";

const productInventorySchema = new mongoose.Schema({
  canBeSold: Boolean,
  canBePurchased: Boolean,
  assemblyRequired: Boolean,
 spareParts: Boolean,
  saleExelude: Boolean,
  numberOfCartons:Number,
  productTitle: {
    type: String,
    required: true
  },
  sku: String,
  gtin: String,
  brand: String,
  status: String,

  rrp: String,
  sellingPrice: String,
  shipping: String,
  shippingPrice: String,

  imageName: {
    type: String,
    default: ""
  },
  imageUrl: String,

  upc: String,
  upcAmazonCatch: String,
  certificationNo: String,
  previousSku: String,

  productDimensions: {
    length: String,
    height: String,
    width: String,
    weight: String,
    volume: String,
  },

  package1: {
    length: String,
    height: String,
    width: String,
    weight: String,
    volume: String,
  },

  package2: {
    length: String,
    height: String,
    width: String,
    weight: String,
    volume: String,
  },

  package3: {
    length: String,
    height: String,
    width: String,
    weight: String,
    volume: String,
  },

  stockLevel: {
    stocklevel: String,
    sold: String,
    factorysecond: String,
    damaged: String,
  },

  purchase: {
    purchaseprice: String,
    costinaus: String,
    profit: String,
    profitratio: String,
    returnratio: String,
  },

  notes: String,

  organization: {
    categoryproduct: String,
    producttype: String,
    collection: String,
    tags: String,
  },
},
{
  timestamps: true,
});

const ProductInventory = mongoose.models.ProductInventory || mongoose.model("ProductInventory", productInventorySchema);

export default ProductInventory;
