export const TechnologyTree = [
  {
    stack: "aws",
    technologies: ["kinesis", "S3"]
  },
  {
    stack: "java",
    technologies: ["jms", "spring boot"]
  },
  {
    stack: "javascript",
    technologies: ["gatsby", "graphql", "react", "redux"]
  },
  {
    stack: "python",
    technologies: ["django", "keras", "numpy", "pandas", "sklearn", "tensorflow"]
  },
  {
    stack: "scala",
    technologies: ["gatling"]
  }
];

const techList = TechnologyTree.flatMap(item => {
  return [item.stack].concat(item.technologies);
});

export const TechnologiesInTree = new Set(techList);
