import * as core from 'aws-cdk-lib';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';

export interface MessengerStackProps extends core.StackProps {
  readonly databaseCredentialsSecret: secrets.Secret;
}

export class RestApiStack extends core.Stack {
  public constructor(scope: core.App, id: string, props: MessengerStackProps) {
    super(scope, id, props);
  }
}
