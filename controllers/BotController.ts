import BaseController from "./BaseController";
import { Request, Response } from "express";
import Bot from "../models/Bot";
class BotController extends BaseController {
  public bot: any;
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
      return res.status(200).send({qrCode:result.qrCode});
    } catch (error) {
      let normalizedError = await this.handleError(error);
      return res.status(normalizedError.error.status).send(normalizedError);
    }
  };
}

export default BotController;
