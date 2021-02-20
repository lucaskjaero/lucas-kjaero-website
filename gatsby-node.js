/* eslint-disable no-console */
// Console logs are fine during the build process, probably actually encouraged.

const _ = require("lodash");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const Promise = require("bluebird");

const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;
    const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;

    if (source !== "parts") {
      createNodeField({
        node,
        name: `slug`,
        value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`,
      });
    }
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : "",
    });
    createNodeField({
      node,
      name: `source`,
      value: source,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve("./src/templates/PostTemplate.tsx");
    const pageTemplate = path.resolve("./src/templates/PageTemplate.tsx");
    const categoryTemplate = path.resolve("./src/templates/CategoryTemplate.tsx");
    const technologyTemplate = path.resolve("./src/templates/TechnologyTemplate.tsx");

    // Do not create draft post files in production.
    const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "development";
    console.log(`Using environment config: '${activeEnv}'`);
    const filters =
      activeEnv === "production"
        ? `filter: { fields: { slug: { ne: null } , prefix: { ne: null } } }`
        : `filter: { fields: { slug: { ne: null } } }`;

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              ` +
          filters +
          `
              sort: { fields: [fields___prefix], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  id
                  fields {
                    slug
                    prefix
                    source
                  }
                  frontmatter {
                    title
                    category
                    technologies
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const items = result.data.allMarkdownRemark.edges;

        // Create category list
        const categorySet = new Set();
        items.forEach((edge) => {
          const {
            node: {
              frontmatter: { category },
            },
          } = edge;

          if (category && category !== null) {
            categorySet.add(category);
          }
        });

        // Create category pages
        const categoryList = Array.from(categorySet);
        categoryList.forEach((category) => {
          createPage({
            path: `/category/${_.kebabCase(category)}/`,
            component: categoryTemplate,
            context: {
              category,
            },
          });
        });

        // Create technology list
        const technologySet = new Set();
        items.forEach((edge) => {
          const {
            node: {
              frontmatter: { technologies },
            },
          } = edge;

          if (technologies && technologies !== null) {
            technologies.forEach((tech) => technologySet.add(tech));
          }
        });

        // Create technology pages
        const technologyList = Array.from(technologySet);
        technologyList.forEach((technology) => {
          createPage({
            path: `/technology/${_.kebabCase(technology)}/`,
            component: technologyTemplate,
            context: {
              technology,
            },
          });
        });

        // Create posts
        const posts = items.filter((item) => item.node.fields.source === "posts");
        posts.forEach(({ node }, index) => {
          const slug = node.fields.slug;
          const next = index === 0 ? undefined : posts[index - 1].node;
          const prev = index === posts.length - 1 ? undefined : posts[index + 1].node;
          const source = node.fields.source;

          createPage({
            path: slug,
            component: postTemplate,
            context: {
              slug,
              prev,
              next,
              source,
            },
          });
        });

        // and pages.
        const pages = items.filter((item) => item.node.fields.source === "pages");
        pages.forEach(({ node }) => {
          const slug = node.fields.slug;
          const source = node.fields.source;

          createPage({
            path: slug,
            component: pageTemplate,
            context: {
              slug,
              source,
            },
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }, options) => {
  switch (stage) {
    case `build-javascript`:
      actions.setWebpackConfig({
        plugins: [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "./report/treemap.html",
            openAnalyzer: true,
            logLevel: "error",
            defaultSizes: "gzip",
          }),
        ],
      });
  }
};
