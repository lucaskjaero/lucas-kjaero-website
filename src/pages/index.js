import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Blog from "../components/Blog";
import Hero from "../components/Hero";
import Pitch from "../components/Pitch";
import Seo from "../components/Seo";

class IndexPage extends React.Component {
  separator1 = React.createRef();
  separator2 = React.createRef();

  scrollToContent = e => {
    this.separator1.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  render() {
    const {
      data: {
        posts: { edges: posts = [] },
        pitch: {
          html: pitch,
          frontmatter: { tagline }
        },
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <Hero scrollToContent={this.scrollToContent} backgrounds={backgrounds} theme={theme} />
          )}
        </ThemeContext.Consumer>

        <hr ref={this.separator1} />

        <ThemeContext.Consumer>
          {theme => <Pitch html={pitch} tagline={tagline} theme={theme} />}
        </ThemeContext.Consumer>

        <hr ref={this.separator2} />

        <ThemeContext.Consumer>
          {theme => <Blog posts={posts} theme={theme} />}
        </ThemeContext.Consumer>

        <Seo />

        <style jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
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
            technologies
            tldr
          }
        }
      }
    }
    pitch: markdownRemark(fileAbsolutePath: { regex: "/pitch/" }) {
      html
      frontmatter {
        tagline
      }
    }
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/lucas-background/" } }) {
      resize(width: 1200, quality: 90, cropFocus: ATTENTION) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/lucas-background/" } }) {
      resize(width: 800, height: 600, quality: 90, cropFocus: ATTENTION) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/lucas-background/" } }) {
      resize(width: 600, height: 350, quality: 90, cropFocus: ATTENTION) {
        src
      }
    }
  }
`;
