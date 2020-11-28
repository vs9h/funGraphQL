const { graphqlHTTP } = require('express-graphql');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('../schema/schema');

const app = express();
const PORT = 4000;
mongoose.connect('mongodb+srv://vs9lh:1GjKkuwCstzPVsuy@cluster0.xsa4o.mongodb.net/gql-test?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true });

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`connected${err}`));
dbConnection.once('open', () => console.log('connected'));

app.listen(PORT, (err) => {
  if (err) { console.log(err); } else { console.log('startuem'); }
});
