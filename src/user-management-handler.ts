import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UserController } from './controller/user.controller';

export class UserManagementHandler {

    constructor(private readonly userController: UserController) {
    }

    public async getUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        return this.userController.getUser(event);
    }
}

const handler = new UserManagementHandler(new UserController());
export const getUser = handler.getUser.bind(handler);