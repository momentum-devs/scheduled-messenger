import * as core from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import * as rds from 'aws-cdk-lib/aws-rds';

export interface DatabaseStackProps extends core.StackProps {
  readonly vpc: ec2.Vpc;
}

export class DatabaseStack extends core.Stack {
  constructor(scope: core.App, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    const vpc = props.vpc as ec2.IVpc;

    const databaseConnectionSecurityGroup = new ec2.SecurityGroup(this, 'databaseConnectionSecurityGroup', {vpc});

    databaseConnectionSecurityGroup.addIngressRule(databaseConnectionSecurityGroup, ec2.Port.tcp(5432), 'Allow db connection');

    const databaseUsername = 'databaseUsername';

    const databaseCredentialsSecret = new secrets.Secret(this, 'databaseSecret', {
      secretName: `${id}-database-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({username: databaseUsername}),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password',
      }
    });

    new rds.DatabaseInstance(this, 'database', {
      engine: rds.DatabaseInstanceEngine.postgres({version: rds.PostgresEngineVersion.VER_14_3}),
      credentials: rds.Credentials.fromSecret(databaseCredentialsSecret as secrets.ISecret),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      allocatedStorage: 10,
      vpc,
      vpcSubnets: {subnetType: ec2.SubnetType.PUBLIC},
      removalPolicy: core.RemovalPolicy.DESTROY,
      securityGroups: [databaseConnectionSecurityGroup],
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: false,
      multiAz: false,
    });


  }
}
