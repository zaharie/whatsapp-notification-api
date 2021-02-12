import { Client, ClientSession } from "whatsapp-web.js";
import { promises as fs } from "fs";
import fsSync from "fs"; 
class Bot {
  client: Client;
  session: any;

  constructor() {}

  /**
   * Init puppeter instance.
   * @param {client} client - The client Instance of puppeter.
   */

  public init = async () => {
    let session = await this.checkSession();
    this.client = new Client({
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--unhandled-rejections=strict",
        ],
      },
      session: session,
    });
    this.registerListners(this.client);
    await this.client.initialize();
  };

  private checkSession = async (): Promise<ClientSession> => {
    let sessionFile;
    if (fsSync.existsSync("./session.json")) {
      sessionFile = JSON.parse(await fs.readFile("./session.json", "utf8"));
    }
    if(!sessionFile){
      return null;
    }
    return sessionFile;
  };

  private registerListners(client: Client) {
    client.on("qr", (qr) => {
      fs.writeFile("qrCode.json", qr);
    });
    client.on("ready", () => {
      console.log("Client is ready!");
    });

    client.on("authenticated", (session) => {
      fs.writeFile("session.json", JSON.stringify(session));
    });

    client.on("message", (msg) => {
      if (msg.body == "!ping") {
        msg.reply("pong");
      }
    });
  }

  public getQrCode = async () => {
    this.init();
    let qrCode = await fs.readFile("./qrCode.json", "utf8");
    return { qrCode };
  };
}
export default Bot;
