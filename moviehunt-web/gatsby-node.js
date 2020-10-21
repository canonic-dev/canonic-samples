const path = require("path")
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "src"),
      },
    },
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/actors/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/actors/*"
    // Update the page.
    createPage(page)
  }
}
