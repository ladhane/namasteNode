# DevSocial API List

## AuthRouter
- POST /auth/signUp
- POST /auth/login
- POST /auth/logout

## profileRouter
- GET /user/profile/view
- PATCH /user/profile/edit
- PATCH /user/profile/editPassword

## connectionRouter

- GET /connections - To get list of matches
- POST /connection/send/interested/:userId
- POST /connection/send/ignored/:userId
- POST /connection/request/accepted/:requestId
- POST /connection/request/rejected/:requestId

## userRouter
- GET /feed - To get list of user on platform to review 
- GET /requests - To get list of requests send by the user



