import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
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

}
