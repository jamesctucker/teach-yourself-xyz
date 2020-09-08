import Vue from "vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import awsconfig from "~/aws-exports";

Amplify.configure(awsconfig);

Vue.use(AmplifyModules);
