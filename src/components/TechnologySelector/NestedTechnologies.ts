export const TechnologyTree = [
  {
    stack: "aws",
    technologies: ["kinesis", "lambda", "S3"],
  },
  {
    stack: "datastores",
    technologies: ["elasticsearch", "microsoft sql", "postgresql"],
  },
  {
    stack: "java",
    technologies: ["jms", "spring boot"],
  },
  {
    stack: "javascript",
    technologies: ["apollo", "gatsby", "graphql", "react", "redux"],
  },
  {
    stack: "python",
    technologies: ["django", "keras", "numpy", "pandas", "sklearn", "tensorflow"],
  },
];

const techList = TechnologyTree.flatMap((item) => {
  return [item.stack].concat(item.technologies);
});

export const TechnologiesInTree = new Set(techList);
