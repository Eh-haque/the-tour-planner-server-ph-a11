const express = require('express');
const { MongoClient, Collection } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ryljg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('server connected');
        const database = client.db('assignment_11');
        const tourCollection = database.collection('tour_plan');

        // add plans
        app.post('/add_plan', async (req, res) => {
            const result = await tourCollection.insertOne(req.body);
            console.log(result);
        })

        // get plans
        app.get('/add_plan', async (req, res) => {
            const result = await tourCollection.find({}).toArray();
            res.send(result)
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Assignment 11 server is running...');
});

app.listen(port, () => {
    console.log('Server running at port', port);
})