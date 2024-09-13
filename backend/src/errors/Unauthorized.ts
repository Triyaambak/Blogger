import CustomError from "./CustomError";
import { StatusCodes } from "http-status-codes";

class Unauthorized extends CustomError {
    private status: number;
    constructor(message : string) {
        super(message);
        this.status = StatusCodes.UNAUTHORIZED;
    }
}

export default Unauthorized;