import server from "./config/server";
import { initBot } from "./ClientModule";
let port = 8080
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
