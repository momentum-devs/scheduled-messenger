import * as core from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import * as path from 'path';

export interface MessengerStackProps extends core.StackProps {
  readonly databaseCredentialsSecret: secrets.Secret;
}

export class MessengerStack extends core.Stack {
  constructor(scope: core.App, id: string, props: MessengerStackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.PROVIDED,
      handler: 'hello',
      code: lambda.Code.fromAsset(path.join(__dirname, './hello.zip')),
    });
  }
}
