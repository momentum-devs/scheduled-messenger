export class LambdaPathFactory {
  private servicePath: string;

  public constructor(servicePath: string) {
    this.servicePath = servicePath;
  }

  public create(path: string): string {
    return `${process.cwd()}/src/stacks/${this.servicePath}/lambdas/${path}`;
  }
}
