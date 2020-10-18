import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";
import List from "../components/List";
import Seo from "../components/Seo";
import TechnologySelector from "../components/TechnologySelector";

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);

    const {
      data: {
        posts: { categories: posts, technologies: technologies },
      },
    } = this.props;

    this.state = {
      postsByCategory: posts,
      technologies: technologies.map((tech) => tech.fieldValue),
    };

    this.handleTechnologySelection = this.handleTechnologySelection.bind(this);
  }

  handleTechnologySelection(technologies) {
    const selectedPosts = this.props.data.posts.categories
      .map((category) => {
        return {
          fieldValue: category.fieldValue,
          edges: category.edges.filter((node) =>
            node.node.frontmatter.technologies.some((tech) => technologies.includes(tech))
          ),
        };
      })
      .filter((category) => category.edges.length > 0);

    this.setState({ postsByCategory: selectedPosts });
  }

  render() {
    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {(theme) => (
            <Article theme={theme}>
              <header>
                <Headline title="Projects by category" theme={theme} />
              </header>
              <TechnologySelector
                technologies={this.state.technologies}
                onChange={this.handleTechnologySelection}
                theme={theme}
              />
              {this.state.postsByCategory.map((item) => (
                <section key={item.fieldValue}>
                  <h2>
                    <FaTag /> {item.fieldValue}
                  </h2>
                  <List edges={item.edges} theme={theme} />
                </section>
              ))}
              {/* --- STYLES --- */}
              <style jsx>{`
                h2 {
                  margin: 0 0 0.5em;
                }
                h2 :global(svg) {
                  height: 0.8em;
                  fill: ${theme.color.brand.primary};
                }
              `}</style>
            </Article>
          )}
        </ThemeContext.Consumer>

        <Seo />
      </React.Fragment>
    );
  }
}

ProjectPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectPage;

export const query = graphql`
  query PostsQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: fields___prefix, order: DESC }
    ) {
      technologies: group(field: frontmatter___technologies) {
        fieldValue
      }
      categories: group(field: frontmatter___category) {
        fieldValue
        edges {
          node {
            excerpt
            fields {
              slug
              prefix
            }
            frontmatter {
              title
              category
              tagline
              technologies
            }
          }
        }
      }
    }
  }
`;
