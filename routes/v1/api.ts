import BotController from "../../controllers/botController";
export default function (app) {
  const botController = new BotController();
  app.get("/", botController.getQrCode);
};
