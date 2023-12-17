# Auction Website Project 

## Overview
This project aims to create a fully responsive auction website using web technologies such as HTML, CSS, and JavaScript. The primary goal is to apply the skills acquired over the past three semesters and build a functional front-end application that interacts with an existing API.
### Deployment Production
- [BidBuddies](https://bidbuddies.netlify.app/home)
## Table of Contents

- [Getting Started](#getting-started)
- [Core Project Tasks](#core-project-tasks)
  - [Registration and Authentication](#registration-and-authentication)
  - [User Credits](#user-credits)
  - [Listing Creation](#listing-creation)
  - [Bidding System](#bidding-system)
  - [Search Functionality](#search-functionality)
- [Optional Tasks](#optional-tasks)
- [Technical Requirements](#technical-requirements)
- [Documentation and Reporting](#documentation-and-reporting)
- [Recommended Stack](#recommended-stack)



  ## Built With React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Getting Started

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the repo:**

    ```bash
    git clone https://github.com/KrystianGH2/semester-project-2Y.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd semester-project-2Y
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

### Running the App

Now that you have the project and its dependencies installed, you can run the app with the following command:

```bash
npm run dev
```

## Core Project Tasks

### Registration and Authentication
- [x] Implement registration with stud.noroff.no email.
- [x] Create login and logout functionality for registered users.
- [x] Allow registered users to update their avatars.

### User Credits
- [x] Display total credits for registered users.

### Listing Creation
- [x] Develop a form for registered users to create listings.
- [x] Include fields for title, deadline date, media gallery, and description.

### Bidding System
- [x] Enable registered users to add bids to another user's listing.
- [x] Display bids made on a listing.

### Search Functionality
- [x] Allow unregistered users to search through listings.

## Optional Tasks

### End-to-End Testing
- [x] Write end-to-end tests for the login user journey.
- [x] Write end-to-end tests for non-registered users searching through listings.
- [x] Write end-to-end tests for registered users adding bids to another user's listing.

### Environment Setup:
- [x] Create staging and production environments for the repository.

### UI/UX:
- [x] Implement fluid animations in the UI.
- [x] Optimize media for the web.
- [x] Include loading states in the UI.
- [x] Ensure forms support autocomplete.


## Technical Requirements
- [x] Choose and implement an approved CSS framework (e.g., Bootstrap, Tailwind).
- [x] Host the project on an approved static hosting service (e.g., GitHub Pages, Netlify, Vercel).
- [x] Use an approved design application (e.g., Figma) and provide a link to the high-fidelity design.
- [x] Use an approved planning application (e.g., GitHub Projects, Trello) to create a Gantt chart or Kanban project board.



## Recommended Stack Used
- [x] Use React for the frontend.
- [x] Implement Cypress for end-to-end testing.
- [x] Apply Tailwind CSS for styling.
- [x] Use React Router for navigation.


## Documentation and Reporting
- [x] Thoroughly describe the project in the readme.md file.
- [x] Include setup instructions and how to run the project locally.
- [ ] Provide any special instructions for testers.
- [ ] Include required links in the Moodle delivery window using the provided template format.
- [ ] Prepare a report summarizing your project.

# Project Report Summary

### Project Overview

- In this semester's project, I present my Auction site. The primary goal is to apply the skills gained in the past three semesters to create a fully functional and responsive website. The project involves using HTML, CSS, and JavaScript to build a front-end application for a REST API, specifically the Noroff API Auction House endpoints. This enables users to list items for auction, place bids, and manage their credits.

### Technology Stack
- The project is built with Vite + React, Tailwind CSS, and Flowbite for stylings and Cypress for end-to-end testing.

### Project Phases
#### Planning
- After receiving the project brief, I dedicated a week to planning the project. This involved deciding on the frameworks, libraries, and design to be used. I set clear goals for achieving the minimum criteria required for project completion, focusing on meeting the essential requirements before considering optional tasks.

#### Designing
- Designing the website is a crucial step, and while it may not be my forte, I aimed for simplicity with a touch of visual appeal. I explored various templates and took inspiration from existing auction sites, finding a balance between complexity and user-friendliness. The color scheme chosen was orange and white to add vibrancy to the page. Using Figma, I created a low-fidelity design before transitioning to the coding phase.

#### Coding
- To start off the coding of the project, I first added the stylings that I've made on Figma, as this is easier to work with in my opinion. I started with the navigation bar because I want to navigate between pages first before adding my components in. Secondly, I decided to choose react-routing for navigating through the pages. I made a header and a footer which is with the outlet as these two are static on every page. After I added all the pages to and which component to render into the routes, I went ahead and started making the authorization of the websites, which is the register and the login. At first, I set up a dot.env file to store my authorization code and the URL.

#### Registration and Login
- I implemented user registration and login functionalities by sending requests to the Noroff API's registration endpoints (auction/auth/register and auction/auth/login). These endpoints enable users to sign up for a new profile and log in. I included essential details in the requests, such as the name (excluding certain symbols), a valid stud.noroff.no or noroff.no email address, and a password. The registration process involved creating a payload with the necessary information from the registration form, submitting it via a POST request, and ensuring the user data aligns with specified criteria. Following registration, the page seamlessly transitions to the login section, allowing users to log in and access the website.

#### Home Page
- On the homepage, I created a hero section with details about BidBuddies and a button to go to the auction page. The homepage also displays a list of recently added items by users and those with the most bids. To help users understand the website, I added a simple "How it works" section, explaining the website's functions. This layout is designed to make it easy for users to find information and go to the auction page.

#### Auction Page
- On the auction page, I implemented a fetch request to retrieve all the listings. To maintain a clean layout, I set it to display 12 listings at a time, organized in a grid with one column and three rows for even rendering of cards. Additionally, I added a "Load More" button to fetch additional listings from the Noroff API. Users can easily search through the listings using a search bar and apply sorting options, including sorting by Latest, Oldest, Highest Bids, Lowest Bids, ascending and descending by name, and inactive posts.

- For each listing, users can select it to navigate to a dedicated single listing page. This page provides comprehensive details about the listing, including title, description, bids, and more. Users have the option to place bids on selected listings. Upon making a bid, the user will receive either a success message through an alert if the bidding is successful or an error message detailing the issue if there's an error in the bidding process. This setup ensures a user-friendly experience on the auction page, allowing easy navigation, sorting, and interaction with individual listings.

#### Creating a List
- The "Create a Listing" page facilitates the submission of a new listing through a post request with the required payload, including a title, description, end date, media (image), and tags. If all these criteria are met, the creation of the new listing is successful, and the user receives a success alert. In case of any issues, an error alert informs the user about the problem. The newly created listings are displayed under the "Create Listings" section and are saved to local storage. This ensures that the user's listings persist even when they log in again. Additionally, the listings of users are stored in local storage upon logging in for seamless retrieval.

#### Profile Page
- On the Profile page, I implemented a PUT request to enable users to change their profile image. Users can click on the "Change Avatar" option, where they can input a new image URL of their choice. After entering the new image URL, users are prompted with options to confirm the change by clicking "Yes, I'm sure" or canceling the process by clicking "No, cancel." This straightforward interaction allows users to easily update their profile image with a few clicks.

#### SignOut 
- When a user initiates the sign-out process, all their information is removed from the system. This ensures a clean and secure sign-out experience, where the user's data and session details are effectively cleared, maintaining privacy and security.

#### E2E Testing With Cypress
In this project, comprehensive end-to-end (E2E) testing has been incorporated using Cypress. The E2E tests cover essential user journeys to ensure the functionality and integrity of the system. Specifically, the following scenarios have been tested:

#### Login User Journey:
- E2E tests have been written to validate the entire user journey for login. This includes verifying the successful login process and handling potential error scenarios.
#### Non-Registered Users Searching Through Listings:
- E2E tests are in place to simulate and validate the experience of non-registered users searching through listings. This ensures that the search functionality is effective and user-friendly.
#### Registered Users Adding Bids to Another User's Listing:
- E2E tests cover the scenario where registered users add bids to listings created by other users. This verifies the proper functioning of the bidding process and associated user interactions.

### Opinion of the project 
In retrospect, I believe this project was a valuable learning experience and has significantly contributed to my knowledge. The five-week timeframe was appropriate, allowing a balance between the project's scope and the time available. I feel adequately prepared for this project, thanks to the classroom instruction and effective guidance from the teacher.

While the overall experience was positive, I encountered challenges, particularly in the planning and design phases. Planning the project and designing components were areas where I faced difficulties, and I recognize these as areas for potential improvement in my skill set. Nonetheless, the challenges presented opportunities for growth, and I intend to carry the lessons learned from this project into future endeavors. Overall, the project was a constructive learning journey, and I look forward to applying this experience in future projects.

