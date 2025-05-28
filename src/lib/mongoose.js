import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://user123:user123@cluster0.kltgqdg.mongodb.net/sales_Inventory?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Initialize mongoose connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    // Disconnect any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    // Connect with options
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 5,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 10000,
    });

    isConnected = true;
    console.log('✅ MongoDB connected successfully');

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }
};

// Define the SalesChannel schema
const salesChannelSchema = new mongoose.Schema({
  nzDropshipping: Boolean,
  nzDropshippingAutoCalculate: Boolean,
  nzDropshippingDropdown: String,
  Emailplatformatrackingfile: Boolean,
  ImportFromRTS: String,
  company: String,
  website: String,
  address1: String,
  address2: String,
  firstName: String,
  lastName: String,
  suburbState: String,
  postcode: String,
  email: String,
  phone: String,
  abn: String,
  emailPlatforminvoice: Boolean,
  salesChannelID: String,
  salesChannelName: String,
  salesChannelType: String,
  accountmanagar: String,
  invoice: String,
  tracking: String,
  cancleorder: String,
  startOnCampaign: Boolean,
  dateFrom: String,
  dateTo: String,
  discountPercentage: String,
  campaignNote: String,
  salesChannelCode: String,
  orderNumberPrefix: String,
  descriptionChannel: Boolean,
  sellingChannel: Boolean,
  commissionPercentage: String,
  dropshippingValue: String,
  imageOutputPath: String,
  orderTemplate1: String,
  orderTemplate2: String,
  orderTemplate3: String,
  trackingFileTemplate: String,
  invoiceTemplate: String,
  invoiceOrPO: String,
  invoiceFolder: String,
  "1POINV": Boolean,
  CustomerinvoicelncGST: Boolean,
  missinginvoice: Boolean,
  Emailinvoicerequired: Boolean,
  paymentrequired: Boolean,
  payementterm: String,
  bankReferenceName: String,
  QuickBooksOrderID: String,
  removedtext: String,
  paymentNote: String,
  Currency: String,
  pricingRules: String,
  offSellingPrice: String,
  offSellingPricecheckbox: Boolean,
  plusShipping: Boolean,
  calculateNZPricecheckbox: Boolean,
  calculateNZPrice: String,
  calculateRetailPricecheckbox: Boolean,
  calculateRetailPrice: String,
  calculateGSTcheckbox: Boolean,
  calculateGST: String,
  roundingLowcheckbox: Boolean,
  roundingLow: String,
  roundingHighcheckbox: Boolean,
  roundingHigh: String,
}, { timestamps: true });

// Initialize models
const SalesChannel = mongoose.models.SalesChannel || mongoose.model('SalesChannel', salesChannelSchema);

// Export both the connection function and models
export { connectDB, SalesChannel };
export default connectDB; 