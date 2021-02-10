import dotenv from "dotenv";
import consign from "consign";
import express  from "express";
import compression  from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../routes/v1/api";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  return next();
});
app.disable("x-powered-by");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(compression());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
routes(app);
export default app;
