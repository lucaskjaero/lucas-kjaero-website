---
title: Deployment Metrics Dashboard
tagline: Reports on production deployments for TurboTax and other Intuit products
category: Data Engineering
technologies: ["spring boot", "java", "jms", "aws", "kinesis", "elasticsearch", "react", "redux"]
tldr: Created a data collection pipeline and release information dashboard to enable leaders to self-serve deployment metrics.
for: Intuit
source:
---
Led a team of three engineers to create a data collection pipeline and release information dashboard to enable leaders to self-serve deployment metrics. This dashboard replaced manual queries from directors, enabling them to get data instantly.

## Problem: Weekly deployment reports required manual SQL queries
Every week, my director would ask for deployment reports to give to senior leadership. Those reports required different information each time, so they couldn't be automated. Data was also difficult to collect because our deployment tool was built using micro-services, causing data to be stored in different places.

## Solution: A dashboard for deployment metrics
We created a react dashboard that showed the last two years of deployment data, allowing filtering by product, team, whether it was in production, and more. We also created a metrics collection infrastructure to store raw user events, letting us answer questions about the level of automation in the release pipeline.

## How it works - Eventing
Our micro-services communicate over a message bus, so we collected user events there, creating new event messages as needed, and then stored those events into an elasticsearch instance. AWS Kinesis was used to decouple our services from elasticsearch, making it possible to change the metrics infrastructure without needing to change the deployment product. The dashboard used elasticsearch aggregations to get metrics about the deployment events, displaying them to the user in constant time.

## What I learned
- How to collect data from micro-services.
- How to use an enterprise messaging bus.
- How to use Kinesis to take data from a service to an elasticsearch instance in an ETL process.
- How to use elasticsearch queries to gather statistics.
- How to conduct design sessions to improve interface design.
- How to display data using react and redux.
