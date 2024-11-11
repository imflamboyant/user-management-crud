import { UserService } from '../../src/service/user.service';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { User } from '../../src/model/user.model';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

describe('UserService', () => {
    let userService: UserService;
    const ddbMock = mockClient(DynamoDBDocumentClient);
    const userId = uuidv4();

    beforeEach(() => {
        const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
        userService = new UserService('users-test', ddb);
    });

    afterEach(() => {
        ddbMock.reset();
    });

    it('should get all users', async () => {
        const users: User[] = [{ id: userId, name: 'John Doe', email: 'johndoe@example.com', age: 30 }];
        ddbMock.on(ScanCommand).resolves({Items: users});

        const result = await userService.getAllUsers();
        expect(result).toEqual(users);
    });

    it('should get one user', async () => {
        const user: User = { id: userId, name: 'John Doe', email: 'johndoe@example.com', age: 30 };
        ddbMock.on(GetCommand).resolves({Item: user});

        const result = await userService.getUser(userId);
        expect(result).toEqual(user);
    });

    it('should create a user', async () => {
        const user: User = { name: 'John Doe', email: 'johndoe@example.com', age: 30 };
        ddbMock.on(PutCommand).resolves({})

        const result = await userService.createUser(user);
        expect(result.id).toBeTruthy();
    });
});