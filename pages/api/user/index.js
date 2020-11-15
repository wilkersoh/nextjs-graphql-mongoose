import mongoMiddleware from "../../../lib/api/mongo-middleware";
import apiHandler from "../../../lib/api/api-handler";

export default mongoMiddleware(async (req, res, connection, models) => {
  const {
    query: { name },
    method,
  } = req;

  apiHandler(res, method, {
    POST: (response) => {
      models.User.create({ name }, (error, user) => {
        if (error) {
          connection.close();
          response.status(500).json({ error });
        } else {
          response.status(200).json(user);
          connection.close();
        }
      });
    },
  });
});

// import mongoose from "mongoose";
// import UserSchema from "../../../models/User";

// const connectToMongo = async () => {
//   const connection = await mongoose.createConnection(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     bufferCommands: false,
//     bufferMaxEntries: 0,
//     useUnifiedTopology: true,
//   });

//   const User = connection.model("User", UserSchema);
//   return {
//     connection,
//     models: {
//       User,
//     },
//   };
// };

// const apiHandler = (res, method, handlers) => {
//   if (!Object.keys(handles).includes(method)) {
//     res.setHeader("Allow", Object.keys(handles));
//   } else handlers[method](res);
// };

// const mongoMiddleware = (handler) => async (req, res) => {
//   const { connection, models } = await connectToMongo();
//   try {
//     await handler(req, res, connection, models);
//   } catch (error) {
//     connection.close();
//     res.status(500).json({ error: error.message || "Something went wrong" });
//   }
// };

// export default mongoMiddleware(async (req, res, connection, models) => {
//   const {
//     query: { name },
//     method,
//   } = req;

//   apiHandler(res, method, {
//     POST: (response) => {
//       models.User.create({ name }, (error, user) => {
//         if (error) {
//           connection.close();
//           response.status(500).json({ error });
//         } else {
//           response.status(200).json(user);
//           connection.close();
//         }
//       });
//     },
//   });
// });
