#!/usr/bin/env node
import 'source-map-support/register';
import * as core from 'aws-cdk-lib';
import {RdsStack} from './stacks/rds/rdsStack';
import {VpcStack} from './stacks/vpc/vpcStack';
import {MessengerStack} from './stacks/messenger/messengerStack';

const awsRegion = process.env['AWS_REGION'] || process.env['AWS_DEFAULT_REGION'];
const awsAccount = process.env['AWS_ACCOUNT_ID'];

console.log({awsRegion, awsAccount});

if (!awsRegion || !awsAccount) {
    throw new Error('Missing environment variables');
}

const app = new core.App();

const env = {account: awsAccount, region: awsRegion};

const vpcStack = new VpcStack(app, 'Vpc', {env});

const rdsStack = new RdsStack(app, 'Rds', {env, vpc: vpcStack.vpc});

new MessengerStack(app, 'Messenger', {env, databaseCredentialsSecret: rdsStack.databaseCredentialsSecret});
