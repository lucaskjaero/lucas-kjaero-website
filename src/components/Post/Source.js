import React from "react";
import PropTypes from "prop-types";
import Button from "antd/lib/button";

const Source = props => {
  const { source, theme } = props;

  if (source && source != "") {
    return (
      <React.Fragment>
        <div className="source">
          <Button type="primary" href={source}>
            View Source
          </Button>
        </div>

        {/* --- STYLES --- */}
        <style jsx>{`
          .ant-btn-primary {
            background-color: ${theme.background.color.brand};
          }
        `}</style>
      </React.Fragment>
    );
  } else {
    return <br />;
  }
};

Source.propTypes = {
  source: PropTypes.string,
  theme: PropTypes.object.isRequired
};

export default Source;
