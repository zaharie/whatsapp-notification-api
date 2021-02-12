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
      let params = {
        phone: req.params.phone,
        message:req.body.message
      };
      await this.message.sendMessage(params.phone, params.message);
      return res.status(200).send();
    } catch (error) {
      let normalizedError = await this.handleError(error);
      return res.status(normalizedError.error.status).send(normalizedError);
    }
  };
  /**
   * return current qrCode.
   * @param {req} req - The request.
   * @param {Response} res - The response
   */

  public sendLocation = async (req, res) => {
    try {
      let params = {
        phone: req.params.phone,
        location: req.body.location,
        latitude: req.body.latitude,
        description: req.body.description,
      };

      await this.message.sendLocation(
        params.phone,
        params.location,
        params.latitude,
        params.description
      );
      return res.status(200).send();
    } catch (error) {
      let normalizedError = await this.handleError(error);
      return res.status(normalizedError.error.status).send(normalizedError);
    }
  };

  /**
   * return current qrCode.
   * @param {req} req - The request.
   * @param {Response} res - The response
   */

  public sendMedia = async (req, res) => {
    try {
      let params = {
        phone: req.params.phone,
        image: req.body.image,
      };

      await this.message.sendMedia(params.phone, params.image);
      return res.status(200).send();
    } catch (error) {
      let normalizedError = await this.handleError(error);
      return res.status(normalizedError.error.status).send(normalizedError);
    }
  };
}

export default MessageController;
