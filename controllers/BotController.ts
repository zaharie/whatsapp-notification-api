import BaseController from "./BaseController";
import { Request, Response } from "express";
import Bot from "../models/Bot";
import qr from "qrcode";

class BotController extends BaseController {
  public bot: Bot;
  constructor() {
    super();
    this.bot = new Bot();
  }

  /**
   * return current qrCode.
   * @param {req} req - The request.
   * @param {Response} res - The response
   */

  public getQrCode = async (req, res) => {
    try {
      let result = await this.bot.getQrCode();
      let parsedQr = await qr.toDataURL(result.qrCode);
      return res.render("qrCode", { qrCode: parsedQr });
    } catch (error) {
      let normalizedError = await this.handleError(error);
      return res.status(normalizedError.error.status).send(normalizedError);
    }
  };
}

export default BotController;
