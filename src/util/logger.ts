import { Logger } from '@aws-lambda-powertools/logger';

export const Log = new Logger({
    serviceName: 'user-management',
});
