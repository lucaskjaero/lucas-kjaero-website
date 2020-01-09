import React from "react";
import PropTypes from "prop-types";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { TechnologyTree, TechnologiesInTree } from "./NestedTechnologies";

const TechnologySelector = props => {
  const { technologies: technologies, onChange: onChange, theme: theme } = props;

  // Add any technologies that don't have a specific hierarchy
  const menu = technologies
    .filter(x => !TechnologiesInTree.includes(x))
    .map(item => {
      return { label: item, value: item };
    })
    .concat(TechnologyTree)
    .sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <React.Fragment>
      <div className="techselector">
        <h2>Filter by technologies used</h2>
        <DropdownTreeSelect data={menu} onChange={onChange} />,
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
