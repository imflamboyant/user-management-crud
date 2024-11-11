import { UserService } from '../service/user.service';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateResponse } from '../util/utils';

export class UserController {

    constructor(private readonly userService = new UserService()) {
    }

    public async getUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        const id = event.pathParameters?.id;
        if (!id) {
            return generateResponse(400, { message: 'User id parameter is mandatory' });
        }
        const user = await this.userService.getUser(id);
        if (user) {
            return generateResponse(200, user);
        } else {
            return generateResponse(404, { message: `User with id ${id} not found` });
        }
    }

    public async getAllUsers(): Promise<APIGatewayProxyResult> {
        const users = await this.userService.getAllUsers();
        return generateResponse(200, users);
    }
}