# Todo list app with React & MongoDB

Note: This project was originally for the Full Stack Development class @ UC Berkeley. The project was later rebuilt from scratch by Wesley.

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
            "token" = session-token
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

- `POST /create-user`

  which includes:

  ```
  body = {
      "username" = "...",
      "password" = "..."
  }
  ```

  The response will be in the form:

  ```
  {
      "status" = ..., // 201 created, hopefully
      "session-token" : ...
  }
  ```

  The backend will:

  - ensure that username isn't already taken
  - create item in mongoDB collection: username, hashed (+ salted?) password, empty todo list item data structure
  - map new session token to the id/location of the user's todo list in the DB
  - return the session token

- `POST /login`

  Almost identical to `/create-user`, login is only called when the React application determines that the user doesn't have a valid session token.

- `GET /verify-token`

  which includes:

  ```
  headers = {
      "token" = "..."
  }
  ```

- `GET /todolist`
  Which includes the session token in the request headers, as above.

  The response:

  ```
  {
    "id" = ..., // unique id for each item, use as react key
    "name" = ...,
    "due" = ... // ISO 8601
  }
  ```

- `POST /todoitem`
  with:

  ```
  body = {
    "id" = ...,
    "name" = ...,
    "due" = ... // ISO 8601
  }
  ```

  _Potential Issue:_ MongoDB assigns a random ID to every item, thus we cannot use React to assign IDs for each todo list item. Yet, react requires unique keys for each item in a list. We could consider `POST`ing the new todo item, then fetching the list again, but this could potentially be slow.

  Another solution would be to have React assign an interim, random key to the new item. We could then develop another deterministic way of sorting and displaying the todo list, potentially ranked by due date.

## Resources:

[The Odin Project: Protected routes and navigation](https://www.theodinproject.com/lessons/node-path-react-new-react-router#protected-routes-and-navigation)

[DigitalOcean: How To Add Login Authentication to React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications#step-2-creating-a-token-api)

[DigitalOcean: How To Use JSON Web Tokens (JWTs) in Express.js](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs)

[Protected Routes and Authentication with React Router](https://ui.dev/react-router-protected-routes-authentication)

[Wikipedia: ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)

[Passport.js](https://www.passportjs.org/)

[GitHub: react auth slice example](https://github.com/iammanishshrma/react-protected-routes/blob/master/src/store/slices/auth/authSlice.js)

[StackOverflow: react authentication](https://stackoverflow.com/questions/72371670/how-do-i-setup-a-backend-such-as-node-js-express-with-reactusing-vite-also-how)
