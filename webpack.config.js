const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "testOrg",
    projectName: "testApp",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      ...[new HtmlWebpackPlugin(), new Dotenv()],
      ...(webpackConfigEnv && webpackConfigEnv.isLocal
        ? []
        : [
            new webpack.DefinePlugin({
              "process.env.REACT_APP_TENANT_ID": JSON.stringify(
                process.env.REACT_APP_TENANT_ID
              ),
              "process.env.REACT_APP_CONTRACTOR_CLIENT_ID": JSON.stringify(
                process.env.REACT_APP_CONTRACTOR_CLIENT_ID
              ),
              "process.env.REACT_APP_BACKEND_API_URL": JSON.stringify(
                process.env.REACT_APP_BACKEND_API_URL
              ),
              "process.env.REACT_APP_REDIRECT_URI": JSON.stringify(
                process.env.REACT_APP_REDIRECT_URI
              ),
              "process.env.REACT_APP_BUILD_NUMBER": JSON.stringify(
                process.env.REACT_APP_BUILD_NUMBER
              ),
            }),
          ]),
    ],
  });
};
