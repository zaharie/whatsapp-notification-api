import { Client } from "whatsapp-web.js";
import { promises as fs } from "fs";
class Bot {
  client: Client;
  message: any;
  constructor() {
    this.client = new Client({});
    this.registerListners(this.client);
    this.client.initialize();
  }

  /**
   * Init puppeter instance.
   * @param {client} client - The client Instance of puppeter.
   */
  private registerListners(client: Client) {
    client.on("qr", (qr) => {
      fs.writeFile("qrCode.json", qr);
    });
    client.on("ready", () => {
      console.log("Client is ready!");
    });

    client.on("message", (msg) => {
      if (msg.body == "!ping") {
        msg.reply("pong");
      }
    });
  }

  public getQrCode = async () => {
    let qrCode = await fs.readFile("./qrCode.json", "utf8");
    return { qrCode };
  };
}
export default Bot;
