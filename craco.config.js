const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Only add analyzer in production mode when explicitly requested
      if (process.env.ANALYZE) {
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          })
        );
      }

      // Split chunks
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Get the package name
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              
              // Package names with special characters (like @) need to be sanitized
              return `npm.${packageName.replace('@', '')}`;
            },
          },
          // Specific chunking for Chakra UI
          chakra: {
            test: /[\\/]node_modules[\\/](@chakra-ui)[\\/]/,
            name: 'vendor-chakra',
            priority: 20,
          },
        },
      };

      // Optimize for production
      if (env === 'production') {
        // Add compression for production assets
        webpackConfig.plugins.push(
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
          })
        );
        
        // Optimize CSS
        webpackConfig.optimization.minimizer.push(
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
              output: {
                comments: false,
              },
            },
            extractComments: false,
          })
        );
      }

      return webpackConfig;
    },
  },
  // Add any aliases for cleaner imports
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  // Configure Babel to optimize transpiled code
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime'],
      ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]
    ],
  },
}; 