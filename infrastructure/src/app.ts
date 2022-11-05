#!/usr/bin/env node
import 'source-map-support/register.js';
import * as core from 'aws-cdk-lib';

import { AppConfig } from './config/appConfig.js';
import { MessengerStack } from './stacks/messenger/messengerStack.js';
import { RdsStack } from './stacks/rds/rdsStack.js';
import { VpcStack } from './stacks/vpc/vpcStack.js';
import { EnvKey } from './config/envKey.js';
import { RestApiStack } from './stacks/restApi/restApiStack.js';

const awsRegion = process.env['AWS_REGION'] || process.env['AWS_DEFAULT_REGION'];
const awsAccount = process.env['AWS_ACCOUNT_ID'];

const jwtSecret = process.env[EnvKey.jwtSecret];
const jwtExpiresIn = process.env[EnvKey.jwtExpiresIn];
const hashSaltRounds = process.env[EnvKey.hashSaltRounds];

console.log({ awsRegion, awsAccount, jwtSecret, jwtExpiresIn, hashSaltRounds });

if (!awsRegion || !awsAccount || !jwtSecret || !jwtExpiresIn || !hashSaltRounds) {
  throw new Error('Missing environment variables');
}

const app = new core.App();

const env = {
  account: awsAccount,
  region: awsRegion,
};

const vpcStack = new VpcStack(app, 'Vpc', { env });

const {
  databaseHost,
  databasePort,
  databaseName,
  databaseUsername: databaseUser,
  databasePassword,
} = new RdsStack(app, 'Rds', {
  env,
  vpc: vpcStack.vpc,
});

const appConfig: AppConfig = {
  databaseHost,
  databasePort,
  databaseName,
  databaseUser,
  databasePassword,
  jwtSecret,
  jwtExpiresIn,
  hashSaltRounds,
};

new MessengerStack(app, 'Messenger', { env, appConfig });

new RestApiStack(app, 'RestApi', { env, appConfig });
