const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const path = require('path');
const db = require('./db');

const collection = "todo";


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// get the db data
app.get('/getTodos', (req, res) => {
    db.getDB().collection(collection).find({}).toArray((err, document) => {
        if (err) throw err;
        else {
            console.log(document);
            res.json(document);
        }
    });
});


//update server
app.put('/:id', (req, res) => {
    const todoID = req.params.id;
    const userInput = req.body;
    db.getDB().collection(collection).findOneAndUpdate({ _id: db.getPrimaryKey(todoID) },
        { $set: { todo: userInput.todo } },
        { returnOriginal: false }, (err, result) => {
            if (err) throw err;
            else {
                res.json(result);
            }
        });
});

// creat ...
app.post('/', (req, res) => {
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput, (err, result) => {
        if (err) throw err;
        else {
            res.json({ result: result, document: result.ops[0] });
        }
    });
});

//delete ..

app.delete('/:id', (req, res) => {
    const todoID = req.params.id;
    console.log(todoID)
    db.getDB().collection(collection).findOneAndDelete({ _id: db.getPrimaryKey(todoID) }, (err, result) => {
        if (err) throw err;
        else {
            console.log("ok");
            res.json(result);
        }
    });
})

db.connect((err) => {
    if (err) {
        console.log(err, 'Something went wrong');
        process.exit(1);
    }
    else {
        app.listen(3000, () => {
            console.log("connected");

        });
    }
})