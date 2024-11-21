import path from "path";

module.exports= {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
              test: /\.jsx?$/,  // Apply Babel to .js or .jsx files
              exclude: /node_modules/,  // Exclude files in node_modules
              use: {
                loader: 'babel-loader',  // Use babel-loader to transpile the files
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],  // Specify Babel presets to use
                },
              },
            },
        ]
    }
}