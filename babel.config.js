// this is used by jest only
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-proposal-class-properties',
    // don't use `loose` mode here - need to copy symbols when spreading
    '@babel/proposal-object-rest-spread'
  ]
}
