# SayurHub
# Team SayurHub-Backend - E-Commerce Apps

Create a E-Commerce Apps (SayurHub)

Status Code Response
```
200 - OK                      > Call API success
201 - CREATED                 > Post success
202 - ACCEPTED                > Response/Post success
400 - BAD REQUEST             > Error on client side
404 - NOT FOUND               > Req.bodyrequest endpoint not found
409 - CONFLICT                > User not fill the requirement
500 - INTERNAL SERVER ERROR   > Error on server side
```
URL : https://pacific-oasis-23064.herokuapp.com

Image format must be in jpg, jpeg, png, svg.

# RESTful endpoints

## GET ((URL))/ : 
Homepage
```json
Request Header : not needed
```
```json

Request Body: not needed
```
```json

Response: (200 - OK) {
    "message": "This is home page thanks."
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```

## GET ((URL))/user : 
Get All Users
```json
Request Header {
    "token" : "<your token>"
}
```
```json

Request Body: not needed
```
```json

Response: (200 - OK){
  success: true,
	message: "Successfully retrieve the data!",
	data: "<user data>"

}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```

## POST ((URL))/user/register : 
Register User
```json
Request Header : not needed
```
```json
Request Body: {
  "full_name": "<user name>",
  "email": "<user email>",
  "password": "<user password>"
}
```
```json
Response: (201 - Created){
  {
    "success": true,
    "message": "Successfully create a user!",
    "data": {
        "profile_image": "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png",
        "description": "Please fill your description ",
        "transactions": "On progress",
        "_id": "<userId>",
        "full_name": "<user name>",
        "email": "<user email>",
        "password": "<user password>",
        "__v": 0,
        "createdAt": "<user time create>"
    }
  } 
}
```
```json

Response: (500 - Internal Server Error){
  "<Error Message>"
}
```

## POST ((URL))/user/login :
Login User
```json
Request Header : {
 not needed
}
```
```json
Request Body: {
  "email": "<user email>",
  "password": "<user password>"
}
```
```json
Response: (200 - OK){
  success: true,
	message: "Successfully logged in!",
	token: "<your token>"
}
```
```json

Response: (500 - Internal Server Error){
  "success" : false,
  "message" : "Cannot find User or Password"
}
```

## PUT ((URL))/user/edit/:id : 
Edit Users
```json

Request Header : {
  "access_token": "<your access token">
}
```
```json

Request Body: {
  "full_name": "<user name>", 
  "profile_image" : "<user image>",
  "email": "<user email>", 
  "description": "<user password>"
}
```
```json

Response: (200 - OK){
  {
    "success": true,
    "message": "Successfully update a user!",
    "data": {
        "profile_image": "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png",
        "description": "<user description>",
        "transactions": "On progress",
        "_id": "<userId>",
        "full_name": "<user name>",
        "email": "<user email>",
        "password": "<user password>",
        "__v": 0,
        "updatedAt": "<user time update>"
    }
  } 
}
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```
 
## DELETE ((URL))/user/delete/:id : 
Delete Users
```json

Request Header : {
  "token": "<your token">
}
```
```json

Request Body: not needed
```
```json

Response: (200 - OK){
  {
    "success": true,
    "message": "Successfully delete data!",
    "data": {
        "profile_image": "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png",
        "description": "Please fill your description ",
        "transactions": "On progress",
        "_id": "<userId>",
        "full_name": "<user name>",
        "email": "<user email>",
        "password": "<user password>",
        "__v": 0
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```
 
## GetUserId ((URL))/user/id : 
GetUser By Id
```json

Request Header : {
  "token": "<your token">
}
```
```json

Request Body: not needed
```
```json

Response: (200 - OK){
     "data": {
        "profile_image": "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png",
        "description": "Please fill your description ",
        "transactions": "On progress",
        "_id": "5f8ad3f14534ab053414b586",
        "full_name": "julia2",
        "email": "julia123@gmail.com",
        "password": "$2b$10$nsKb5YKYsRiFaPZdNGY6SeXG8USCapztMDsoB4Px260MAsUj9uule",
        "createdAt": "2020-10-17T11:22:25.426Z",
        "updatedAt": "2020-10-17T11:22:25.426Z"
    }
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```

=======================================================================================================
## GET ((URL))/products : 
Get all products
```json
Request Header : not needed
```
```json

Request Body: not needed
```
```json

Response: (200 - OK) {
     "success": true,
    "msg": "Succesfully retrieve all the products!",
    "products": [
        {
            "discount": "<product discount>",
            "_id": "<product id>",
            "product_name": "<product name>",
            "description": "<product description>",
            "category": "<product category>",
            "price": "<product price>",
            "stock": "<product stock>",
            "product_image": "<product image>",
            "weight": "<product weight>",           "createdAt": "<time createdAt>",
            "updatedAt": "<time updatedAt>",
            "__v": 0
        },
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```

## POST ((URL))/products/create : 
Create a product
```json
Request Header {
    "token" : "<your token>"
}
```
```json

Request Body: {
    "product_name": "<product name>",
    "description": "<product description>",
    "category": "<product category>",
    "discount": "<product discount>",
    "price": "<product price>",
    "stock": "<product stock>",
    "weight": "<product weight>",
    "product_image": "<product image>",
}
```
```json

Response: (200 - OK){
   "success": true,
    "msg": "Succesfully retrieve all the products!",
    "products": [
        {
            "discount": "<product discount>",
            "_id": "<product id>",
            "product_name": "<product name>",
            "description": "<product description>",
            "category": "<product category>",
            "price": "<product price>",
            "stock": "<product stock>",
            "weight": "<product weight>",
            "product_image": "<product image>",
            "createdAt": "<time createdAt>",
            "updatedAt": "<time updatedAt>",
            "__v": 0
        },
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```

## PUT ((URL))/products/update/:id : 
Update products
```json
Request Header : {
    "token": "<your token>" 
}
Reques Param : needed
```
```json
Request Body: {
  Request Body: {
    "product_name": "<product name>",
    "description": "<product description>",
    "category": "<product category>",
    "discount": "<product discount>",
    "price": "<product price>",
    "stock": "<product stock>",
    "weight": "<product weight>",
    "product_image": "<product image>"
}
}
```
```json
Response: (201 - Created){
    "success": true,
    "msg": "Succesfully retrieve all the products!",
    "products": [
        {
            "discount": "<product discount>",
            "_id": "<product id>",
            "product_name": "<product name>",
            "description": "<product description>",
            "category": "<product category>",
            "price": "<product price>",
            "stock": "<product stock>",
            "weight": "<product weight>",
            "product_image": "<product image>",
            "createdAt": "<time createdAt>",
            "updatedAt": "<time updatedAt>",
            "__v": 0
        }
}
```
```json

Response: (500 - Internal Server Error){
  "<Error Message>"
}
```

## GET ((URL))/products/:id :
Seacrh product by id
```json
Request Header : not needed
```
```json
Request Body: not needed
```
```json
Request Param : needed
Response: (200 - OK){
   "success": true,
    "msg": "Succesfully retrieve all the products!",
    "products": [
        {
            "discount": "<product discount>",
            "_id": "<product id>",
            "product_name": "<product name>",
            "description": "<product description>",
            "category": "<product category>",
            "price": "<product price>",
            "stock": "<product stock>",
            "weight": "<product weight>",
            "product_image": "<product image>",
            "createdAt": "<time createdAt>",
            "updatedAt": "<time updatedAt>",
            "__v": 0
        }
}
```
```json

Response: (500 - Internal Server Error){
  "success" : false,
  "message" : "Cannot find User or Password"
}
```

## GET ((URL))/products/find : 
Search products by its name
```json

Request Header : not needed,
```
```json

Request Body: {
  "product_name": "<product name>"
}
```
```json

Response: (200 - OK){
  {
    "success": true,
    "message": "Successfully retrieve all the products that have same name.",
    "data": {
       "discount": "<product discount>",
        "_id": "<product id>",
        "product_name": "<product name>",
        "description": "<product description>",
        "category": "<product category>",
        "price": "<product price>",
        "stock": "<product stock>",
        "weight": "<product weight>",
        "product_image": "<product image>",
        "createdAt": "<time createdAt>",
        "updatedAt": "<time updatedAt>",
        "__v": 0
    }
  } 
}
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```
 
## DELETE ((URL))product/delete/:id : 
Delete products
```json

Request Header : {
  "token": "<your token">
}
```
```json

Request Body: not needed
```
```json
Request Param : needed
Response: (200 - OK){
  {
    "success": true,
    "message": "Successfully delete data!",
    "data": {
        "discount": "<product discount>",
        "_id": "<product id>",
        "product_name": "<product name>",
        "description": "<product description>",
        "category": "<product category>",
        "price": "<product price>",
        "stock": "<product stock>",
        "weight": "<product weight>",
        "product_image": "<product image>",
        "createdAt": "<time createdAt>",
        "updatedAt": "<time updatedAt>",
        "__v": 0
    }
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```
=======================================================================================================
## GET ((URL))/transactions/all : 
Get all transactions
```json

Request Header : {
    "token": "<your token>" 
}
```
```json

Request Body: not needed,
```
```json

Response: (200 - OK) {
  {
    "success": true,
    "message": "There is all the transaction data!",
    "data": [
        {
            "count": 10000,
            "user": "5f8f144c2f8df940c8f963f2",
            "_id": "5f8f24316aa1b340d0a6504a",
            "products": "Kiwi",
            "status": "Success",
            "deliveries": "POS Indonesia",
            "createdAt": "2020-10-20T17:53:53.971Z",
            "updatedAt": "2020-10-20T17:53:53.971Z"
        }
  }
},
```
```json

Response: (500 - Internal Server Error){
  "<Error Message>"
}
```
## POST ((URL))/transactions/add : 
Create a transaction
```json
Request Header {
    "token" : "<your token>"
}
```
```json

Request Body: {
    "products": "<product name>",
    "count": "<transaction count>",
    "status": "<transaction status>",
    "deliveries": "<transaction delivery>",
}
```
```json

Response: (201 - Created){
    "success": true,
    "msg": "Successfully created transaction!",
    "transaction": {
        "count": 150000,
        "user": "5f8f144c2f8df940c8f963f2",
        "_id": "5f8f39458ba61b2910ec404c",
        "products": "Kiwi, Nangka, Tomat, Jeruk Bali, Semangka",
        "status": "Success",
        "deliveries": "POS Indonesia",
        "createdAt": "2020-10-20T19:23:49.166Z",
        "updatedAt": "2020-10-20T19:23:49.166Z"
    }
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```

## PUT ((URL))/transactions/update/:id : 
Update status a transaction
```json
Request Header : {
    "token": "<your token>" 
}
Reques Param : needed
```
```json
Request Body: {
    "products": "<product name>",
    "count": "<transaction count>",
    "status": "<transaction status>",
    "deliveries": "<transaction delivery>",
}
```
```json
Response: (200 - OK){
    "success": true,
    "message": "Successfully update a transaction!",
    "data": {
        "count": 10000,
        "user": "5f8f144c2f8df940c8f963f2",
        "_id": "5f8f24316aa1b340d0a6504a",
        "products": "Kiwi, Nangka, Tomat, Jeruk Bali",
        "status": "Pending",
        "deliveries": "TIKI",
        "createdAt": "2020-10-20T17:53:53.971Z",
        "updatedAt": "2020-10-20T19:38:27.075Z"
    }
}
```
```json

Response: (500 - Internal Server Error){
  "<Error Message>"
}
```

## GET ((URL))/transactions/find/:id : 
Search transactions by id
```json

Request Header : {
    "token": "<your token>" 
}
```
```json

Request Body: not needed,
```
```json

Response: (200 - OK) {
    "data": {
        "count": 10000,
        "user": "5f8f144c2f8df940c8f963f2",
        "_id": "5f8f24316aa1b340d0a6504a",
        "products": "Kiwi, Nangka, Tomat, Jeruk Bali",
        "status": "Pending",
        "deliveries": "TIKI",
        "createdAt": "2020-10-20T17:53:53.971Z",
        "updatedAt": "2020-10-20T19:38:27.075Z"
    }
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```
 
## DELETE ((URL))transactions/delete/:id : 
Delete transaction
```json

Request Header : {
  "token": "<your token>"
}
```
```json

Request Body: not needed
```
```json
Request Param : needed
Response: (200 - OK){
    "success": true,
    "message": "Successfully delete transaction data!",
    "data": {
        "count": 10000,
        "user": "5f8f144c2f8df940c8f963f2",
        "_id": "5f8f24316aa1b340d0a6504a",
        "products": "Kiwi, Nangka, Tomat, Jeruk Bali",
        "status": "Pending",
        "deliveries": "TIKI",
        "createdAt": "2020-10-20T17:53:53.971Z",
        "updatedAt": "2020-10-20T19:38:27.075Z"
    }
}
```
```json
Response: (500 - Internal Server Error){
  "<Error Message>"
}
```