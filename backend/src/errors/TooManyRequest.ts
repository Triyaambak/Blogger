import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

class TooManyRequest extends CustomError {
  private status: number;
  constructor(message: string) {
    super(message);
    this.status = StatusCodes.TOO_MANY_REQUESTS;
  }
}

export default TooManyRequest;
