<h1>CSE-412 Project 3 Repository</h1>
<h3>How to run</h3>

1. This project relies on node.js, PostgreSQL, and the npm package manager (https://nodejs.org/en). Install node.js before starting
2. In the api folder change the name of .envtemplate to .env and add your PostgreSQL connection string to the database (use the pg-dump provided in the main folder for the tables)
3. In the project there are two main folders, api (express.js) and client (React). You will want to create two different terminal instances for them.
4. CD into the client folder (cd client/) on one and into the api folder (cd api/) in a different one.
5. Run npm install in both terminal instances.
6. Run npm start on both instances and view the page in the browser (currently runs on localhost:3000/).
