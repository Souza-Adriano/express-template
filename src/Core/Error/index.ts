import { ApplicationError } from './Error.model'
import { NextFunction, Request, Response } from 'express'

export abstract class BaseError extends Error implements ApplicationError {
    public readonly status: number;
    public readonly kind: string;

    constructor(message: string, code: number, type: string) {
        super(message);

        this.status = code;
        this.kind = type;
    }
}

type ErrorHandler =  (err: any, request: Request, response: Response, next: NextFunction) => Promise<void>
export const onError: ErrorHandler = async (err, request, response , next) => {
    console.log('err', err);
    if(err.status) { response.status(err.status).json({status: 'error', message: err.message || 'Unknow error'}) }
    else { response.status(500).json({status: 'error', message: 'Internal server error'}) }
}

export default class AppError extends BaseError {
    constructor(message: string, code: number = 500) {
        super(message, code, 'ApplicationError');
    }
}