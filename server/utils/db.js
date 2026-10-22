const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin";

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection successful to MongoDB");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit with non-zero status to indicate failure
    }
};

module.exports = connectDb;
