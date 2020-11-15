import mongoose from "mongoose";
import UserSchema from "../models/User";

export default async (req, res) => {
  const connection = await mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
  });

  try {
    const User = connection.model("User", UserSchema);
    const {
      query: { name },
      method,
    } = req;

    switch (method) {
      case "POST":
        User.create({ name }, (error, user) => {
          if (error) {
            connection.close();
            res.status(500).json({ error });
          } else {
            res.status(200).json(user);
            connection.close();
          }
        });
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    connection.close();
    res.tatus(500).json({ error: e.message || "Something went wrong" });
  }
};
