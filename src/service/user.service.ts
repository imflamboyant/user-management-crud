import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { User } from '../model/user.model';

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

}
