# fwd
Frontstore API that allows creating and listing products and orders for multi purpose
# Installation
go to to project directory then open cmd and run
> npm install
install postgresql database engine then go to rename ".env.example" to ".env" file and add  your own database configuration

then run 
> db-migrate up
# Usage
developing mode
> yarn watch
build your application and compile typescript file 
> yarn build
start your project in deployment environment
> yarn start
Open any api testing software like postman and open up "collection.json" which are have all the application endpoints

## Endpoints
* [auth](#auth)
    1. [register](#1-register)
    1. [login](#2-login)
* [products](#products)
    1. [all](#1-all)
    1. [find](#2-find)
    1. [byCategory](#3-bycategory)
    1. [latest](#4-latest)
    1. [create](#5-create)
* [orders](#orders)
    1. [status](#1-status)
    1. [addToCart](#2-addtocart)
    1. [create](#3-create)
    1. [index](#4-index)
    1. [myOrders](#5-myorders)
    1. [myCarts](#6-mycarts)
* [users](#users)
    1. [index](#1-index)
    1. [find](#2-find-1)
--------

## auth

### 1. register

***Endpoint:***
```bash
Method: POST
Type: URLENCODED
URL: localhost:3000/register
```

***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| username | admin |  |
| password | 123123123 |  |
| first_name | first |  |
| last_name | last |  |

### 2. login

***Endpoint:***
```bash
Method: POST
Type: URLENCODED
URL: localhost:3000/login
```

***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| username | admin |  |
| password | 123123123 |  |

## products

### 1. all

***Endpoint:***
```bash
Method: GET
Type: 
URL: localhost:3000/products
```

### 2. find

***Endpoint:***
```bash
Method: GET
Type: 
URL: localhost:3000/products/{id}
```

### 3. byCategory

***Endpoint:***
```bash
Method: GET
Type: 
URL: localhost:3000/products/category/{category}
```

### 4. latest

***Endpoint:***
```bash
Method: GET
Type: 
URL: localhost:3000/products/get/latest/{id}
```

### 5. create

***Endpoint:***
```bash
Method: POST
Type: URLENCODED
URL: localhost:3000/products/create
```

***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| name | product_name |  |
| price | product_price |  |

## orders

### 1. status

***Endpoint:***
```bash
Method: PUT
Type: 
URL: localhost:3000/orders/{orderid}/{order_status}
```

### 2. addToCart

***Endpoint:***
```bash
Method: PUT
Type: URLENCODED
URL: localhost:3000/orders/{id}
```

***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| productid | 1 |  |
| quantity | 1 |  |

### 3. create

***Endpoint:***
```bash
Method: POST
Type: URLENCODED
URL: localhost:3000/orders/create
```

***Body:***

### 4. index

***Endpoint:***
```bash
Method: GET
Type: 
URL: localhost:3000/orders/
```

### 5. myOrders

***Endpoint:***
```bash
Method: GET
Type: 
URL: localhost:3000/orders/current
```

### 6. myCarts

***Endpoint:***
```bash
Method: GET
Type: 
URL: localhost:3000/orders/carts
```

## users

### 1. index

***Endpoint:***
```bash
Method: GET
Type: 
URL: localhost:3000/users
```

### 2. find

***Endpoint:***
```bash
Method: GET
Type: 
URL: localhost:3000/users/1
```

---
[Back to top](#fwd)
