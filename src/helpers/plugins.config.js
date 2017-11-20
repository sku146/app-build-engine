import webpack from 'webpack';
import assignIn from 'lodash/assignIn';
import VersionTemplatePlugin from './plugins/version-template-plugin';
import FlowBabelWebpackPlugin from 'flow-babel-webpack-plugin';
import {
  common as commonConfigs,
} from '../configs';

const common = [
  new FlowBabelWebpackPlugin(),
];

const development = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  ...common,
];

const production = [
  ...common,
  new webpack.optimize.UglifyJsPlugin(assignIn({}, {
    minimize: true,
    comments: true,
    compress: {
      warnings: false,
    },
  }, commonConfigs.prodBunldeOptions || {})),
];

export default {
  development,
  production,
  VersionTemplatePlugin,
};
