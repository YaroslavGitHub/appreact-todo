const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://ticket1:star1976@cluster0-an22d.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const tasksRouter = require('./routes/tasks');
const todosRouter = require('./routes/todos');

app.use('/tasks', tasksRouter);
app.use('/todos', todosRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html','routes','tasks'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


