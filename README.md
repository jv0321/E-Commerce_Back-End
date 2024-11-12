# E-Commerce Backend

A straightforward backend application for managing an e-commerce database. This project allows users to interact with products, categories, and tags by using HTTP routes and JSON data through Insomnia. The application is built with Node.js, PostgreSQL, and additional dependencies to facilitate seamless database management.

---

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)

---

## Overview

This backend application serves as a tool for managing e-commerce data, allowing users to:

- View, add, update, and delete products.
- Manage categories and tags with full CRUD functionality.
- Utilize Insomnia for constructing and testing HTTP requests.

---

## Usage

To get started, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/jv0321/E-Commerce_Back-End.git

## Navigate to the project directory:
```bash
Copy code
cd E-Commerce_Back-End


## Install dependencies:
```bash
Copy code
npm install


Set up the environment variables:
## Create a .env file in the root directory and add your PostgreSQL credentials:
makefile
Copy code
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password


Initialize the database:
## Access PostgreSQL through your terminal and execute the schema file:
```bash
Copy code
\i ./db/schema.sql


Exit PostgreSQL once done.
## Seed the database:
```bash
Copy code
npm run seed


## Start the application:
```bash
Copy code
npm run dev


Use Insomnia or a similar API client to test HTTP requests for managing products, categories, and tags:
Use the provided Body tab in Insomnia and select "JSON" to send data.

## Usage
JD Tadlock: For guidance and support during the Rutgers coding bootcamp.
