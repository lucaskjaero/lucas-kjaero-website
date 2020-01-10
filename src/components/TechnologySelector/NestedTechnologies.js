export const TechnologyTree = {
  aws: ["kinesis", "S3"],
  java: ["jms", "spring boot"],
  javascript: ["gatsby", "graphql", "react", "redux"],
  python: ["django", "keras", "numpy", "pandas", "sklearn", "tensorflow"],
  scala: ["gatling"]
};

const techList = Object.keys(TechnologyTree).flatMap(stack => {
  return TechnologyTree[stack].concat(stack);
});

export const TechnologiesInTree = new Set(techList);
