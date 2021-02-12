import server from "./config/server";
import { initBot } from "./ClientModule";
var host = process.env.VCAP_APP_HOST || "localhost";
var port = process.env.VCAP_APP_PORT || 3000;
initBot();
server.listen(8080, host);
process.on("uncaughtException", function (err) {
  console.log(err);
});
process.on("unhandledRejection", function (reason, p) {
  console.log(
    "Possibly Unhandled Rejection at: Promise ",
    p,
    " reason: ",
    reason
  );
});
