import sysPath from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const ROOT_DIR = sysPath.resolve(`${process.cwd()}`);
const NODE_MODULES_DIR = sysPath.resolve(`${process.cwd()}`, 'node_modules');
const POST_CSS_CONFIG = sysPath.resolve(`${process.cwd()}`, 'configs/engine/postcss.config.js');

const common = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  {
    test: /\.(eot|svg|ttf|TTF|woff|woff2)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 100000,
        name: 'fonts/[name].[ext]?[hash]',
      },
    }],
  },
  {
    test: /\.(gif|jpg|jpe?g|png)$/,
    use: [{
      loader: 'file-loader',
      options: {
        limit: 100000,
        name: 'img/[name].[ext]?[hash]',
      },
    }],
  },
];

const development = [
  ...common,
  {
    test: /\.(scss|sass)$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 1,
      },
    }, {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: {
          path: POST_CSS_CONFIG,
        },
      },
    }, {
      loader: 'sass-loader',
      options: {
        includePaths: ['node_modules'],
        sourceMap: true,
      },
    }],
  },
  {
    test: /\.less$/,
    use: [{
      loader: 'style-loader', // creates style nodes from JS strings
    }, {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 1,
      }
    }, {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: {
          path: POST_CSS_CONFIG,
        },
      },
    }, {
      loader: 'less-loader', // compiles Less to CSS
      options: {
        paths: [ROOT_DIR, NODE_MODULES_DIR],
        sourceMap: true,
      },
    }],
  },
];

const production = [
  ...common,
  {
    test: /\.(scss|sass)$/,
    loader: ExtractTextPlugin.extract({
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
          importLoaders: 1,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          config: {
            path: POST_CSS_CONFIG,
          },
        },
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: ['node_modules'],
        },
      }],
      fallback: 'style-loader',
    }),
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract({
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
          importLoaders: 1,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          config: {
            path: POST_CSS_CONFIG,
          },
        },
      }, {
        loader: 'less-loader',
        options: {
          paths: [ROOT_DIR, NODE_MODULES_DIR],
        },
      }],
      fallback: 'style-loader',
    }),
  },
];

export default {
  development,
  production,
};

