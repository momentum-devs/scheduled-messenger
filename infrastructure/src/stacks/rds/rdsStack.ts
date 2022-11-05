import * as core from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import * as triggers from 'aws-cdk-lib/triggers';

import { LambdaPathFactory } from '../../common/lambdaPathFactory.js';
import { LambdaFunction } from '../../common/nodejsLambdaFunction.js';
import { EnvKey } from '../../config/envKey.js';

export interface RdsStackProps extends core.StackProps {
  readonly vpc: ec2.Vpc;
}

export class RdsStack extends core.Stack {
  public readonly databaseConnectionSecurityGroup: ec2.SecurityGroup;
  public readonly databaseHost: string;
  public readonly databasePort: string;
  public readonly databaseUsername: string;
  public readonly databasePassword: string;
  public readonly databaseName: string;

  public constructor(scope: core.App, id: string, props: RdsStackProps) {
    super(scope, id, props);

    const vpc = props.vpc as ec2.IVpc;

    this.databaseConnectionSecurityGroup = new ec2.SecurityGroup(this, 'databaseConnectionSecurityGroup', { vpc });

    this.databaseConnectionSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(5432), 'Allow db connection');

    const databaseUsername = 'databaseUsername';

    const databaseCredentialsSecret = new secrets.Secret(this, 'databaseSecret', {
      secretName: `${id}-database-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: databaseUsername }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password',
      },
    });

    const credentials = rds.Credentials.fromSecret(databaseCredentialsSecret as secrets.ISecret);

    this.databaseUsername = credentials.username;
    this.databasePassword = credentials.password?.unsafeUnwrap() as string;

    this.databaseName = 'postgres';

    const databaseInstance = new rds.DatabaseInstance(this, 'database', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_14_3 }),
      credentials,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      allocatedStorage: 10,
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      removalPolicy: core.RemovalPolicy.DESTROY,
      securityGroups: [this.databaseConnectionSecurityGroup],
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: false,
      multiAz: true,
      databaseName: this.databaseName,
    });

    this.databaseHost = databaseInstance.dbInstanceEndpointAddress;
    this.databasePort = databaseInstance.dbInstanceEndpointPort;

    const lambdaPathFactory = new LambdaPathFactory('rds');

    const lambdaEnvironment = {
      [EnvKey.databaseName]: this.databaseName,
      [EnvKey.databaseHost]: this.databaseHost,
      [EnvKey.databaseUser]: this.databaseUsername,
      [EnvKey.databasePassword]: this.databasePassword,
      [EnvKey.databasePort]: this.databasePort,
    };

    const runDatabaseMigrationsLambda = new LambdaFunction(this, 'runDatabaseMigrationsLambda', {
      entry: lambdaPathFactory.create('runDatabaseMigrations/runDatabaseMigrationsLambdaHandler.ts'),
      environment: lambdaEnvironment,
      timeout: core.Duration.minutes(3),
      securityGroups: [this.databaseConnectionSecurityGroup],
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
    });

    new triggers.Trigger(this, 'DatabaseMigrationsTrigger', {
      handler: runDatabaseMigrationsLambda,
      executeAfter: [databaseInstance],
      executeOnHandlerChange: true,
    });
  }
}
