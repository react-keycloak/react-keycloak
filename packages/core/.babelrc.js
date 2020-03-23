const { NODE_ENV } = process.env

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['ie >= 11']
        },
        modules: false,
        loose: true
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-proposal-class-properties',
    // don't use `loose` mode here - need to copy symbols when spreading
    '@babel/proposal-object-rest-spread',
    [
      'babel-plugin-transform-react-remove-prop-types',
      {
        mode: 'unsafe-wrap'
      }
    ],
    // any package needs to declare @babel/runtime@^7.9.0 as a runtime dependency.
    [
      '@babel/plugin-transform-runtime',
      {
        version: '^7.9.0'
      }
    ],
    NODE_ENV === 'test' && '@babel/transform-modules-commonjs'
  ].filter(Boolean)
}
