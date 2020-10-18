import React from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";

import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Table from "antd/lib/table";

import "antd/lib/button/style/index.css";
import "antd/lib/checkbox/style/index.css";
import "antd/lib/col/style/css";
import "antd/lib/row/style/css";
import "antd/lib/table/style/index.css";

import { TechnologyTree, TechnologiesInTree } from "./NestedTechnologies";

class TechnologySelector extends React.Component {
  constructor(props) {
    super();

    const { technologies: technologies } = props;

    // Add any technologies that aren't already in our hierarchy
    const unmatchedTechnologies = technologies
      .filter((x) => !TechnologiesInTree.has(x))
      .sort((a, b) => (a > b ? 1 : -1));

    const tableData = TechnologyTree.concat([
      {
        stack: "other",
        technologies: unmatchedTechnologies,
      },
    ]).map((item) => {
      return {
        ...item,
        key: item.stack,
      };
    });

    const checkedItems = {};
    const techInCategory = new Map();
    tableData.forEach((item) => {
      const { stack, technologies: technologiesInStack } = item;

      const stateInStack = {};
      technologiesInStack.forEach((tech) => {
        techInCategory.set(tech, stack);
        stateInStack[tech] = true;
      });

      techInCategory.set(stack, stack);
      checkedItems[stack] = stateInStack;
    });

    this.state = {
      checkedItems,
      stacks: tableData.map((item) => item.stack),
      tableData,
      techInCategory,
    };
  }

  // Handle individual techs selected (not category)
  onTechChecked = (event) => {
    const {
      target: { value: tech, checked: isChecked },
    } = event;
    const categoryOfTech = this.state.techInCategory.get(tech);

    const newCheckedItems = update(this.state.checkedItems, {
      [categoryOfTech]: { [tech]: { $set: isChecked } },
    });

    this.onSelectionsChanged(newCheckedItems);
  };

  // Handle only if one entire category is selected
  onCategoryChecked = (event) => {
    const {
      target: { value: category, checked: isChecked },
    } = event;

    const categoryState = { ...this.state.checkedItems[category] };
    if (isChecked) {
      Object.keys(categoryState).forEach((tech) => {
        categoryState[tech] = true;
      });
    } else {
      Object.keys(categoryState).forEach((tech) => {
        categoryState[tech] = false;
      });
    }

    const newCheckedItems = update(this.state.checkedItems, {
      [category]: { $set: categoryState },
    });

    this.onSelectionsChanged(newCheckedItems);
  };

  onSelectAll = () => {
    const checkedItems = {};
    this.state.tableData.forEach((item) => {
      const { stack, technologies: technologiesInStack } = item;

      const stateInStack = {};
      technologiesInStack.forEach((tech) => {
        stateInStack[tech] = true;
      });

      checkedItems[stack] = stateInStack;
    });

    this.onSelectionsChanged(checkedItems);
  };

  // Update state and parent component on any checkbox change
  onSelectionsChanged = (checkedItems) => {
    const onChanged = this.props.onChange;

    const selections = [];
    Object.keys(checkedItems).forEach((stack) => {
      const stackState = checkedItems[stack];
      const techs = Object.keys(stackState);

      techs.forEach((tech) => {
        if (stackState[tech]) {
          selections.push(tech);
        }
      });

      if (techs.every((tech) => stackState[tech])) {
        selections.push(stack);
      }
    });

    onChanged(selections);
    this.setState({
      checkedItems,
    });
  };

  // Rendering instructions for the table
  columns = [
    {
      title: "Stack",
      dataIndex: "stack",
      key: "stack",
      render: (stack) => {
        const techInStack = Object.keys(this.state.checkedItems[stack]);

        const checked = techInStack.every((tech) => this.state.checkedItems[stack][tech]);
        const indeterminate =
          !checked && techInStack.some((tech) => this.state.checkedItems[stack][tech]);

        return (
          <Checkbox
            value={stack}
            checked={checked}
            indeterminate={indeterminate}
            onChange={this.onCategoryChecked}
          >
            {stack}
          </Checkbox>
        );
      },
    },
    {
      title: "Technologies",
      dataIndex: "technologies",
      key: "technologies",
      render: (item) => {
        const category = this.state.techInCategory.get(item[0]);
        return (
          <span>
            <Row>
              {item.map((tech) => (
                <Col span={8} key={tech}>
                  <Checkbox
                    key={tech}
                    value={tech}
                    checked={this.state.checkedItems[category][tech]}
                    onChange={this.onTechChecked}
                  >
                    {tech}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </span>
        );
      },
    },
  ];

  render = () => {
    const { theme: theme } = this.props;

    const title = () => <h2>Filter by technologies used</h2>;
    const footer = () => (
      <Button type="primary" onClick={this.onSelectAll}>
        Select all
      </Button>
    );

    return (
      <React.Fragment>
        <div className="techselector">
          <Table
            columns={this.columns}
            dataSource={this.state.tableData}
            footer={footer}
            title={title}
            pagination={false}
          />
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
}

TechnologySelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  technologies: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
};

export default TechnologySelector;
