import React from "react";
import PropTypes from "prop-types";
import Select from "antd/lib/select";
import "antd/lib/select/style/index.css";
const { Option } = Select;

const TechnologySelector = props => {
  const {
    technologies: technologies,
    onChange: onChange,
    theme: theme
  } = props;

  return (
    <React.Fragment>
      <div className="techselector">
        <h2>Technologies</h2>
        <Select
          mode="tags"
          defaultValue={technologies}
          style={{width: "100%"}}
          tokenSeparators={[',']}
          onChange={onChange}
        >
          {
            technologies.map(tech => {
              return <Option key={tech}>{tech}</Option>
            })
          }
        </Select>
      </div>

      {/* --- STYLES --- */}
      <style jsx>{`
        .techselector {
          margin: ${theme.space.stack.m};
          padding-top: ${theme.space.m};
        }
      `}</style>
    </React.Fragment>
  );
};

TechnologySelector.propTypes = {
  data: PropTypes.object
};

export default TechnologySelector;
