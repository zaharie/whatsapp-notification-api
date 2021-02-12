import server from "./config/server";
import { initBot } from "./ClientModule";

var port = process.env.VCAP_APP_PORT || 3000;
initBot();
server.listen("0.0.0.0", ()=>{
  console.log("running");
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
