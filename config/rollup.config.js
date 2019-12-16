import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

// get the package.json for the current package
const packageDir = path.join(__filename, '..')
const pkg = require(`${packageDir}/package.json`)
const external = [...Object.keys(pkg.peerDependencies || {})]

const sanitizePackageName = packageName =>
  (packageName || '').replace('@', '').replace('/', '-')

// name will be used as the global name exposed in the UMD bundles
const generateRollupConfig = name => [
  // CommonJS
  {
    input: 'src/index.js',
    output: {
      file: `dist/lib/${sanitizePackageName(pkg.name)}.js`,
      format: 'cjs',
      indent: false
    },
    external,
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel(),
      commonjs(),
      sizeSnapshot()
    ]
  },

  // ES
  {
    input: 'src/index.js',
    output: {
      file: `dist/es/${sanitizePackageName(pkg.name)}.js`,
      format: 'es',
      indent: false
    },
    external,
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel(),
      commonjs(),
      sizeSnapshot()
    ]
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: {
      file: `dist/es/${sanitizePackageName(pkg.name)}.mjs`,
      format: 'es',
      indent: false
    },
    external,
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel(),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      }),
      sizeSnapshot()
    ]
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      file: `dist/umd/${sanitizePackageName(pkg.name)}.js`,
      format: 'umd',
      globals: {
        react: 'React'
      },
      indent: false,
      name
    },
    external,
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      sizeSnapshot()
    ]
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: `dist/umd/${sanitizePackageName(pkg.name)}.min.js`,
      format: 'umd',
      globals: {
        react: 'React'
      },
      indent: false,
      name
    },
    external,
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      }),
      sizeSnapshot()
    ]
  }
]

export default generateRollupConfig
