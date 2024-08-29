# Data Transformation Utilities (Frontend)

This folder contains utility functions for transforming data received from the backend into a format suitable for the frontend application.

## Purpose

These functions are intended to be used within the frontend application to transform raw data before it is used in components or for state management.

Data Shaping: Modify the structure and format of data to match the frontend component requirements.  
Filtering: Filter unnecessary or irrelevant data from the backend response.  
Enhancement: Enrich data with additional properties or logic specific to the frontend needs.  

## Important Note

If the BFF service is implemented, these functions will be deprecated in favor of utilizing it for data transformation where frontend will make API calls to receiving data in a format already optimized for consumption by its components.
