import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import babel from 'rollup-plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'

// get the package.json for the current package
const packageDir = path.join(__filename, '..')
const pkg = require(`${packageDir}/package.json`)

const sanitizePackageName = (packageName) =>
  (packageName || '').replace('@', '').replace('/', '-')

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true,
}

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    '../../node_modules/prop-types/index.js': [
      'elementType',
      'bool',
      'func',
      'object',
      'oneOfType',
      'element',
    ],
    '../../node_modules/react-is/index.js': [
      'ForwardRef',
      'isFragment',
      'isLazy',
      'isMemo',
      'Memo',
      'isValidElementType',
    ],
  },
}

// name will be used as the global name exposed in the UMD bundles
const generateRollupConfig = (name, skipWeb = false) =>
  [
    // CommonJS
    {
      input: 'src/index.js',
      output: {
        file: `dist/lib/${sanitizePackageName(pkg.name)}.js`,
        format: 'cjs',
        indent: false,
      },
      plugins: [
        peerDepsExternal({
          includeDependencies: true,
        }),
        nodeResolve(),
        babel({ runtimeHelpers: true }),
        sizeSnapshot(),
      ],
    },

    // ES
    {
      input: 'src/index.js',
      output: {
        file: `dist/es/${sanitizePackageName(pkg.name)}.js`,
        format: 'es',
        indent: false,
      },
      plugins: [
        peerDepsExternal({
          includeDependencies: true,
        }),
        nodeResolve(),
        babel({ runtimeHelpers: true }),
        sizeSnapshot(),
      ],
    },

    // ES for Browsers
    !skipWeb && {
      input: 'src/index.js',
      output: {
        file: `dist/es/${sanitizePackageName(pkg.name)}.mjs`,
        format: 'es',
        indent: false,
      },
      plugins: [
        peerDepsExternal(),
        nodeResolve(),
        babel({ runtimeHelpers: true }),
        commonjs(commonjsOptions),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        sizeSnapshot(),
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
          },
        }),
      ],
    },

    // UMD Development
    !skipWeb && {
      input: 'src/index.js',
      output: {
        file: `dist/umd/${sanitizePackageName(pkg.name)}.js`,
        format: 'umd',
        globals,
        indent: false,
        name,
      },
      plugins: [
        peerDepsExternal(),
        nodeResolve(),
        babel(babelOptions),
        commonjs(commonjsOptions),
        replace({
          'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        sizeSnapshot(),
      ],
    },

    // UMD Production
    !skipWeb && {
      input: 'src/index.js',
      output: {
        file: `dist/umd/${sanitizePackageName(pkg.name)}.min.js`,
        format: 'umd',
        globals,
        indent: false,
        name,
      },
      plugins: [
        peerDepsExternal(),
        nodeResolve(),
        babel(babelOptions),
        commonjs(commonjsOptions),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        sizeSnapshot(),
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
          },
        }),
      ],
    },
  ].filter(Boolean)

export default generateRollupConfig
