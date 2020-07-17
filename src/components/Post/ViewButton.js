import React from "react";
import PropTypes from "prop-types";
import Button from "antd/lib/button";

const ViewButton = props => {
  const { link, text, theme } = props;

  if (link && link !== "") {
    return (
      <React.Fragment>
        <div className="source">
          <Button type="primary" href={link}>
            {text}
          </Button>
        </div>

        {/* --- STYLES --- */}
        <style jsx>{`
          a {
            background-color: ${theme.background.color.brand};
            margin-bottom: 2em;
          }
        `}</style>
      </React.Fragment>
    );
  } else {
    return <br />;
  }
};

ViewButton.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default ViewButton;
