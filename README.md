# Todo list app w/ React & MongoDB(?)

## Goal

The goal of this project is to have a simple todo list built with React, including a working backend, most likely involving an express web server and mongoDB.

The basic functionality will simple let a user enter a todo list item, and view all todo list items in a list, and delete todo list itmes. Users will be able to create an account, login, have their sesssion persisted across browser restarts.

Additional functionality could allow a user to include a due date when appending a Todo list item. The list of items might sort items by this due date.

- allow users to change password
- allow users to delete account

## API/Backend Sketch

General commands:

- create a user account
- authenticate/login a user

User commands:

- fetch todo list items
- append todo list item
- delete todo list item

### More formally:

From the React side, each of these will be sent as a `GET` or `POST` request to our express server. Whoever is working on the frontend should be able to ignore the finer points of each function, just letting the function definition serve as an abstraction barrier.

**Note on authentication**: Upon account creation or login/authentication, each user will be given a session token that will only be valid for a certain amount of time. The user will store this session token as a cookie, Node (?) will hold a table in memory that maps each activate session to a user.

AFAIK, when the user's browser makes a `GET` request for the website, all cookies are attached. The React/Node instance will check if the session token exists in memory. If not, the 'landing' is returned, otherwise the todolist of the user, which is queried from the backend, is returned.

- `createUser(string username, string password) -> (string session-token)`
  - ensure that username isn't already taken
  - create item in mongoDB collection: username, hashed (+ salted?) password, empty todo list item data structure
  - return a session token.
- `loginUser(string username, string password) -> (string session-token)`
  - check if ...

WIP

## Resources:

[DigitalOcean: How To Add Login Authentication to React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications#step-2-creating-a-token-api)
