require("dotenv").config(); // dot env file ke liye
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
     origin: "http://localhost:5173",
    // origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOptions)); // middleware -> cors error solve krne ke liye

app.use(express.json()); // middleware -> parsing of json for http request 

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// let's define admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = 5000; 

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
})

