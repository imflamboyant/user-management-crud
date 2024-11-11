import { APIGatewayProxyResult } from 'aws-lambda';

export const generateResponse = (
    statusCode: number,
    body: { [key: string]: string | number },
): APIGatewayProxyResult => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
    };
};