// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("MONGO_URI=mongodb+srv://anasthokan0:Anas1234@cluster0.n6sk2v9.mongodb.net/zamana" , {
      
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
// console.log("MONGO_URI =>", process.env.MONGO_URI);

//     console.log("✔ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("TYPE:", typeof process.env.MONGO_URI);
    console.log("RAW VALUE:", JSON.stringify(process.env.MONGO_URI));

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✔ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

