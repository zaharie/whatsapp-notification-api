import server from "./config/server";
import { initBot } from "./ClientModule";

server.listen(8080, () => {
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
