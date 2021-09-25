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

  public init = async (): Promise<void> => {
    let session = await this.checkSession();
    this.client = new Client({
      puppeteer: {
        // @ts-ignore: Unreachable code error
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
      session: session,
    });
    await this.registerListners(this.client);
    await this.client.initialize();
  };

  private checkSession = async (): Promise<ClientSession> => {
    let sessionFile = null;
    if (await fsSync.existsSync("./session.json")) {
      sessionFile = JSON.parse(await fs.readFile("./session.json", "utf8"));
    }
    if (!sessionFile) {
      console.log("cannot find session.json");
      return sessionFile;
    }
    return sessionFile;
  };

  private registerListners = async (client) => {
    client.on("qr", (qr) => {
      fs.writeFile("qrCode.json", qr);
    });
    client.on("ready", () => {
      console.log("Client is ready!");
    });

    client.on("authenticated", (session) => {
      fs.writeFile("session.json", JSON.stringify(session));
      console.log("autenticated !");
    });

    client.on("auth_failure", (session) => {
      console.log(session);
    });

    client.on("message", (msg) => {});
    return;
  };

  public getQrCode = async () => {
    let qrCode = await fs.readFile("./qrCode.json", "utf8");
    return { qrCode };
  };
}
export default Bot;
