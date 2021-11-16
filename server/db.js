const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(
    'mongodb+srv://navjot_chahal:xX6NbAtzfsV2lirT@shoppinglist.zgn7k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      dbName: 'RN-Messenger',
    }
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
