import { bot } from "../ClientModule";
import Location from "whatsapp-web.js/src/structures/Location";
import { MessageMedia } from "whatsapp-web.js";

class Message {
  constructor() {}
  /**
   * Init puppeter instance.
   * @param {client} client - The client Instance of puppeter.
   */
  public sendMessage = async (phone: string, message: string) => {
    let numberIdResponse = await bot.client.getNumberId(phone);
    if (!numberIdResponse) {
      return;
    }
    let messageResponse = await bot.client.sendMessage(
      numberIdResponse._serialized,
      message
    );
  };

  /**
   * Send a template message of type Location
   * @param {phone} phone - The phone that message will be send.
   * @param {latitude} latitude - The latitude coordinate.
   * @param {longitude} longitude - the longitude coordinate.
   * @param {description} description - the description of the coordinate.
   */
  public sendLocation = async (
    phone: string,
    latitude: string,
    longitude: string,
    description: string
  ) => {
    let numberIdResponse = await bot.client.getNumberId(phone);
    if (!numberIdResponse) {
      return;
    }
    let loc = new Location(latitude, longitude, description);
    let messageResponse = await bot.client.sendMessage(
      numberIdResponse._serialized,
      loc
    );
    return;
  };

  /**
   * Send a template message of type Media
   * @param {phone} client - The phone that message will be send.
   * @param {image} image - Image encoded in Base64
   */

  public sendMedia = async (phone: string, image: string) => {
    let numberIdResponse = await bot.client.getNumberId(phone);
    if (!numberIdResponse) {
      return;
    }
    let media = new MessageMedia("image/png", image);
    let messageResponse = await bot.client.sendMessage(
      numberIdResponse._serialized,
      media
    );
    return;
  };
}

export default Message;
