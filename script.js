import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';
import connectDB from './db/server.js';
import Answer from './models/answers.js';

const app = express();
app.use(cors());
app.use(express.json());

// Connect once when the server starts
connectDB()
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

// Actual Answers 
const Ans1 = ["1", "2", "3"];
const Ans2 = ["4", "5"];
const Ans3 = ["6", "7", "8", "9", "10"];
const Ans4 = ["11"];
const Ans5 = ["12"];

// No need to deleteMany here!
const saveResult = async (email, marks) => {
    try {
        const formattedDate = dayjs().format("DD MMM YYYY, hh:mm A");

        const newResult = new Answer({ email, Marks: marks,  submittedAt: formattedDate });
        await newResult.save();
        console.log("Result saved successfully");
    } catch (error) {
        console.error("Error saving result:", error);
    }
}

app.post('/submitted', async (req, res) => {
    let marks = 0;
    const user_data = req.body.answers;
    const email = req.body.email;

    if (!email || !user_data) {
        return res.status(400).send("Missing email or answers");
    }

    // Compare Answers here
    for (let i = 0; i < Ans1.length; i++) {
        if (Ans1[i] === user_data.Task1[i]) marks += 100;
    }
    for (let i = 0; i < Ans2.length; i++) {
        if (Ans2[i] === user_data.Task2[i]) marks += 100;
    }
    for (let i = 0; i < Ans3.length; i++) {
        if (Ans3[i] === user_data.Task3[i]) marks += 100;
    }

    if ((user_data.Task4 || "") === Ans4[0]) marks += 100;
    if ((user_data.Task5 || "") === Ans5[0]) marks += 100;

    await saveResult(email, marks);

    res.send('Get Data Successfully!! Marks: ' + marks);
});

app.get('/ans', async (req, res) => {
    const { email, task } = req.query;
    const queryObj = {};

    if (email) {
        queryObj.email = email;
    }

    if (task) {
        queryObj.task = { $regex: task, $options: 'i' };
    }

    try {
        const val = await Answer.find(queryObj);
        res.send(val);
    } catch (error) {
        res.status(500).send("Error fetching answers");
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
