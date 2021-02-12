import BaseController from "./BaseController";
import { Request, Response } from "express";
import Message from "../models/Message";
class MessageController extends BaseController {
  public message: Message;
  constructor() {
    super();
    this.message = new Message();
  }

  /**
   * return current qrCode.
   * @param {req} req - The request.
   * @param {Response} res - The response
   */

  public sendMessage = async (req, res) => {
    try {
      await this.message.sendMessage("554299114848", "teste");
      return res.status(200).send();
    } catch (error) {
      let normalizedError = await this.handleError(error);
      return res.status(normalizedError.error.status).send(normalizedError);
    }
  };

  public sendLocation = async (req, res) => {
    try {
      await this.message.sendLocation("554299419554", "teste");
      return res.status(200).send();
    } catch (error) {
      let normalizedError = await this.handleError(error);
      return res.status(normalizedError.error.status).send(normalizedError);
    }
  };

}

export default MessageController;
