# PredictionGenerator

# Full stack project

**Description:**

We’re going to be building a very small scale version of an ai headshot generator using a dreambooth api

**Requirements:**

- You should use typescript, node.js, and sql/postgres in order to implement this solution
- We won’t need to setup ml training from scratch, and can just use a public api to do the fine tuning
    - Create training
        - https://replicate.com/blog/dreambooth-api
    - Create ai photos
        - https://replicate.com/replicate/dreambooth/readme
    - This service will take a series of user uploaded images, and generate a model that can be later called to generate photos
- We will design several backend service endpoints that let’s users interact with and create ai photos using your node server

4 endpoints that are required

- We should support an endpoint that lets users provide a series of uploads and start a training
- We should support an endpoint that lets users check if their training is finished or in-progress
- We support an endpoint that let’s users create an ai photo
- We support an endpoint that let’s users retrieve their created photos

You may require additional endpoints to support the above functionality
