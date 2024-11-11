export class UserNotFoundError extends Error {
    constructor(userId: string) {
        super(`User with id ${userId} does not exist.`);
        Object.setPrototypeOf(this, UserNotFoundError.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}