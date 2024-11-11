import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserController } from './controller/user.controller';
import { Log } from './util/logger';

export class UserManagementHandler {

    constructor(private readonly userController: UserController) {
    }

    public async getUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        Log.info({
            event,
            message: 'Received get user request',
        })
        return this.userController.getUser(event);
    }

    public async getAllUsers(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        Log.info({
            event,
            message: 'Received get all users request',
        })
        return this.userController.getAllUsers();
    }

    public async createUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        Log.info({
            event,
            message: 'Received create user request',
        })
        return this.userController.createUser(event);
    }

    public async updateUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        Log.info({
            event,
            message: 'Received update user request',
        })
        return this.userController.updateUser(event);
    }

    public async deleteUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        Log.info({
            event,
            message: 'Received delete user request',
        })
        return this.userController.deleteUser(event);
    }
}

const handler = new UserManagementHandler(new UserController());
export const getUser = handler.getUser.bind(handler);
export const getAllUsers = handler.getAllUsers.bind(handler);
export const createUser = handler.createUser.bind(handler);
export const updateUser = handler.updateUser.bind(handler);
export const deleteUser = handler.deleteUser.bind(handler);