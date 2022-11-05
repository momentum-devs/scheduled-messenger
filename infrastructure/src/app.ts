#!/usr/bin/env node
import 'source-map-support/register.js';
import * as core from 'aws-cdk-lib';

import { AppConfig } from './config/appConfig.js';
import { MessengerStack } from './stacks/messenger/messengerStack.js';
import { RdsStack } from './stacks/rds/rdsStack.js';
import { VpcStack } from './stacks/vpc/vpcStack.js';
import { EnvKey } from './config/envKey.js';

const awsRegion = process.env['AWS_REGION'] || process.env['AWS_DEFAULT_REGION'];
const awsAccount = process.env['AWS_ACCOUNT_ID'];

const databaseUser = process.env[EnvKey.databaseUser];
const databasePassword = process.env[EnvKey.databasePassword];
const databaseHost = process.env[EnvKey.databaseHost];
const databasePort = process.env[EnvKey.databasePort];
const databaseName = process.env[EnvKey.databaseName];

console.log({ awsRegion, awsAccount, databaseUser, databasePassword, databaseHost, databasePort, databaseName });

if (
  !awsRegion ||
  !awsAccount ||
  !databaseUser ||
  !databasePassword ||
  !databaseHost ||
  !databasePort ||
  !databaseName
) {
  throw new Error('Missing environment variables');
}

const app = new core.App();

const env = {
  account: awsAccount,
  region: awsRegion,
};

const appConfig: AppConfig = {
  databaseUser,
  databasePassword,
  databaseHost,
  databasePort,
  databaseName,
};

const vpcStack = new VpcStack(app, 'Vpc', { env });

new RdsStack(app, 'Rds', { env, vpc: vpcStack.vpc, appConfig });

new MessengerStack(app, 'Messenger', { env, appConfig });
