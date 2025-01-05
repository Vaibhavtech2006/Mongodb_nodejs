const mongoose = require("mongoose"); // Correct require syntax
const uri = "mongodb://127.0.0.1/testdb";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }) // Options to avoid deprecation warnings
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define the schema
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0, // Assuming age cannot be negative
  },
  occupation: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // Array of strings
    required: true,
  },
  emailvk: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v); // Email validation regex
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

// Create a model
const Product = mongoose.model("Product", productSchema);

// Main function to query the database
const main = async () => {
  try {
    const data = await Product.find({ price: { $eq: 3466 } }); // Query the collection
    console.log(data);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    mongoose.connection.close(); // Close the connection to the database
  }
};

// Execute the main function
main();
