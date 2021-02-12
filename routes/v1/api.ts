import BotController from "../../controllers/BotController";
import MessageController from "../../controllers/MessageController";
export default function (app) {
  const botController = new BotController();
  const messageController = new MessageController();
  app.get("/api/qrcode", botController.getQrCode);
  app.post("/api/message", messageController.sendMessage);
  app.post("/api/location", messageController.sendLocation);
  app.post("/api/media", messageController.sendMedia);
}
