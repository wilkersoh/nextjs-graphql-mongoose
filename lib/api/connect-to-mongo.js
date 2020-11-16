import mongoose from "mongoose";

// we'll import all the schemas here and return them
// on the mongo connection object
// for use in the handlers
import UserSchema from "../../models/User";

const connectToMongo = async () => {
  const connection = await mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
  });
  const User = connection.model("User", UserSchema);
  console.log("-----connect to mongo-----");
  return {
    connection,
    models: {
      User,
    },
  };
};

export default connectToMongo;
