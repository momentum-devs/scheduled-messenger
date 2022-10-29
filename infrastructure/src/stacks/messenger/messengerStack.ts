import * as core from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import * as path from 'path';

import { AppConfig } from '../../appConfig.js';

export interface MessengerStackProps extends core.StackProps {
  readonly databaseCredentialsSecret: secrets.Secret;
  readonly appConfig: AppConfig;
}

export class MessengerStack extends core.Stack {
  public constructor(scope: core.App, id: string, props: MessengerStackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.PROVIDED,
      handler: 'scheduled-messenger',
      code: lambda.Code.fromAsset(path.join(__dirname, './scheduled-messenger.zip')),
      environment: props.appConfig as unknown as Record<string, string>,
    });
  }
}
