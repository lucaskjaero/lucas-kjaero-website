---
title: RELENG-docker
tagline: Docker images for local development of microservices
category: DevOps
technologies: ["docker", "java", "spring boot"]
tldr: Created a suite of docker containers allowing new hires to begin local development on day one.
for: Intuit
source:
---
Created a suite of docker containers allowing new hires to begin local development on day one. Prior to the docker setup, local development was a pain point, with no team-member having all micro-services set up locally, and development frequently occurred in local environments

## Problem: painful local development encouraged people to skip steps
While working on a micro-service based project, you frequently have to work with the interaction between two services. However, if you are not going to be changing anything on one of the services, it is not worth setting that service up locally. It is tempting to just make assumptions about how the other service will work, or to test in a pre-production environment, but this can cause bugs.

## Solution: pre-prepared docker images of all services
Creating a docker container made it easy to get a service running locally for testing, usually within minutes. This removed all excuses for testing in pre-prod, and encouraged local testing.

## What I learned
- How to dockerize spring boot applications.
- How to recreate a microservice architecture locally using docker-compose.
