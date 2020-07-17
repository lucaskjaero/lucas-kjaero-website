import { FaCog } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import List from "../components/List";

const TechnologyTemplate = props => {
  const {
    pageContext: { technology },
    data: {
      allMarkdownRemark: { edges }
    }
  } = props;

  // Gatsby doesn't currently support set ownership checks in graphql, so we do this manually
  const selectedPosts = edges
    .filter(post => {
      return post.node.frontmatter.technologies && post.node.frontmatter.technologies !== null;
    })
    .filter(post => {
      return post.node.frontmatter.technologies.includes(technology);
    });
  const totalCount = selectedPosts.length;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline theme={theme}>
                <span>Projects using technology</span> <FaCog />
                {technology}
              </Headline>
              <p className="meta">
                There {totalCount > 1 ? "are" : "is"} <strong>{totalCount}</strong> project
                {totalCount > 1 ? "s " : " "}
                using this technology.
              </p>
              <List edges={selectedPosts} theme={theme} />
            </header>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo />
    </React.Fragment>
  );
};

TechnologyTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default TechnologyTemplate;

export const technologyQuery = graphql`
  query PostsByTechnology {
    allMarkdownRemark(limit: 1000, sort: { fields: [fields___prefix], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tagline
            technologies
          }
        }
      }
    }
  }
`;
