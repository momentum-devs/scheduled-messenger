import * as core from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import { AppConfig } from '../../config/appConfig.js';
import { LambdaPathFactory } from '../../common/lambdaPathFactory.js';
import { EnvKey } from '../../config/envKey.js';

export interface MessagesProcessingStackProps extends core.StackProps {
  readonly appConfig: AppConfig;
}

export class MessagesProcessingStack extends core.Stack {
  public constructor(scope: core.App, id: string, props: MessagesProcessingStackProps) {
    super(scope, id, props);

    const lambdaPathFactory = new LambdaPathFactory('messagesProcessing');

    const { appConfig } = props;

    const lambdaEnvironment = {
      [EnvKey.databaseName]: appConfig.databaseName,
      [EnvKey.databaseHost]: appConfig.databaseHost,
      [EnvKey.databaseUser]: appConfig.databaseUser,
      [EnvKey.databasePassword]: appConfig.databasePassword,
      [EnvKey.databasePort]: appConfig.databasePort,
    };

    new lambda.Function(this, 'sendMessagesLambda', {
      runtime: lambda.Runtime.PROVIDED,
      handler: 'send-messages-lambda-handler',
      code: lambda.Code.fromAsset(lambdaPathFactory.create('sendMessagesLambda/sendMessagesLambdaHandler.zip')),
      environment: lambdaEnvironment,
    });

    new lambda.Function(this, 'deleteMessageLambda', {
      runtime: lambda.Runtime.PROVIDED,
      handler: 'delete-message-lambda-handler',
      code: lambda.Code.fromAsset(lambdaPathFactory.create('deleteMessageLambda/deleteMessageLambdaHandler.zip')),
      environment: lambdaEnvironment,
    });
  }
}
