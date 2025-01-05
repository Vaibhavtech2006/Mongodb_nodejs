const { MongoClient } = require("mongodb"); // Correct import syntax

const uri = "mongodb://127.0.0.1:27017"; // Include the port for MongoDB
const client = new MongoClient(uri);

const data1 = {
  name: "vk",
  company: "delloite",
};

const main = async () => {
  try {
    await client.connect(); // Connect to MongoDB
    const db = client.db("testdb"); // Access the database
    const collection = db.collection("people"); // Access the collection

    // Insert a document
    await collection.insertOne(data1); // Insert the correct object

    // Query the collection
    const fetchedData = await collection.find({ age: { $gt: 15 } }).toArray(); // Fetch data

    console.log("Fetched Data:", fetchedData); // Log the fetched data
    return "done";
  } catch (error) {
    console.error("Error:", error); // Handle errors
  } finally {
    await client.close(); // Ensure the client is closed
  }
};

main()
  .then((result) => console.log(result)) // Handle success
  .catch((error) => console.error(error)); // Handle errors
