import * as core from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2'

export class VpcStack extends core.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: core.App, id: string, props?: core.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'vpc', {
      cidr: '10.0.0.0/16',
      natGateways:1,
      maxAzs:1,
      subnetConfiguration: [
        {name: 'private-subnet-1', subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, cidrMask: 24},
        {name: 'public-subnet-1', subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24},
        {name: 'isolated-subnet-1', subnetType: ec2.SubnetType.PRIVATE_ISOLATED, cidrMask: 26}]
    })
  }
}
