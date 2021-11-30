module.exports = {
    "presets": [
        ["@babel/preset-env"]
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { legacy: true}],
        "@babel/plugin-proposal-class-properties",
        ["@babel/plugin-transform-async-to-generator"]
    ]
}