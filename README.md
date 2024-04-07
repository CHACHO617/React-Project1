# Web Engeneering - CRUD & Login

## Description
This project presents the first steps of a system. In these first steps that have been taken the user will be able to register into the system, login and only once they've logged in they'll be able to Create, Read, Update and Delete users that have been created. 

### Index
1. [Introduction](#introduction)
   - [Technologies Used](##technologies-used)
   - [Packages](#packages)
   - [How to Run the Project](#how-to-run-the-project)
   - [How to Use the Project](#how-to-use-the-project)
  
2. [Version 1: CRUD](#version-1-crud)

3. [Version 2: Register and Login](#version-2-register-and-login)


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

2.Then you will need to create a database in SQL, mine is called "IngWebProject" and create a table called Usuarios that will have the following information: 
- CorreoUsuario
- NombreUsuario
- ApelllidoUsuario
- ContrasenaUsuario

3. Once the database is created link it to the project and then run it

#### How to use the project
In order to use the project you must login to the system or register an account. Once logged into the system you will be able to Create, Read, Update and Deleate users information in the CRUD Table thats shown. 

## Version 1: CRUD
In this version 
