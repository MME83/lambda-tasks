# Task 4

## installing
```
download folder 'task-4' from PR to your PC and install dependencies, rename file '.env-example' to '.env'
+ install dependencies
```
## run the app
```
npm start
```
## run test (check the correct timestamp)
npm run test
```

```
## Working routers (with oauth2/auth), use Bearer tokens in header: key: Authorization, value: Bearer access_token/refresh_token
#### LOGIN | POST, URL:  YOURHOST:PORT/auth/login    
```
body { email: "email@google.com", password: "pass" }
```
#### CREATE NEW USER | POST, URL:  YOURHOST:PORT/users/signup
```
body { email: "email@google.com", password: "pass" }
```
#### GET ALL USERS with access_token | GET, URL: YOURHOST:PORT/users
#### FIND USER BY ID with access_token | GET, URL: YOURHOST:PORT/users/<:user_id>
#### CREATE NEW TOKEN PAIR using refresh_token | POST, URL: YOURHOST:PORT/auth/refresh