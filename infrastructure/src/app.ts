#!/usr/bin/env node
import 'source-map-support/register';
import * as core from 'aws-cdk-lib';

import { AppConfig } from './appConfig.js';
import { MessengerStack } from './stacks/messenger/messengerStack.js';
import { RdsStack } from './stacks/rds/rdsStack.js';
import { VpcStack } from './stacks/vpc/vpcStack.js';

const awsRegion = process.env['AWS_REGION'] || process.env['AWS_DEFAULT_REGION'];
const awsAccount = process.env['AWS_ACCOUNT_ID'];

const databseUser = process.env['DB_USERNAME'];
const databasePassword = process.env['DB_PASSWORD'];
const databaseHost = process.env['DB_HOST'];
const databasePort = process.env['DB_PORT'];
const databaseName = process.env['DB_NAME'];

console.log({ awsRegion, awsAccount, databseUser, databasePassword, databaseHost, databasePort, databaseName });

if (!awsRegion || !awsAccount || !databseUser || !databasePassword || !databaseHost || !databasePort || !databaseName) {
  throw new Error('Missing environment variables');
}

const app = new core.App();

const env = {
  account: awsAccount,
  region: awsRegion,
};

const appConfig: AppConfig = {
  databseUser,
  databasePassword,
  databaseHost,
  databasePort,
  databaseName,
};

const vpcStack = new VpcStack(app, 'Vpc', { env });

const rdsStack = new RdsStack(app, 'Rds', { env, vpc: vpcStack.vpc, appConfig });

new MessengerStack(app, 'Messenger', { env, databaseCredentialsSecret: rdsStack.databaseCredentialsSecret, appConfig });
