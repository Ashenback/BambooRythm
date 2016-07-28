var path = require('path');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "Game.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            },
            {
                test: /\.json$/,
                // We could restrict using json-loader only on .json files in the
                // node_modules/pixi.js directory, but the ability to load .json files
                // could be useful elsewhere in our app, so I usually don't.
                //include: path.resolve(__dirname, 'node_modules/pixi.js'),
                loader: 'json'
            },
            {
                test: /\.frag$/,
                loader: 'raw'
            }
        ],
        postLoaders: [
            {
                include: path.resolve(__dirname, 'node_modules/pixi.js'),
                loader: 'transform?brfs'
            }
        ]
    }
};
