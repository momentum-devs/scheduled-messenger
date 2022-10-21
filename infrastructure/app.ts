#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DatabaseStack } from './stacks/databaseStack';
import { VpcStack } from './stacks/vpc/vpcStack';

const app = new cdk.App();

const region = 'us-east-1';
const account = '484767037608';

const vpcStack = new VpcStack(app, 'VpcStack', {env: {account,region}});

new DatabaseStack(app, 'DatabaseStack', {env: {account,region}, vpc: vpcStack.vpc});
