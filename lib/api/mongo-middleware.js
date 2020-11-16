import connectToMongo from "./connect-to-mongo";

const mongoMiddleware = (handler) => async (req, res) => {
  const { connection, models } = await connectToMongo();
  try {
    console.log("------mongommidleware top----");
    console.log(models);
    await handler(req, res, connection, models);
    console.log("------mongommidleware below way-------");
  } catch (e) {
    connection.close();
    res.status(500).json({ error: e.message || "something went wrong" });
  }
};

export default mongoMiddleware;
