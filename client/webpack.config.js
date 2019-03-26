const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: "./src",
        hot: true
    },
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            { 
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
                resolve: { extensions: [".js", ".jsx"] }, 
                exclude: /node_modules/, 
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'sass-loader!style-loader!css-loader'
            },
            {
                test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/img/',
                    publicPath: 'assets/img/'
                }
            }
        ],
    },
    plugins: [new HtmlWebpackPlugin()]
}