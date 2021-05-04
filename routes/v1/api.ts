import BotController from "../../controllers/BotController";
import MessageController from "../../controllers/MessageController";
export default function (app) {
  const botController = new BotController();
  const messageController = new MessageController();
  app.get("/api/qrcode", botController.getQrCode);
  app.get("/status", (req, res) => {
    return res.status(200).send({ status: "ok" });
  });
  app.post("/api/message/:phone", messageController.sendMessage);
  app.post("/api/location/:phone", messageController.sendLocation);
  app.post("/api/media/:phone", messageController.sendMedia);
}
