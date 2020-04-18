---
title: RPM data access lambda
tagline: Data access layer for legacy service to reduce developer wait time by a day.
category: Data Engineering
technologies: ["apollo", "graphql", "javascript", "lambda", "microsoft sql"]
tldr: Data access layer for legacy service to reduce developer wait time by a day and prevent service from being overloaded.
for: Intuit
source:
site:
---
A data access layer for legacy service to reduce developer wait time by a day and prevent legacy service from being overloaded, served in an AWS lambda using GraphQL.

## Problem: A decade-old system was not able to cope with modern data requirements
A decades-old service that was built to handle a few transactions at a time now needed to export years of data for data analytics purposes.

## What I learned
- How to deploy a service on AWS Lambda.
- How to expose data using a GraphQL API.
- To keep analytics systems separate from customer systems.
- How to transfer large amounts of data when it doesn't fit within the traditional rest response cycle.
