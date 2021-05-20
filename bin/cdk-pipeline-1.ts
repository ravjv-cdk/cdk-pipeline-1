#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'
import { Cdkpipeline1PipelineStack } from '../lib/cdkpipeline1-pipeline-stack'

const app = new cdk.App();
new Cdkpipeline1PipelineStack(app, 'CdkPipeline1Stack', {
    env: { account: '069623884547', region: 'ap-south-1' },
})
app.synth()
