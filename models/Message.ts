import { bot } from "../ClientModule";
import Location  from "whatsapp-web.js/src/structures/Location"

class Message {

  constructor() {
    
  }
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

  public sendLocation = async (phone: string, message: string) => {
    let numberIdResponse = await bot.client.getNumberId(phone);
    if (!numberIdResponse) {
      return;
    };

    let loc = new Location(-25.1206651,-50.1454638,"Teste api");

    let messageResponse = await bot.client.sendMessage(
      numberIdResponse._serialized,
      loc
    );
  };
}



export default Message;
