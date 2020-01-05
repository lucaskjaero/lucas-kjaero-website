const technologyOptions = [
  {
    label: "aws",
    value: "aws",
    children: [
      {
        label: "kinesis",
        value: "kinesis"
      },
      {
        label: "S3",
        value: "S3"
      }
    ]
  },
  {
    label: "java",
    value: "java",
    children: [
      {
        label: "jms",
        value: "jms"
      },
      {
        label: "spring boot",
        value: "spring boot"
      }
    ]
  },
  {
    label: "javascript",
    value: "javascript",
    children: [
      {
        label: "gatsby",
        value: "gatsby"
      },
      {
        label: "graphql",
        value: "graphql"
      },
      {
        label: "react",
        value: "react"
      },
      {
        label: "redux",
        value: "redux"
      }
    ]
  },
  {
    label: "python",
    value: "python",
    children: [
      {
        label: "django",
        value: "django"
      },
      {
        label: "keras",
        value: "keras"
      },
      {
        label: "numpy",
        value: "numpy"
      },
      {
        label: "pandas",
        value: "pandas"
      },
      {
        label: "sklearn",
        value: "sklearn"
      },
      {
        label: "tensorflow",
        value: "tensorflow"
      }
    ]
  },
  {
    label: "scala",
    value: "scala",
    children: [
      {
        label: "gatling",
        value: "gatling"
      }
    ]
  }
];

export const NestedTechnologies = {
  menu: technologyOptions
};
