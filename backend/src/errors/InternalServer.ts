import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

class InternalServer extends CustomError{
    private status: number;
    constructor(message : string) {
        super(message);
        this.status = StatusCodes.INTERNAL_SERVER_ERROR; 
    }
}

export default InternalServer;