const mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/foodies-unite", { useNewUrlParser: true } )
  .then(() => console.log('MongoDB connected on port 27017...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));