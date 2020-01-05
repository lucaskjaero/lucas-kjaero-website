---
title: PyCasia
tagline: Chinese handwriting in python
category: AI and Machine Learning
technologies: ["python", "numpy"]
tldr: An open-source python library to work with the CASIA Chinese handwriting database.
for: personal
source: https://github.com/lucaskjaero/PyCasia
site: https://pypi.org/project/Pycasia/
---
An open-source python library to work with the CASIA Chinese handwriting database. Reads custom binary filetypes to prepare for machine learning applications.

## Problem: A dataset with a custom binary format
The CASIA library uses a custom binary format to pack thousands of images into a single file. This allows for efficient processing, but doesn't work with anything else without extra glue code. This library is the glue code that allows this data to be used with off the shelf machine learning frameworks.

## What I learned
- I learned how to read custom binary file types using only a specification.
- I learned how to package and publish python code to the Python Package Index.
