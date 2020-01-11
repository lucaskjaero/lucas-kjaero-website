import React from "react";
import PropTypes from "prop-types";
import Checkbox from "antd/lib/checkbox";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Table from "antd/lib/table";
import "antd/lib/col/style/css";
import "antd/lib/checkbox/style/index.css";
import "antd/lib/row/style/css";
import "antd/lib/table/style/index.css";
import { TechnologyTree, TechnologiesInTree } from "./NestedTechnologies";

class TechnologySelector extends React.Component {
  constructor(props) {
    super();

    const { technologies: technologies } = props;

    // Add any technologies that don't have a specific hierarchy
    const unmatchedTechnologies = technologies
      .filter(x => !TechnologiesInTree.has(x))
      .sort((a, b) => (a > b ? 1 : -1));

    // Build the table
    const technologyCategories = TechnologyTree.concat([
      {
        stack: "other",
        technologies: unmatchedTechnologies
      }
    ]).map(item => {
      return {
        ...item,
        key: item.stack
      };
    });

    // Use this to check categories
    let categoryLookup = {};
    technologyCategories.forEach(item => {
      categoryLookup[item.stack] = item.technologies;
    });

    this.state = {
      checked: new Set(technologies.concat(["other"])),
      categoryLookup: categoryLookup,
      stacks: new Set(technologyCategories.map(item => item.stack)),
      technologyCategories: technologyCategories
    };
  }

  onTechChecked = checkedTechnologies => {
    /*
     This should only act on non-category selection, but we need to do some calculation to figure it out.
     We compare the state with the selected items to see if the changed item is not a category
     */

    const currentlyChecked = new Set(checkedTechnologies);

    const changedItem =
      currentlyChecked.size > this.state.checked.size
        ? checkedTechnologies.find(item => !this.state.checked.has(item))
        : Array.from(this.state.checked).find(item => !currentlyChecked.has(item));

    if (!this.state.stacks.has(changedItem)) {
      this.props.onChange(checkedTechnologies);
      this.setState({
        checked: currentlyChecked
      });
    }
  };

  onCategoryChecked = e => {
    const {
      target: { value: category, checked: isChecked }
    } = e;

    const categoryItems = this.state.categoryLookup[category];
    let checkedItems = new Set(this.state.checked);

    if (isChecked || this.isPartiallyChecked(category)) {
      categoryItems.forEach(tech => {
        checkedItems.add(tech);
      });
      checkedItems.add(category);
    } else {
      categoryItems.forEach(tech => {
        checkedItems.delete(tech);
      });
      checkedItems.delete(category);
    }

    this.setState({
      checked: checkedItems
    });
    this.props.onChange(Array.from(checkedItems));
  };

  isPartiallyChecked = category => {
    const checkedInCategory = this.state.categoryLookup[category].filter(tech =>
      this.state.checked.has(tech)
    );
    return (
      checkedInCategory.length != this.state.categoryLookup[category].length &&
      checkedInCategory.length > 0
    );
  };

  columns = [
    {
      title: "Stack",
      dataIndex: "stack",
      key: "stack",
      render: stack => {
        return (
          <Checkbox
            value={stack}
            indeterminate={this.isPartiallyChecked(stack)}
            onChange={this.onCategoryChecked}
          >
            {stack}
          </Checkbox>
        );
      }
    },
    {
      title: "Technologies",
      dataIndex: "technologies",
      key: "technologies",
      render: item => (
        <span>
          <Row>
            {item.map(tech => (
              <Col span={8} key={tech}>
                <Checkbox key={tech} value={tech}>
                  {tech}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </span>
      )
    }
  ];

  render = () => {
    const { theme: theme } = this.props;

    return (
      <React.Fragment>
        <div className="techselector">
          <h2>Filter by technologies used</h2>
          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={this.onTechChecked}
            value={Array.from(this.state.checked)}
          >
            <Table
              columns={this.columns}
              dataSource={this.state.technologyCategories}
              pagination={false}
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
}

TechnologySelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  technologies: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default TechnologySelector;
