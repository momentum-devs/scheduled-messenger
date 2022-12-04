import * as core from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
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

    const eventBus = new events.EventBus(this, 'MessageEventBus', { eventBusName: 'MessageEventBus' });

    const lambdaEnvironment = {
      [EnvKey.databaseName]: appConfig.databaseName,
      [EnvKey.databaseHost]: appConfig.databaseHost,
      [EnvKey.databaseUser]: appConfig.databaseUser,
      [EnvKey.databasePassword]: appConfig.databasePassword,
      [EnvKey.databasePort]: appConfig.databasePort,
      [EnvKey.eventBusArn]: eventBus.eventBusArn,
    };

    const sendMessagesLambda = new lambda.Function(this, 'sendMessagesLambda', {
      runtime: lambda.Runtime.PROVIDED,
      handler: 'send-messages-lambda-handler',
      code: lambda.Code.fromAsset(lambdaPathFactory.create('sendMessagesLambda/sendMessagesLambdaHandler.zip')),
      environment: lambdaEnvironment,
    });

    const deleteMessageLambda = new lambda.Function(this, 'deleteMessageLambda', {
      runtime: lambda.Runtime.PROVIDED,
      handler: 'delete-message-lambda-handler',
      code: lambda.Code.fromAsset(lambdaPathFactory.create('deleteMessageLambda/deleteMessageLambdaHandler.zip')),
      environment: lambdaEnvironment,
    });

    const queue = new sqs.Queue(this, 'DeleteOneTimeMessageQueue', {
      queueName: 'DeleteOneTimeMessageQueue',
      visibilityTimeout: core.Duration.seconds(30),
    });

    deleteMessageLambda.addEventSource(new lambdaEventSources.SqsEventSource(queue, { batchSize: 1 }));

    const deleteOneTimeMessageRule = new events.Rule(this, 'DeleteOneTimeMessageRule', {
      eventBus,
      enabled: true,
      eventPattern: {
        source: ['com.messages.delete'],
        detailType: ['DeleteMessage'],
      },
      ruleName: 'DeleteOneTimeMessageRule',
    });

    deleteOneTimeMessageRule.addTarget(new targets.SqsQueue(queue));

    eventBus.grantPutEventsTo(sendMessagesLambda);
  }
}
