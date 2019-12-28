---
title: Free File Fillable Forms Performance
tagline: Performance tests for a product
category: DevOps
technologies: ["scala", "jenkins", "gatling"]
tldr: Created a suite of performance scripts to prepare the site for the predicted traffic of the 2017 tax season as the team's sole performance engineer.
for: Intuit
source:
---
I created a suite of performance testing scripts for Free File Fillable Forms, and used these scripts to prepare the site for the predicted traffic of the 2017 tax season as the team's sole performance engineer.

## Problem - unreadable scripts
Existing performance scripts used thousands of opaque json files inside a database, making it very difficult to understand what performance scripts were doing. Everybody who had written the prior scripts had left the company, and the current scripts needed significant changes to accommodate product changes.

## Solution - rewritten scripts with a focus on readability
I rewrote the performance scripts using the gatling framework, and generalized each tested API with a function. This way, you could read through the main script file and understand what it was doing, without needing to dig into each request. I also added these scripts as a post-deploy testing job, so that every new software version would get a report on how changes impacted the performance of the webapp.

## What I learned
- How to write complex programs in scala.
- How to test the performance of a website, both in peak and endurance scenarios.
- FMEA testing - seeing what will happen if various component services go down, to plan for potential outages.
