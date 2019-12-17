import React from "react";
import PropTypes from "prop-types";
import Select from "antd/lib/select";
import "antd/lib/select/style/index.css";
const { Option } = Select;

const TechnologySelector = props => {
  const {
    technologies: technologiesRaw,
    onChange: onChange
  } = props;
  const technologies = technologiesRaw.map(tech => tech.fieldValue);

  return (
    <div>
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
      <br />
      <br />
    </div>
  );
};

TechnologySelector.propTypes = {
  data: PropTypes.object
};

export default TechnologySelector;
