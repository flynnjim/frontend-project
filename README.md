# News Attack

## Hosted on Netlify

### [**Live App**](https://newsattack.netlify.app)

## Table of Contents

- [**Introduction**](#introduction)
- [**Project Overview**](#project-overview)
- [**Key features**](#key-features)
- [**Technologies Used**](#technologies-used)
- [**Installation and Setup**](#installation-and-setup)
  - [Requirements](#requirements)
  - [Steps to Install Locally](#steps-to-install-locally)
- [**Build for Production**](#build-for-production)
- [**Environment Variables** ](#environment-variables)
- [**API Integration**](#api-integration)
- [**Deployment**](#deployment)
- [**Redeployment**](#redeployment)
- [**Setting Up Environment Variables in Netlify**](#setting-up-environment-variables-in-netlify)

## **Introduction**

The Code Chronicles is a social news, rating, and discussion app. Users can read articles, upvote articles, and add comments. This frontend application interacts with my backend News RESTful API to display and manipulate article and comment data.

## **Project Overview**

The frontend for **The Code Chronicles** was built using **React** (built with Vite) and styled using **CSS** and **Tailwind CSS**. **Axios** was used to make API requests to my Backend News RESTful API, allowing the user to view, filter, sort and comment on articles, and upvote comments on that article.

## **Key features**

- **View Articles:** Users can browse articles and filter by topic.
- **Commenting:** Users can comment on articles and view other users' comments.
- **Voting:** Users can upvote articles they like.
- **Responsive Design:** Styled using Tailwind CSS for a consistent and responsive user experience on a range of device sizes.

## **Technologies Used**

- **React** (18.3.1)
- **Vite** for quick builds and local development
- **Axios** for API requests
- **Tailwind CSS** for responsive and dynamic design
- **React Router** for client-side routing

## **Installation and Setup**

### Requirements

- **Node.js** (version 16+)
- **npm** (version 7+)

### Steps to Install Locally

1. Clone the Respository
   ```bash
   git clone https://github.com/flynnjim/frontend-project
   cd nc-news-frontend
   ```
2. Install Dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to http://localhost:5173.

## Build for Production

To create an optimized production build:

```bash
npm run build
```

You can preview the production build locally using:

```bash
npm run preview
```

## **Environment Variables**

In order to connect to the backend API, you will need to create a .env file in the root of your project with the following variable:

```bash
VITE_BACKEND_API_URL=https://backend-project-fmoa.onrender.com/api
```

This tells the frontend where the API is hosted.

## **API Integration**

This frontend interacts with the **The Backend News RESTful API**, allowing users to:

- Fetch all topics: `GET /api/topics`
- Fetch all articles: `GET /api/articles`
- Fetch single article: `GET /api/articles/:article_id`
- Fetch article comments: `GET /api/articles/:article_id/comments`
- Post a comment: `POST /api/articles/:article_id/comments`
- Vote on article: `PATCH /api/articles/:article_id`
- Delete a comment: `DELETE /api/comments/:comment_id`
- Fetch all users: `GET /api/users`

## Deployment

The app is deployed on **Netlify**

1. Create a production version of the app
   Run following command to compile the code into static files:

```bash
npm run build
```

2. Create Netlify and Install Netfify's CLI
   Sign up to Netlify
   install the CLI with npm:

```bash
npm install netlify-cli -g
```

3. Deploy to a draft URL

```bash
netlify deploy
```

4. Deploy to a production URL
   Run the following command to deploy the site to the production URL:

```bash
netlify deploy --prod
```

## Redeployment

1. When redploying an app, first create an updated build version of the code:

```bash
npm run build
```

2. Deploy to a draft URL:
   select dist for publish directory

```bash
netlify deploy
```

3. Deploy to the production URL:
   select dist for publish directory

```bash
netlify deploy --prod
```

## Setting Up Environment Variables in Netlify

To ensure the frontend is properly connected to the backend API in the deployed version, environment variables must be set up in Netlify.

1. Log in to Netlify:
2. Go to Site Settings:

- Navigate to the **Dashboard**.
- Click on the name of hosted site

3. Access the Environment Variables Section:

- Click on Site settings in the left-hand menu
- Click on Environment Variables.

4. Add the Environment Variable:

- Click **add a variable**
- Add the variable VITE_BACKEND_API_URL with the value of the backend API URL:

```bash
Key: VITE_BACKEND_API_URL
Value: https://backend-project-fmoa.onrender.com/api
```

5. Save the Environment Variable
6. Redeploy Site:

- Go to the Deploys tab on Netlify and deploy site, or follow instructions as above for CLI

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Development provided by [Northcoders](https://northcoders.com/)
