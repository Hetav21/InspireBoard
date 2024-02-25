# **Routes:** 

### /register _POST_
1. **INPUT**: BODY {username, password, email}
2. Input Validation
3. Checks if username and email are taken
4. [TODO] Hash the password given
5. Stores in PostgresQL using Prisma ORM 
x. **RETURN**: JSON { userCreated, idToken? , userExists? ,inputError?, dbError? }  

OP. Redirects to Profile Page

### /login _POST_
1. **INPUT**: BODY {username, password, email}
2. Login using username OR email in username section
3. Checks if username OR email exists
4. Returns user from db
5. [TODO] Compares user from input and db
6. Generates JWT token
x. **RETURN**: JSON {  useLogin, idToken? , !userExists?, inputError?, authError? }  

OP. Redirects to Profile Page

### /upload _POST_
1. **INPUT**: BODY { title, about, url, category }
2. Gets the userId from middleware *Middleware*
3. Create a pin payload with { title, about, url, category, userId }
3. Uploads pin to the db and gets the pinId on completion
x. **RETURN**: JSON { uploadCompleted, pinId?, url?, title?, about?, createdAt? }

OP. Redirects to /pin/:pinId

### /pin/:pinId

### /explore

### /profile
1. Profile page with boards

### /feed/:boardId
1. feed page with all different pins

### /save/:pinId&&:boardId
1. save a particular pin to a board

### /delete/:pinId&&:boardId
1. deletes a particular pin from a board


### edit