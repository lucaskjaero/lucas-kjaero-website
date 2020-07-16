---
title: Lucas Kjaero-Zhang Website
tagline: This website!
category: Full Stack
technologies: ["aws", "gatsby", "graphql", "javascript", "latex", "react", "S3"]
tldr: This website! Displays projects and contact information using react and S3.
for: personal
source: https://github.com/lucaskjaero/lucas-kjaero-website
site:
---
A portfolio website to display projects, resume, and contact information. This website is entirely static content, served from an S3 bucket with no backend servers involved.

## Problem: Static content doesn't need a full backend
My existing portfolio website used a full backend server and had content in a database. However, I only updated content every six months. This was an inefficient use of money and servers when a static site was all I needed.

## What I learned
-   How to write react components.
-   How to use a static content generator (gatsby).
-   How to write graphql queries to populate a web page.
-   How to use serve a website using a S3 bucket and Cloudfront.
-   How to continuously deliver a serverless static website.
-   How to add latex to a build pipeline.
