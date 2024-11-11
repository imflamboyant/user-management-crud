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

    public async createUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        return this.userController.createUser(event);
    }

    public async updateUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        return this.userController.updateUser(event);
    }

    public async deleteUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        return this.userController.deleteUser(event);
    }
}

const handler = new UserManagementHandler(new UserController());
export const getUser = handler.getUser.bind(handler);
export const getAllUsers = handler.getAllUsers.bind(handler);
export const createUser = handler.createUser.bind(handler);
export const updateUser = handler.updateUser.bind(handler);
export const deleteUser = handler.deleteUser.bind(handler);