# **Routes:** 

TODO. Check for any leaks on Routes
TODO. Structure Application

### /register _POST_
1. **INPUT**: BODY: user {username, password, email}
2. Input Validation
3. Checks if username and email are taken
4. [TODO] Hash the password given
5. Stores in PostgresQL using Prisma ORM 
x. **RETURN**: JSON { userCreated, idToken? , userExists? ,inputError?, dbError? }  

OP. Redirects to Profile Page

### /login _POST_
1. **INPUT**: BODY: login {username, password, email}
2. Login using username OR email in username section
3. Checks if username OR email exists
4. Returns user from db
5. [TODO] Compares user from input and db
6. Generates JWT token
x. **RETURN**: JSON {  useLogin, idToken? , !userExists?, inputError?, authError? }  

OP. Redirects to Profile Page

## *Middleware*: **The following request would be passed though a middleware**
1. **INPUT**: Header: Authorization: JWT Token
x. **RETURN**: userId as hono context variable

### /upload _POST_
1. **INPUT**: BODY: pin { title, about, url, category }
            : Header: Authorization: JWT Token
2. Gets the userId from middleware 
3. Create a pin payload with { title, about, url, category, userId }
3. Uploads pin to the db and gets the pinId on completion
x. **RETURN**: JSON { pinUpload, inputError?, dbError,  Pin? { postId, title, about, url, category, createdAt, userId, isEdited: true } }

OP. Redirects to /pin/:pinId
TODO. Adding Schema for Category and Code for each category
TODO. Upload functionality for urls

### /pin/:pinId _GET_
1. **INPUT**: URL Param: postId
            : Header: Authorization: JWT Token
2. Shows a particular pin after getting pinId
x. **RETURN**: JSON { pinFound, pin?:{postId, title, about, url, category, createdAt, userId, isEdited }, !pinExists?, invalidPinId? }

### /explore/:n _GET_
1. **INPUT**: URL Param: n _OPTIONAL_
            : Header: Authorization: JWT Token
2. Sorts the pins by creation time and returns array of pins for the first n || 100 pins
x. **RETURN** JSON { pin[] }

OP. Showing end of feed when all the pins are exhausted
TODO. Testing the sorting algorithm

### /edit/:pinId _PUT_
1. **INPUT**: URL Param: pinId
            : Header: Authorization: JWT Token
2. Checks if user has access to the pin
3. Lets user edit the pin
4. Changes isEdited to true
5. **RETURN**: JSON { pinEdit, invalidPinId?, invalidPin?, unauthorized?, inputError?, Pin? { postId, title, about, url, category, createdAt, userId, isEdited: true } } 

### /board/ _POST_
1. **INPUT**: BODY: { title } 
            : Header: Authorization: JWT Token
2. creates a new board for user
x. **RETURN**: JSON { boardCreated, inputError?, Board? }

### /feed/:boardId _GET_
1. **INPUT**: URL Params: boardId
            : Header: Authorization: JWT Token
2. Returns all the pins on the board
x. **RETURNS**: JSON { feedFound, inputError?, Pins? }

### /save/:pinId/board/:boardId _PUT_
1. **INPUT**: URL Params: boardId, pinId
            : Header: Authorization: JWT Token
2. save a particular pin to a board
x. **RETURNS**: JSON { pinSaved, inputError?, boardExists?, authError?, pinExists?, Pins? }

### /delete/:pinId/board/:boardId _PUT_
1. **INPUT**: URL Params: boardId, pinId
            : Header: Authorization: JWT Token
2. deletes a particular pin from a board
x. **RETURNS**: JSON { pinDeleted, inputError?, boardExists?, authError?, pinExists?, Pins? }

### /profile/:userId _GET_
1. **INPUT**: URL Params: userId
            : Header: Authorization: JWT Token
2. Profile page with pins and board
x. **RETURNS**: JSON { profileFound, inputError?, userExists?, Content? }

### /profile/ _GET_
1. **INPUT**: Header: Authorization: JWT Token
2. Profile page with pins and board
x. **RETURNS**: JSON { profileFound, inputError?, userExists?, Content? { posts[], boards[] } }