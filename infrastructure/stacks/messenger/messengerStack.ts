import * as core from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as path from 'path';

export interface MessengerStackProps extends core.StackProps {
  readonly databaseCredentialsSecret: secrets.Secret;
}

export class MessengerStack extends core.Stack {
  constructor(scope: core.App, id: string, props: MessengerStackProps) {
    super(scope, id, props);

    const username = process.env['DB_USERNAME'];
    const password = process.env['DB_PASSWORD'];
    const host = process.env['DB_HOST'];
    const port = process.env['DB_PORT'];
    const databaseName = process.env['DB_NAME'];

    console.log({ username, password, host, port, databaseName });

    if (!username || !password || !host || !port || !databaseName) {
      throw new Error('Missing environment variables');
    }

    const messengerLambda = new lambda.Function(this, 'MessengerLambda', {
      runtime: lambda.Runtime.PROVIDED,
      handler: 'scheduled-messenger',
      code: lambda.Code.fromAsset(path.join(__dirname, './scheduled-messenger.zip')),
      environment: {
        DB_USERNAME: username,
        DB_PASSWORD: password,
        DB_HOST: host,
        DB_PORT: port,
        DB_NAME: databaseName,
      },
    });

    const eventRule = new events.Rule(this, 'scheduleRule', {
      schedule: events.Schedule.cron({ minute: '0/3' }),
    });

    eventRule.addTarget(new targets.LambdaFunction(messengerLambda));
  }
}
