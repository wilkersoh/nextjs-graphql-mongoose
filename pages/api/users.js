import mongoMiddleware from "../../lib/api/mongo-middleware";
import apiHandler from "../../lib/api/api-handler";

export default mongoMiddleware(async (req, res, connection, models) => {
  const { method } = req;
  console.log("check below connection value");
  console.log(connection);
  console.log("check top connection value");
  apiHandler(res, method, {
    GET: (response) => {
      models.User.find({}, (error, user) => {
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
