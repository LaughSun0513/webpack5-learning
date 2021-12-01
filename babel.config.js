module.exports = {
    "presets": [
        ["@babel/preset-env", {
            useBuiltIns: 'usage',
            corejs: '3.0'
        }]
    ],
    "plugins": [
        ['@babel/plugin-transform-runtime', { corejs: 3}],
        ["@babel/plugin-proposal-decorators", { legacy: true}],
        "@babel/plugin-proposal-class-properties"
    ]
}