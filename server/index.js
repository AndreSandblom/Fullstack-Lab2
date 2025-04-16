const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.get("/api", (req,res) => {
    res.json({message:"Hello from the server!"});
});

app.use("/api/employees", require('./routes/employeeRoutes'));
app.use("/api/projects", require('./routes/projectRoutes'));
app.use("/api/project_assignments", require('./routes/projectAssignmentRoutes'));

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

mongoose.connect(process.env.MONGO_STRING)
    .then(() => {
        console.log("Connection to MongoDB sucess.")

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on on ${PORT}`))
    })
    .catch((err) => {
        console.error("MongoDB Connection problem: ", err);
    });