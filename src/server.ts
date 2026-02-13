import { Server } from "http";
import app from "./app";
import { envVariable } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    // listen at the server
    server = app.listen(envVariable.PORT, () => {
      console.log(`Server is running at ${envVariable.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// starts the server
startServer();

/* 
unhandled rejection error --->example
Promise.reject(new Error(`I forgot to handle this promise!`));
*/
process.on("unhandledRejection", (err) => {
  console.log(`unhandled rejection caught. server shutting down .....`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

/**
 * uncaught exception error EXAMPLE
 * throw new Error(`I forgot to handle this local error!`);
 */
process.on("uncaughtException", (err) => {
  console.log(`uncaught exception detected. SERVER SHUTTING DOWN......`, err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// sigterm ---> signal termination error
process.on("SIGTERM", () => {
  console.log(`signal termination error occurred. SERVER SHUTTING DOWN....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
