import NotFound from "../exceptions/NotFound";
import { sendRes } from "./errorsHandler";

export default function (req, res, next) {
  console.log("Sono il middleware per la gestione delle rotte non trovate");
  sendRes(new NotFound("La rotta richiesta non è stata trovata"), res);
}
