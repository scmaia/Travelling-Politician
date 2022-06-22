[![Netlify Status](https://api.netlify.com/api/v1/badges/76a2f4ed-6553-4ba4-8580-7b912ebf3015/deploy-status)](https://app.netlify.com/sites/travelling-politician/deploys)

# Introduction

## Overview
This project seeks to solve the challange of finding an acceptable route for an individual touring a number of locations with known latitude and longitude provided in a randomly ordered CSV file.

This project implements the following:
- File uploading and data parsing.
- Plotting functionality to visualize each node and connections to preceding and following notes.
- Simple route-finding algorithm based on connecting nearest neigbours.
  - Time complexity of n^2.
  - This algorithm does not find the optimum route. See 'Improvement Checklist' section for all limitations and proposed solutions. 

Demo: [https://travelling-politician.netlify.app/](https://travelling-politician.netlify.app/)

## Stack
- Typescript
- React.js

# Getting Started

## Local

Assumes you already have `git`, `node (15.3.0 up)`, and `npm` installed on your machine.

- Clone repo:

```
git clone ...
```

- Install dependencies:

```
npm install
```

- Start dev environment:

```
npm start
```

View website on http://localhost:3000


# Architecture


### ./components

This is where all the components live.  
Given more time I would decouple components from project-specific logic and separate stateless components here and containers elsewhere.

### ./pages

This folder hosts the one project page loaded through App.tsx

### ./utils

This is where algorithm and utility functions live.  
Given more time I would separate the algorithm(s) into a library.

# Improvement Checklist

### Additional Features

- Automatically generate adjustment parameters for plotting based on ranges of latitude & longitude on file.
- Add zoom and pan manual controls.
- Add option to throttle algorithm execution in order to visualize it's steps.
- Make file parser more flexible to accept different data formats and any number of columns (as long as there's lat and long)

### Better algorithm

- I attempted to implement a genetic algorithm to solve TSP, however I had to abandon it due to time restrictions.
- Given more time I would resume implementing the genetic algorithm, as well as would implement a dynamic programming approach for comparison.

### Accessibility

Run accessibility tests with Axe Dev Tools

### Performance Audit

Run performance audit with Lighthouse (in Chrome Dev Tools)

### Test

- Add unit tests for all components & functions
- Add end-to-end tests 
