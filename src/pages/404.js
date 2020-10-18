import React from "react";
import { Link } from "gatsby";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

const NotFoundPage = () => (
  <React.Fragment>
    <ThemeContext.Consumer>
      {theme => (
        <Article theme={theme}>
          <header>
            <Headline title="Not Found" theme={theme} />
          </header>
          <div>
            <p>
              You just hit a page that doesn&#39;t exist. Were you looking for
              <b>
                <Link to="/project/">projects</Link>
              </b>
              or
              <b>
                <a href="/lucas-kjaero-zhang-resume.pdf">my resume</a>
              </b>
              ?
            </p>
          </div>
        </Article>
      )}
    </ThemeContext.Consumer>

    <Seo />
  </React.Fragment>
);

export default NotFoundPage;
