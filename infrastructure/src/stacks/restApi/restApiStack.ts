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
  }
}
