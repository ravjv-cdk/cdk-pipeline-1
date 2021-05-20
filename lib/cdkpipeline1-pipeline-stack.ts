import * as codepipeline from '@aws-cdk/aws-codepipeline'
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions'
import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core'
import { CdkPipeline, SimpleSynthAction, ShellScriptAction } from "@aws-cdk/pipelines"
import { CdkpipelinesDemoStage } from './cdkpipeline1-stage';
import { CfnOutput, Stage, StageProps } from '@aws-cdk/core'
/**
 * The application pipeline stack
 */
export class Cdkpipeline1PipelineStack extends Stack {
  public readonly urlOutput: CfnOutput

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const sourceArtifact = new codepipeline.Artifact()
    const cloudAssemblyArtifact = new codepipeline.Artifact()
 
    const pipeline = new CdkPipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'cdk-pipeline1',
      cloudAssemblyArtifact,

      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub_Source',
        owner: 'ravjv',
        repo: 'cdk-pipeline-1',
        oauthToken: SecretValue.secretsManager('github-token'),
        output: sourceArtifact,
        branch: 'develop'
      }),

       synthAction: SimpleSynthAction.standardNpmSynth({
         sourceArtifact,
         cloudAssemblyArtifact,
         installCommand: 'npm install -g aws-cdk',
         buildCommand: 'npm run build',
         synthCommand: 'cdk synth',
       }),
    })
    const stage = pipeline.addApplicationStage(new CdkpipelinesDemoStage(this, 'PreProd', {
      env: { account: '069623884547', region: 'ap-south-1' }
    }))
    stage.addActions(new ShellScriptAction({
      actionName: 'MyValidation',
      additionalArtifacts: [sourceArtifact],
      commands: ['npm run build'],
    }))
}
}