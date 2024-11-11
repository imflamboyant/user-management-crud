import { UserService } from '../service/user.service';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { generateResponse } from '../util/utils';
import { UserNotFoundError } from '../util/errors';

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

    public async createUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        if (!event.body) {
            generateResponse(400, { message: 'User data payload is mandatory' });
        }
        const user = JSON.parse(event.body as string);
        if (!user.name || !user.email || !user.age) {
            return generateResponse(400, { message: 'user name, email and age are mandatory' });
        }
        const createdUser = await this.userService.createUser(user);
        return generateResponse(201, createdUser);
    }

    public async updateUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        const id = event.pathParameters?.id;
        if (!id) {
            return generateResponse(400, { message: 'User id parameter is mandatory' });
        }
        if (!event.body) {
            return generateResponse(400, { message: 'User data payload is mandatory' });
        }
        const updatedUser = JSON.parse(event.body as string);
        if (!updatedUser.name || !updatedUser.email || !updatedUser.age) {
            return generateResponse(400, { message: 'user name, email and age are mandatory' });
        }

        try {
            await this.userService.updateUser(id, updatedUser);
            return { statusCode: 200, body: '' };
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return generateResponse(404, { message: error.message });
            }
            console.error('Error updating user:', error);
            return generateResponse(500, { message: 'Unexpected error updating user' });
        }
    }

    public async deleteUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        const id = event.pathParameters?.id;
        if (!id) {
            return generateResponse(400, { message: 'User id parameter is mandatory' });
        }

        try {
            await this.userService.deleteUser(id);
            return { statusCode: 204, body: '' };
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return generateResponse(404, { message: error.message });
            }
            console.error('Error deleting user:', error);
            return generateResponse(500, { message: 'Unexpected error deleting user' });
        }
    }
}