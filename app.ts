import server from "./config/server";
import { initBot } from "./ClientModule";

var port = process.env.VCAP_APP_PORT || 8080;

server.listen(port, () => {
  console.log(`server running on port ${port}`);
  initBot();
});
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
