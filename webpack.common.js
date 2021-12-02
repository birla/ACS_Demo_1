const CommunicationIdentityClient = require("@azure/communication-administration").CommunicationIdentityClient
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const config = require("./config.json");

if(!config || !config.connectionString || config.connectionString.indexOf('endpoint=') === -1)
{
    throw new Error("Update `config.json` with connection string");
}

const communicationIdentityClient = new  CommunicationIdentityClient(config.connectionString);
 module.exports = {
   entry: {
     app: './client.js',
   },
   module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                console.log(resourcePath)
                return path.relative(path.dirname(resourcePath), context) + '/'
              },
            },
          },
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
   plugins: [
     new HtmlWebpackPlugin({
       template:"./index.html",
       baseUrl: '/'
     }),
     new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
   ],
  //  devServer: {
  //   open: true,
  //   before: function(app) {
  //       console.log("hello-----------------------------------")
  //       // app.post('/tokens/provisionUser', async (req, res) => {
  //       //     try {
  //       //         let communicationUserId = await communicationIdentityClient.createUser();
  //       //         const tokenResponse = await communicationIdentityClient.issueToken(communicationUserId, ["voip"]);
  //       //         res.json(tokenResponse);
  //       //     } catch (error) {
  //       //         console.error(error);
  //       //     }
  //       // });
  //   }
  //  }
 };