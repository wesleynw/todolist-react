# Todo list app with React & MongoDB

Allison Lin, Ishan Monie, Louisa Ng, & Wesley Weisenberger:

> the **splajaumpy flooter sluper wuggy greebles**.

## Goal

The goal of this project is to have a simple todo list built with React, including a working backend, most likely involving an express web server and mongoDB.

The basic functionality will simple let a user enter a todo list item, and view all todo list items in a list, and delete todo list itmes. Users will be able to create an account, login, have their sesssion persisted across browser restarts.

Additional functionality could allow a user to include a due date when appending a Todo list item. The list of items might sort items by this due date.

- allow users to change password
- allow users to delete account

## Frontend Sketch

### Authentication

When a user accesses a website, the browser sends a `GET` request, attaching all cookies that match that site. Given the request and the user's cookies, React will 'authenticate' the user and decide whether to render a login page or the main page, the user's actual Todo list.

Account creation and login will provide a user with a `session-token` cookie. Interally, the backend holds a table of active/unexpired session cookies. React will check for the existence of the cookie, then ask the backend to check its validity.

Additionally, React can access cookies using the [`js-cookie`](https://www.npmjs.com/package/js-cookie) library.

```
...
import axios from 'axios';
import Cookies from 'js-cookie';
...
function verifySession() {
    let session-token = Cookies.get('session-token');
    if (session-token is undefined) {
        return False;
    }

    // verify session-token
    axios.get('/verify-session', {
        headers: {
            token: session-token
        }
    })
    .then(function (response) {
        console.log(response);
        if (response.status == 200) {
            return True;
        }
    })
    .catch(function (error) { // every status not in [200,299]
        return False;
    });
}
```

In our react component:

```
import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
...
export default function App() {
  return(
    <Routes>
        <Route
          path="/"
          element={verifySession()
            ? <Todolist  />
            : <Navigate to="/login" replace={true} />
          }
        />
      </Routes>
  )
}
```

## API/Backend Sketch

General commands:

- create a user account
- authenticate/login a user

User commands:

- fetch todo list items
- append todo list item
- delete todo list item

### More formally:

- `createUser(string username, string password) -> (string session-token)`
  - ensure that username isn't already taken
  - create item in mongoDB collection: username, hashed (+ salted?) password, empty todo list item data structure
  - return a session token.
- `loginUser(string username, string password) -> (string session-token)`
  - hash (+ salt?) password, check for existence of user and matching password in DB
  - in memory, a random UUID serves as the session token, making to the UUID of the user's data in the DB

WIP

## Resources:

[DigitalOcean: How To Add Login Authentication to React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications#step-2-creating-a-token-api)

[Protected Routes and Authentication with React Router](https://ui.dev/react-router-protected-routes-authentication)
