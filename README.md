# Web Engeneering - CRUD & Login

## Description
This project presents the first steps of a system. In these first steps that have been taken the user will be able to register into the system, login and only once they've logged in they'll be able to Create, Read, Update and Delete users that have been created. 

### Index
1. [Introduction](https://github.com/CHACHO617/React-Project1/blob/main/README.md#introduction)
   - [Technologies Used](https://github.com/CHACHO617/React-Project1/blob/main/README.md#technologies-being-used)
   - [Packages](https://github.com/CHACHO617/React-Project1/blob/main/README.md#packages))
   - [How to Run the Project](https://github.com/CHACHO617/React-Project1/blob/main/README.md#how-to-run-the-project)
   - [How to Use the Project](https://github.com/CHACHO617/React-Project1/blob/main/README.md#how-to-use-the-project)
  
2. [Version 1: CRUD](https://github.com/CHACHO617/React-Project1/blob/main/README.md#version-1-crud)

3. [Version 2: Register and Login](https://github.com/CHACHO617/React-Project1/blob/main/README.md#version-2-login)


## Introduction

### Technologies being used
This is a web MVC project that will use React for the front-end and Dotnet for backend. 
- React version used: "18.2.0"
- React-Dom version used: "18.2.0"
- Dotnet version used: "6.0.28" (LTS)

### Packages
- Microsoft.AspNetCore.Authentication.JwtBearer - version "6.0.28"
- Microsoft.AspNetCore.SpaProxy - version "6.0.28"
- Microsoft.EntityFrameworkCore.SqlServer - version "6.0.28"
- Microsoft.EntityFrameworkCore.Tools - version "6.0.28"

### How to run the project
1. In order to run this project you will need to install the versions of the technologies mentioned above (React "18.2.0" & DotNet "6.0.28").

2. Then you will need to create a database in SQL, mine is called "IngWebProject" and create a table called Usuarios that will have the following information: 
- CorreoUsuario
- NombreUsuario
- ApelllidoUsuario
- ContrasenaUsuario

3. Once the database is created link it to the project and then run it

### How to use the project
In order to use the project you must login to the system or register an account. Once logged into the system you will be able to Create, Read, Update and Deleate users information in the CRUD Table thats shown. 

## Version 1: CRUD
In this version of the project the CRUD operations of the project were implemented, allowing anyone that runs the project to perform any CRUD operation. Here simple actions were performed in a successfull way

![CRUD Image](https://miro.medium.com/v2/resize:fit:1400/1*WxJYUNOWcV1ZDPjiwEfBbA.jpeg)




## Version 2: Login: 
In this version a Login feature was implemented using JWT security tokens which are generated only if the user has an account. This token allows the user to perform CRUD operations only once it has logged in, taking into account securty measures taken  that dont allow any user to access the crud, only logged in users will have a token and this token is used in order to be authorized to perform crud operations. 

