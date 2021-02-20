import React from "react";
import PropTypes from "prop-types";

interface HTMLProps {
  htmlAttributes: any;
  headComponents: Array<any>;
  bodyAttributes: any;
  preBodyComponents: Array<any>;
  body: string;
  postBodyComponents: Array<any>;
}

const HTML = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}: HTMLProps) => {
  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {headComponents}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#D0E0D8" />
        <meta name="apple-mobile-web-app-title" content="Lazywill" />
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div key={"body"} id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}
      </body>
    </html>
  );
};

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
