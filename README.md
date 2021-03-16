# TunePik

A Social Networking Web App Using Voice Notes To Post, Comment & Reply To Your Followers And Communities


## Contents

- Installing
- Architecture
- Server
	- API Routes
	- Controllers
	- Models
- Front-End


## Architecture

**Tunepik** Follows a Three-Tier Architecture At Its Core

### Database

*MySQL* database

### RESTFUL API

*PHP, Laravel*

### Front-End

*Vuejs, SCSS*


## Install

### After Cloning The Repository

- Run The Following To Install NPM packages in package.json

```
npm install
```

- Also Run To Install Composer packages in composer.json

```
composer install
```

- In Your MySQL Database/PhpMyAdmin import **tunepikDB.sql**, This Works As A Database Seeder


## Server

- To Start The Laravel Built-in Server, Command
```
php artisan serve
```
or

If You Want The To Access The Site Via Your LAN/WI-FI
```
php artisan serve --host 0.0.0.0
```

- ***RESTFUL API Routes***

 - Every API route has to be registered explicitly in [routes/api.php](https://github.com/MaddoxMaila/tunepik-app/routes/)


- ***Controller***

 - API Routes use methods defined explicitly in [app/http/controllers](https://github.com/MaddoxMaila/tunepik-app/app/http/controllers)

 - For Sessions We're Using Json Web Tokens
   
   *To check if a user is logged in*

   ```php
   if(auth('api')->check()){
   	 /* A User Has Logged In */
   }else{
   	/* No User Has Logged In */
   }

   /* Also You Can Use The AUTH middleware in side the constructor of Controller Classes*/

   function __construct(){

   	$this->middleware('auth');

   }

   ```


## To Be Continued

