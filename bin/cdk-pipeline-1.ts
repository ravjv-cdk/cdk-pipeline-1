#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'
import { CdkPipeline1Stack } from '../lib/cdk-pipeline-1-stack'

const app = new cdk.App();
new CdkPipeline1Stack(app, 'CdkPipeline1Stack', {
    env: { account: '069623884587', region: 'ap-south-1' },
})
app.synth()
