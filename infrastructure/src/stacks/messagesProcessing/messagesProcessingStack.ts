import * as core from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
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
      [EnvKey.gmailSmtpHost]: appConfig.gmailSmtpHost,
      [EnvKey.gmailSmtpPort]: appConfig.gmailSmtpPort,
      [EnvKey.outlookSmtpHost]: appConfig.outlookSmtpHost,
      [EnvKey.outlookSmtpPort]: appConfig.outlookSmtpPort,
      [EnvKey.yahooSmtpHost]: appConfig.yahooSmtpHost,
      [EnvKey.yahooSmtpPort]: appConfig.yahooSmtpPort,
      [EnvKey.timeWindow]: appConfig.timeWindow,
    };

    const sendMessagesLambda = new lambda.Function(this, 'sendMessagesLambda', {
      runtime: lambda.Runtime.PROVIDED,
      handler: 'send-messages-lambda-handler',
      code: lambda.Code.fromAsset(lambdaPathFactory.create('sendMessagesLambda/sendMessagesLambdaHandler.zip')),
      environment: lambdaEnvironment,
      timeout: core.Duration.seconds(30),
    });

    const eventRule = new events.Rule(this, 'scheduleRule', {
      schedule: events.Schedule.cron({ minute: '*/5' }),
    });

    eventRule.addTarget(new targets.LambdaFunction(sendMessagesLambda));
  }
}
