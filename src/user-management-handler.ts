import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserController } from './controller/user.controller';

export class UserManagementHandler {

    constructor(private readonly userController: UserController) {
    }

    public async getUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        return this.userController.getUser(event);
    }

    public async getAllUsers(): Promise<APIGatewayProxyResult> {
        return this.userController.getAllUsers();
    }
}

const handler = new UserManagementHandler(new UserController());
export const getUser = handler.getUser.bind(handler);
export const getAllUsers = handler.getAllUsers.bind(handler);