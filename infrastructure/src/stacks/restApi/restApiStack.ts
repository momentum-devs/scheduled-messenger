import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as core from 'aws-cdk-lib';
import { AppConfig } from '../../config/appConfig.js';
import { LambdaPathFactory } from '../../common/lambdaPathFactory.js';
import { LambdaFunction } from '../../common/nodejsLambdaFunction.js';
import { EnvKey } from '../../config/envKey.js';

export interface MessengerStackProps extends core.StackProps {
  readonly appConfig: AppConfig;
}

export class RestApiStack extends core.Stack {
  public constructor(scope: core.App, id: string, props: MessengerStackProps) {
    super(scope, id, props);

    const lambdaPathFactory = new LambdaPathFactory('restApi');

    const { appConfig } = props;

    const lambdaEnvironment = {
      [EnvKey.databaseName]: appConfig.databaseName,
      [EnvKey.databaseHost]: appConfig.databaseHost,
      [EnvKey.databaseUser]: appConfig.databaseUser,
      [EnvKey.databasePassword]: appConfig.databasePassword,
      [EnvKey.databasePort]: appConfig.databasePort,
      [EnvKey.jwtSecret]: appConfig.jwtSecret,
      [EnvKey.jwtExpiresIn]: appConfig.jwtExpiresIn,
      [EnvKey.hashSaltRounds]: appConfig.hashSaltRounds,
    };

    const registerUserLambda = new LambdaFunction(this, 'registerUserLambda', {
      entry: lambdaPathFactory.create('registerUser/registerUserLambdaHandler.ts'),
      environment: lambdaEnvironment,
      timeout: core.Duration.minutes(3),
    });

    const loginUserLambda = new LambdaFunction(this, 'loginUserLambda', {
      entry: lambdaPathFactory.create('loginUser/loginUserLambdaHandler.ts'),
      environment: lambdaEnvironment,
      timeout: core.Duration.minutes(3),
    });

    const createMessageLambda = new LambdaFunction(this, 'createMessageLambda', {
      entry: lambdaPathFactory.create('createMessage/createMessageLambdaHandler.ts'),
      environment: lambdaEnvironment,
      timeout: core.Duration.minutes(3),
    });

    const deleteMessageLambda = new LambdaFunction(this, 'deleteMessageLambda', {
      entry: lambdaPathFactory.create('deleteMessage/deleteMessageLambdaHandler.ts'),
      environment: lambdaEnvironment,
      timeout: core.Duration.minutes(3),
    });

    const getMessagesLambda = new LambdaFunction(this, 'getMessagesLambda', {
      entry: lambdaPathFactory.create('getMessages/getMessagesLambdaHandler.ts'),
      environment: lambdaEnvironment,
      timeout: core.Duration.minutes(3),
    });

    const createRecipientLambda = new LambdaFunction(this, 'createRecipientLambda', {
      entry: lambdaPathFactory.create('createRecipient/createRecipientLambdaHandler.ts'),
      environment: lambdaEnvironment,
      timeout: core.Duration.minutes(3),
    });

    const restApi = new RestApi(this, 'RestApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    });

    const usersResource = restApi.root.addResource('users');

    const registerUserResource = usersResource.addResource('register');

    registerUserResource.addMethod('POST', new LambdaIntegration(registerUserLambda));

    const loginUserResource = usersResource.addResource('login');

    loginUserResource.addMethod('POST', new LambdaIntegration(loginUserLambda));

    const messagesResource = restApi.root.addResource('messages');

    messagesResource.addMethod('POST', new LambdaIntegration(createMessageLambda));

    messagesResource.addMethod('GET', new LambdaIntegration(getMessagesLambda));

    const messageResource = messagesResource.addResource('{messageId}');

    messageResource.addMethod('DELETE', new LambdaIntegration(deleteMessageLambda));

    const recipientsResource = restApi.root.addResource('recipients');

    recipientsResource.addMethod('POST', new LambdaIntegration(createRecipientLambda));
  }
}
