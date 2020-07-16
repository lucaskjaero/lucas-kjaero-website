---
title: Udacity Machine Learning Projects
tagline: Machine learning practice
category: AI and Machine Learning
technologies: ["python", "numpy", "pandas", "sklearn"]
tldr: Machine learning projects from the Udacity Machine Learning Nanodegree
for: personal
source: https://github.com/lucaskjaero/machine-learning
site:
---
As part of an effort to learn machine learning, I did many of the projects from the Udacity machine learning nanodegree. This involved exploring datasets, training models, and then writing reports on what I had done.

## Titanic Survivors: Data exploration
This project involved using a dataset of titanic passengers to try to predict which passengers would survive. I explored the dataset using pandas, trying different types of data to see which were most predictive of survival. I then hand-built a decision tree that could predict whether a passenger survived with 80% accuracy. [See the project report here](https://github.com/lucaskjaero/machine-learning/blob/master/projects/titanic_survival_exploration/titanic_survival_exploration.ipynb)

## Boston Housing Prices: Learning setup
This project involved using a dataset of houses in Boston to determine the price of a house. Using a single linear regression model, I experimented with different ways of splitting up the dataset to see how it impacted the quality of the predictions. I learned how to split a dataset into training and test sets. I also learned how to programmatically train many models to see which ones did well, using both a grid search to find the best parameters for the model, and also using k-fold cross validation to select the training data that best explains the patterns in the data. [See the project report here](https://github.com/lucaskjaero/machine-learning/blob/master/projects/boston_housing/boston_housing.ipynb)

## Finding Donors: Supervised learning
This project involved using census data to predict a person's income. This data wasn't cleaned enough to directly give to a machine learning algorithm, so I normalized and preprocessed the data before training models. Afterwards, I tried three different supervised learning algorithms to see which one performed the best: SVM, Gradient Boost, and K Nearest Neighbors. After choosing Gradient Boost, I used a grid search to find some parameters which gave the best results. [See the project report here](https://github.com/lucaskjaero/machine-learning/blob/master/projects/finding_donors/finding_donors.ipynb)

## Customer Segments: Unsupervised learning
This project involved using customer purchase data for a food distributor to identify groups of customers with similar buying patterns. For this project, there was much more data than necessary, and much of it wasn't very useful. I compared many types of data against other types to see which ones had the same patterns, so that I could remove all but one of them. Afterwards, I used a Principal Component Analysis algorithm to reduce the amount of data even further, by combining multiple features into one. After this, I used an unsupervised learning algorithm called K-means clustering to cluster the data into two different groups. As it turned out, those groups predicted whether a customer was a restaurant or a grocery store, making me pretty comfortable with the model. [See the project report here](https://github.com/lucaskjaero/machine-learning/blob/master/projects/customer_segments/customer_segments.ipynb)

## What I learned
-   How to explore datasets to find features for machine learning using pandas
-   How to train and test machine learning models
-   How to evaluate a machine learning model's performance
-   Several supervised learning algorithms and how to apply them: Gradient Boost, SVM, and K Nearest Neighbors
-   How to tune a machine learning algorithm
-   How to transform multiple features into a single one to create simpler models
-   How to set up unsupervised learning and then interpret the results
