import React from "react";
import PropTypes from "prop-types";
import Checkbox from "antd/lib/checkbox";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import "antd/lib/checkbox/style/index.css";
import "antd/lib/col/style/css";
import "antd/lib/row/style/css";
import { TechnologyTree, TechnologiesInTree } from "./NestedTechnologies";

const TechnologySelector = props => {
  const { technologies: technologies, onChange: onChange, theme: theme } = props;

  // Add any technologies that don't have a specific hierarchy
  const menu = technologies
    .filter(x => !TechnologiesInTree.includes(x))
    .map(item => {
      return { name: item, value: item };
    })
    .concat(TechnologyTree)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <React.Fragment>
      <div className="techselector">
        <h2>Technologies</h2>
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange} defaultValue={technologies}>
          <Row>
            {technologies.map(tech => {
              return (
                <Col span={8} key={tech}>
                  <Checkbox value={tech}>{tech}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
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
  onChange: PropTypes.func.isRequired,
  technologies: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default TechnologySelector;
