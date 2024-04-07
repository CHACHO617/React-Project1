# Web Engeneering - CRUD & Login

## Description
This project marks the initial phase of system development, offering users the essential functionalities to engage with the platform effectively. Within this foundational stage, users can seamlessly register, log in, and gain access to comprehensive user management features. Once authenticated, users can perform essential CRUD (Create, Read, Update, Delete) operations on user data, ensuring a seamless and efficient user experience.

### Index
1. [Introduction](https://github.com/CHACHO617/React-Project1/blob/main/README.md#introduction)
   - [Technologies Used](https://github.com/CHACHO617/React-Project1/blob/main/README.md#technologies-being-used)
   - [Packages](https://github.com/CHACHO617/React-Project1/blob/main/README.md#packages)
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
1. To run this project successfully, ensure you have the specified versions of the required technologies installed: React "18.2.0" and DotNet "6.0.28".

2. Next, you'll need to set up a SQL database. In my configuration, I've named it "IngWebProject." Within this database, create a table named "Usuarios" to store the necessary user information.
- CorreoUsuario
- NombreUsuario
- ApelllidoUsuario
- ContrasenaUsuario

3. After creating the database, you need to establish a connection between the database and the project by configuring the database settings in the project's configuration files. Once the database is linked to the project, you can proceed to run it.

### How to use the project
In order to use the project you must login to the system or register an account. Once logged into the system you will be able to Create, Read, Update and Deleate users information in the CRUD Table thats shown. 

## Version 1: CRUD
In this version of the project, the CRUD operations have been fully implemented, enabling users to execute any CRUD operation seamlessly. Here, basic actions were executed successfully, ensuring smooth data manipulation within the system.

![CRUD Image](https://miro.medium.com/v2/resize:fit:1400/1*WxJYUNOWcV1ZDPjiwEfBbA.jpeg)

---

## Version 2: Login
In this version, a robust login feature has been incorporated, leveraging JWT security tokens that are exclusively generated for authenticated users. These tokens grant access to CRUD operations, ensuring that only authorized users can manipulate data within the system. By implementing stringent security measures, the system restricts access to CRUD functionalities solely to logged-in users with valid tokens, thus fortifying the overall security framework.

---
