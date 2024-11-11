import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { User } from '../model/user.model';
import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from '../util/errors';

export class UserService {

    constructor(
        private readonly tableName = process.env.USERS_TABLE,
        private readonly dbClient = DynamoDBDocumentClient.from(new DynamoDBClient({})),
    ) {
    }

    public async getUser(id: string): Promise<User | null> {
        const params = {
            TableName: this.tableName,
            Key: { id },
        };
        const result = await this.dbClient.send(new GetCommand(params));
        return result.Item ? result.Item as User : null;
    }

    public async getAllUsers(): Promise<User[]> {
        const result = await this.dbClient.send(new ScanCommand({ TableName: this.tableName }));
        return result.Items as User[];
    }

    public async createUser(user: User): Promise<User> {
        const newUser = {
            ...user,
            id: uuidv4()
        };
        const params = {
            TableName: this.tableName,
            Item: newUser,
        };
        await this.dbClient.send(new PutCommand(params));
        return newUser;
    }

    public async updateUser(id: string, updatedUser: User): Promise<void> {
        const existingUser = await this.getUser(id);
        if (!existingUser) {
            throw new UserNotFoundError(id);
        }
        const params = {
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: 'SET #name = :name, #email = :email, #age = :age',
            ExpressionAttributeNames: { '#name': 'name', '#email': 'email', '#age': 'age' },
            ExpressionAttributeValues: { ':name': updatedUser.name, ':email': updatedUser.email, ':age': updatedUser.age },
        };
        await this.dbClient.send(new UpdateCommand(params));
    }

    public async deleteUser(id: string): Promise<void> {
        const existingUser = await this.getUser(id);
        if (!existingUser) {
            throw new UserNotFoundError(id);
        }
        const params = {
            TableName: this.tableName,
            Key: { id },
        };
        await this.dbClient.send(new DeleteCommand(params));
    }

}
