import * as core from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import * as triggers from 'aws-cdk-lib/triggers';

import { AppConfig } from '../../appConfig.js';
import { LambdaPathFactory } from '../../common/lambdaPathFactory.js';
import { LambdaFunction } from '../../common/nodejsLambdaFunction.js';

export interface RdsStackProps extends core.StackProps {
  readonly vpc: ec2.Vpc;
  readonly appConfig: AppConfig;
}

export class RdsStack extends core.Stack {
  public readonly databaseCredentialsSecret: secrets.Secret;

  public constructor(scope: core.App, id: string, props: RdsStackProps) {
    super(scope, id, props);

    const vpc = props.vpc as ec2.IVpc;

    const databaseConnectionSecurityGroup = new ec2.SecurityGroup(this, 'databaseConnectionSecurityGroup', { vpc });

    databaseConnectionSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(5432), 'Allow db connection');

    const databaseUsername = 'databaseUsername';

    this.databaseCredentialsSecret = new secrets.Secret(this, 'databaseSecret', {
      secretName: `${id}-database-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: databaseUsername }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password',
      },
    });

    const databaseInstance = new rds.DatabaseInstance(this, 'database', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_14_3 }),
      credentials: rds.Credentials.fromSecret(this.databaseCredentialsSecret as secrets.ISecret),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      allocatedStorage: 10,
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      removalPolicy: core.RemovalPolicy.DESTROY,
      securityGroups: [databaseConnectionSecurityGroup],
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: false,
      multiAz: true,
    });

    const lambdaPathFactory = new LambdaPathFactory('rds');

    const runDatabaseMigrationsLambda = new LambdaFunction(this, 'runDatabaseMigrationsLambda', {
      entry: lambdaPathFactory.create('runDatabaseMigrations/runDatabaseMigrationsLambda.ts'),
      environment: props.appConfig as unknown as Record<string, string>,
      timeout: core.Duration.minutes(3),
      securityGroups: [databaseConnectionSecurityGroup],
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
    });

    this.databaseCredentialsSecret.grantRead(runDatabaseMigrationsLambda);

    new triggers.Trigger(this, 'DatabaseMigrationsTrigger', {
      handler: runDatabaseMigrationsLambda,
      executeAfter: [databaseInstance],
      executeOnHandlerChange: true,
    });
  }
}
