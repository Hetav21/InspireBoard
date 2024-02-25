# **Routes:** 

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
x. **RETURN**: JSON { pinUpload, inputError?, dbError,pinId?, url?, title?, about?, createdAt? }

OP. Redirects to /pin/:pinId
TODO. Adding Schema for Category and Code for each category
TODO. Upload functionality for urls

### /pin/:pinId _GET_
1. **INPUT**: URL Param: postId
            : Header: Authorization: JWT Token
2. Shows a particular pin after getting pinId
x. **RETURN**: JSON { pinFound, pin?:{postId, title, about, url, category, createdAt, userId }, !pinExists?, invalidPinId? }

### /explore _GET_
1. **INPUT**: Header: Authorization: JWT Token
2. Sorts the pins by creation time and returns array of pins
x. **RETURN** JSON { pin[] }

### /profile/:userId
1. Profile page with boards

### /feed/:boardId
1. feed page with all different pins

### /save/:pinId&&:boardId
1. save a particular pin to a board

### /delete/:pinId&&:boardId
1. deletes a particular pin from a board


### edit