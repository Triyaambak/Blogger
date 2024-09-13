import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

class BadRequest extends CustomError {
    private status: number;
    constructor(message: string) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequest;