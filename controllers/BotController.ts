import BaseController from "./BaseController";
class BotController extends BaseController {
  async test(req, res) {
    return res.send({ success: true }).status(200);
  }
}
export default BotController;
