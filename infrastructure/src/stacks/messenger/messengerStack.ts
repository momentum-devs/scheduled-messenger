import * as core from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import { AppConfig } from '../../config/appConfig.js';
import { LambdaPathFactory } from '../../common/lambdaPathFactory.js';
import { EnvKey } from '../../config/envKey.js';

export interface MessengerStackProps extends core.StackProps {
  readonly appConfig: AppConfig;
}

export class MessengerStack extends core.Stack {
  public constructor(scope: core.App, id: string, props: MessengerStackProps) {
    super(scope, id, props);

    const lambdaPathFactory = new LambdaPathFactory('messenger');

    const { appConfig } = props;

    const lambdaEnvironment = {
      [EnvKey.databaseName]: appConfig.databaseName,
      [EnvKey.databaseHost]: appConfig.databaseHost,
      [EnvKey.databaseUser]: appConfig.databaseUser,
      [EnvKey.databasePassword]: appConfig.databasePassword,
      [EnvKey.databasePort]: appConfig.databasePort,
    };

    new lambda.Function(this, 'sendEmailsLambda', {
      runtime: lambda.Runtime.PROVIDED,
      handler: 'send-emails-lambda-handler',
      code: lambda.Code.fromAsset(lambdaPathFactory.create('sendEmailsLambda/sendEmailsLambdaHandler.zip')),
      environment: lambdaEnvironment,
    });
  }
}
