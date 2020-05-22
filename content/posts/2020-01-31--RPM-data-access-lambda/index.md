---
title: RPM data access lambda
tagline: Data access layer for legacy service to reduce developer wait time by a day.
category: Data Engineering
technologies: ["apollo", "graphql", "javascript", "lambda", "microsoft sql"]
tldr: Data access layer for legacy service to reduce developer wait time from days to minutes and prevent service from being overloaded.
for: Intuit
source:
site:
---
A data access layer for legacy service to reduce developer wait time by a day and prevent legacy service from being overloaded, served in an AWS lambda using GraphQL.

## Problem: A decade-old system was not able to cope with modern data requirements
Turbotax determines which parts of the product are complete and ready to use by combining data from two different internal tools. We needed to combine data from both systems whenever developers requested the latest reports, so that they can know that their changes were in effect. Previously, developers would rely on a scheduled job which ran every 8 hours to get the reports that they needed. Unfortunately, one of the two services from which we needed to pull data was decades old and was only built to handle a few small queries at a time.

## Naive solution: expose the data directly from the target system.
We tried to build a web endpoint in the legacy service that could expose the data, but the it could not respond quickly enough to meet requirements. Worse, requests which selected a large amount of data would cause the service to become unresponsive for all users, and required developer intervention to bring it back online.

Because the data we needed was not a very large amount, we knew that it could be retrieved within a few seconds, even if the service could not handle it. When we requested the data from the service's database, results were returned in under a second. This demonstrated that a new service was needed which could expose the data.

## Flexibility was paramount
During the project, we knew the requirements for some of the data requests, but other queries remained unknown. However, timelines were short, and we knew that more data would be needed Solution. Because of this uncertainty, the solution needed to be general enough to support exporting additional data.

I chose to design our solution around GraphQl because it has a flexible query model. When you build a graphql interface, you write code for getting all of the data you would like to expose, but all the data is not exposed on every request. The user decides what data they want, and the graphql service takes care of customizing the response to what the user needs.

## Low maintenance
The service we were getting data from was not one that we were responsible for maintaining, and the team which was responsible did not want to take on a larger support burden. Creating a new service was out, because the high infrastructure and security maintenance was more than they were willing to accept.

I chose to build our solution on AWS lambda because a lambda based solution does not need infrastructure maintenance. Amazon takes care of everything except for our specific code.

## Solution: A Graphql API served from a lambda
Our final solution was to use the Apollo GraphQL server to serve data from the legacy service's database. Apollo can be deployed on a lambda, making it a good fit for our requirements. Our lambda has already served hundreds of users.

## What I learned
-   How to deploy a service on AWS Lambda.
-   How to expose data using a GraphQL API.
-   To keep analytics systems separate from customer systems.
-   How to transfer large amounts of data when it doesn't fit within the traditional rest response cycle.
