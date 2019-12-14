import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";
import List from "../components/List";
import Seo from "../components/Seo";

const TechnologiesPage = props => {
  const {
    data: {
      posts: {
        projects: projects,
        technologies: technologies
      },
    }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Projects by technology" theme={theme} />
            </header>
            {projects.map(item => (
              <div>
                <label>{item.frontmatter.title}</label>
                <br />
                <br />
              </div>
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
};

TechnologiesPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default TechnologiesPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query TechnologiesQuery {
    posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "//posts/[0-9]+.*--/"}}, sort: {fields: fields___prefix}) {
      projects: nodes {
        fields {
          slug
        }
        frontmatter {
          title
          technologies
        }
      }
      technologies: group(field: frontmatter___technologies) {
        fieldValue
      }
    }
  }
`;
