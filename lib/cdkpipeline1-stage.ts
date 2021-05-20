import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core'
import { Cdkpipeline1PipelineStack } from './cdkpipeline1-pipeline-stack'

export class CdkpipelinesDemoStage extends Stage {
  public readonly urlOutput: CfnOutput;
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new Cdkpipeline1PipelineStack(this, 'WebService');
    
    this.urlOutput = service.urlOutput;
  }
}