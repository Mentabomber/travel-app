import NotFound from "../exceptions/NotFound.js";
import { sendRes } from "./errorsHandler.js";

export default function (req, res, next) {
  console.log("Sono il middleware per la gestione delle rotte non trovate");
  sendRes(new NotFound("La rotta richiesta non è stata trovata"), res);
}
