import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const _ = require("lodash");

import { FaCalendar, FaCog, FaTag } from "react-icons/fa/";

const Meta = (props) => {
  const { prefix, category, technologies, theme } = props;

  return (
    <p className="meta">
      <span>
        <FaCalendar size={18} /> {prefix}
      </span>
      {category && (
        <span>
          <FaTag size={18} />
          <Link to={`/category/${_.kebabCase(category)}`}>{category}</Link>
        </span>
      )}
      {technologies && (
        <span>
          <FaCog size={18} />
          {technologies.sort().map((tech) => {
            return (
              <span key={tech}>
                <Link to={`/technology/${tech.split(" ").join("-")}`}>{tech}</Link>
              </span>
            );
          })}
        </span>
      )}

      {/* --- STYLES --- */}
      <style jsx>{`
        .meta {
          display: flex;
          flex-flow: row wrap;
          font-size: 0.8em;
          margin: ${theme.space.m} 0;
          background: transparent;

          :global(svg) {
            fill: ${theme.icon.color};
            margin: ${theme.space.inline.xs};
          }
          span {
            align-items: center;
            display: flex;
            text-transform: uppercase;
            margin: ${theme.space.xs} ${theme.space.s} ${theme.space.xs} 0;
          }
        }
        @from-width tablet {
          .meta {
            margin: ${`calc(${theme.space.m} * 1.5) 0 ${theme.space.m}`};
          }
        }
      `}</style>
    </p>
  );
};

Meta.propTypes = {
  prefix: PropTypes.string.isRequired,
  category: PropTypes.string,
  technologies: PropTypes.array,
  theme: PropTypes.object.isRequired,
};

export default Meta;
