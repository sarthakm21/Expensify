const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

module.exports = (env) => {
  //? SWITCH THE SRC IN index.html's SCRIPT tag to "/bundle.js" WHEN USING WEBPACK DEV SERVER
  const isProduction = env === "production";
  return {
    entry: "./src/app.js", //The file to bundle
    output: {
      path: path.join(__dirname, "public"), //output requires the complete path of the file in our system & __dirname provides the path to the current file in the system and it is joined with public folder
      filename: "bundle.js", // The name of the final bundled file
    },
    /*  We need loaders to transform some part of our code. For example, we will use babel-loader(along with the react and env presets) 
          to transform jsx code into pure browser-readable javascript. Similarly, there are loaders for typescript, sass, etc,
          that tranform our code into its browser readable variant*/

    module: {
      rules: [
        //rules are used to tell webpack which loader to use for compilation of what type of file
        {
          test: /\.js$/, //Here we specify the file type, that is all files ending with a .js
          loader: "babel-loader", //Here we specify the loader through which the above specified files will run
          exclude: /node_modules/, //We ask webpack to exclude the .js files in node_modules folder for obviuus reasons.
        },
        {
          test: /\.s?css$/,
          use: [
            //Lets us specify an array of loaders
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
            }
          ],
        },
      ],
    },
    plugins: [CSSExtract],
    // devtool: 'cheap-module-eval-source-map' /*Using a source map to pinpoint the exact location of error(if any) in our components files
    // rather than in the final bundled file(bundle.js) where it shows otherwise. */ In the latest vs. webpack-cli does this for us
    mode: isProduction ? "production" : "development",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true, //We are using client side rendering, and the browser by default tries to GET a page from the server
    }, //causing a 404 error. This property would redirect it to our index.html page and the control will be transfered to react router
    devtool: "source-map",
  };
};
