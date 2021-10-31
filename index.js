const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ryljg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        // console.log('server connected');
        const database = client.db('assignment_11');
        const tourCollection = database.collection('tour_plan');
        const myOrderCollection = database.collection('my_orders');

        // get plans
        app.get('/add_plan', async (req, res) => {
            const result = await tourCollection.find({}).toArray();
            res.send(result)
        })

        // get a plan
        app.get('/add_plan/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await tourCollection.findOne(query);
            res.send(result);
        })

        // get a plan
        app.get('/my_orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await myOrderCollection.findOne(query);
            res.send(result);
        })

        // post plans
        app.post('/add_plan', async (req, res) => {
            const result = await tourCollection.insertOne(req.body);
            console.log(result);
            res.send(result);
        })

        // delete a plan
        app.delete('/add_plan/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await tourCollection.deleteOne(query);
            console.log('delete', result);
            res.send(result)
        })
        // update a order status
        app.put('/my_orders/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = { $set: { "status": "Approved" } }
            const result = await myOrderCollection.updateOne(filter, updateDoc, options)
            console.log(result);
            res.send(result)
        })

        // delete a order
        app.delete('/my_orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await myOrderCollection.deleteOne(query);
            console.log('delete', result);
            res.send(result)
        })

        // place order
        app.post('/my_orders', async (req, res) => {
            const result = await myOrderCollection.insertOne(req.body);
            res.send(result)
        })

        //  get orders
        app.get('/my_orders', async (req, res) => {
            const result = await myOrderCollection.find({}).toArray();
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