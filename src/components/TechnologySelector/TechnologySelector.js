import React from "react";
import PropTypes from "prop-types";
import Checkbox from "antd/lib/checkbox";
import Col from "antd/lib/col";
import List from "antd/lib/list";
import Row from "antd/lib/row";
import "antd/lib/checkbox/style/index.css";
import "antd/lib/col/style/css";
import "antd/lib/list/style/index.css";
import "antd/lib/row/style/css";
import { TechnologyTree, TechnologiesInTree } from "./NestedTechnologies";

const makeRow = technologies => {
  return technologies.map(tech => {
    return (
      <Col span={8} key={tech}>
        <Checkbox value={tech}>{tech}</Checkbox>
      </Col>
    );
  });
};

const TechnologySelector = props => {
  const { technologies: technologies, onChange: onChange, theme: theme } = props;

  // Add any technologies that don't have a specific hierarchy
  const unmatchedTechnologies = technologies
    .filter(x => !TechnologiesInTree.has(x))
    .sort((a, b) => (a > b ? 1 : -1));

  return (
    <React.Fragment>
      <div className="techselector">
        <h2>Filter by technologies used</h2>
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange} defaultValue={technologies}>
          <List
            bordered
            dataSource={TechnologyTree}
            footer={
              <div>
                other:
                <Row>{makeRow(unmatchedTechnologies)}</Row>
              </div>
            }
            renderItem={item => (
              <List.Item>
                <b>
                  <Checkbox value={item.stack}>{item.stack + ": "}</Checkbox>
                </b>
                <Row>{makeRow(item.technologies)}</Row>
              </List.Item>
            )}
          />
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
