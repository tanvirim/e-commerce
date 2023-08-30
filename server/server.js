const app = require("./app");
const dotenv = require("dotenv");
const connectToMongoDB = require("./config/database");

//handling uncought exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server due to uncought exception");
  process.exit(1);
});


//config
dotenv.config({ path: "server/config/config.env" });
//mongo connection
connectToMongoDB();
//listen
const server = app.listen(process.env.PORT, () =>
  console.log(`server is running at http://localhost:${process.env.PORT}`)
);

//unhandles promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
