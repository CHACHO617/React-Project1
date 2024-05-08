# Web Engeneering - CRUD & Login

## Description
This project marks the initial phase of system development, offering users the essential functionalities to engage with the platform effectively. Within this foundational stage, users can seamlessly register, log in, and gain access to comprehensive user management features. Once authenticated, users can perform essential CRUD (Create, Read, Update, Delete) operations on user data, ensuring a seamless and efficient user experience.

---

### Index
1. [Introduction](https://github.com/CHACHO617/React-Project1/blob/main/README.md#introduction)
   - [Technologies Used](https://github.com/CHACHO617/React-Project1/blob/main/README.md#technologies-being-used)
   - [Packages](https://github.com/CHACHO617/React-Project1/blob/main/README.md#packages)
   - [How to Run the Project](https://github.com/CHACHO617/React-Project1/blob/main/README.md#how-to-run-the-project)
   - [How to Use the Project](https://github.com/CHACHO617/React-Project1/blob/main/README.md#how-to-use-the-project)
  
2. [Version 1: CRUD](https://github.com/CHACHO617/React-Project1/blob/main/README.md#version-1-crud)

3. [Version 2: Login](https://github.com/CHACHO617/React-Project1/blob/main/README.md#version-2-login)
   
4. [Version 3: Admin](https://github.com/CHACHO617/React-Project1/blob/main/README.md#version-3-admin)

---

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

---

## Version 1: CRUD
In this version of the project, the CRUD operations have been fully implemented, enabling users to execute any CRUD operation seamlessly. Here, basic actions were executed successfully, ensuring smooth data manipulation within the system.

![CRUD Image](https://miro.medium.com/v2/resize:fit:1400/1*WxJYUNOWcV1ZDPjiwEfBbA.jpeg)

---

## Version 2: Login
In this version, a robust login feature has been incorporated, leveraging JWT security tokens that are exclusively generated for authenticated users. These tokens grant access to CRUD operations, ensuring that only authorized users can manipulate data within the system. By implementing stringent security measures, the system restricts access to CRUD functionalities solely to logged-in users with valid tokens, thus fortifying the overall security framework.

![Login Image](https://i.ibb.co/sP0WndJ/Frame-1171275405.png)

---
## Version 3: Admin
In this latest version, two admin users have been introduced, responsible for managing system information. Upon logging in, the admin receives a unique security token (JWT) to carry out their tasks securely. Their tasks involve CRUD operations across various tables, with built-in validations to maintain data integrity.
### Usuarios CRUD:
Here, the admin possesses the ability to create, read, update, and delete user profiles within the system. It's important to note that the admin role is restricted from altering information related to other admin accounts.
Several validations have been implemented to ensure data accuracy and security:
- Correo: This field undergoes validation to ensure the use of a valid email format and that no duplicate email addresses exist in the system. Each email can only be registered once.
- Nombre: The validation process ensures that the name field cannot be left empty and that it contains at least one capital letter, one lowercase letter, and is a minimum of three characters long.
- Apellido: Similar to the name validation, the surname field must not be empty, must include at least one capital letter, one lowercase letter, and be at least three characters in length.
- Contraseña: Passwords undergo validation to guarantee they contain at least one capital letter, one lowercase letter, one number, one special character, and at least a minimun length of 8 characters long. This ensures password strength and enhances system security.

### Inventario 1 CRUD:
In this scenario, the admin has the capability to manage ingredients within Inventory 1, encompassing the tasks of creating, reading, updating, and deleting them. It's important to note that once an ingredient is created, its name and unit remain fixed, with only the amount being editable during updates.
Several validations have been implemented to ensure data accuracy and adherence to predefined criteria:
- Ingredient Name: Validation ensures that this field cannot remain empty, thus requiring each ingredient to have a name.
- Ingredient Amount: It's validated that the amount cannot be negative; it may be zero, but not less than that.
- Ingredient Unit: A selection mechanism is utilized to limit the available units for each ingredient to three options (Unidades, Gramos, Rodajas). This ensures consistency and simplifies management.

### Inventario 2 CRUD:
In this scenario, the admin has the capability to manage ingredients within Inventory 2, encompassing the tasks of creating, reading, updating, and deleting them. It's important to note that once an ingredient is created, its name and unit remain fixed, with only the amount being editable during updates.
Several validations have been implemented to ensure data accuracy and adherence to predefined criteria:
- Ingredient Name: Validation ensures that this field cannot remain empty, thus requiring each ingredient to have a name.
- Ingredient Amount: It's validated that the amount cannot be negative; it may be zero, but not less than that.
- Ingredient Unit: A selection mechanism is utilized to limit the available units for each ingredient to three options (Unidades, Gramos, Rodajas). This ensures consistency and simplifies management.

![Admin Image](https://i.ibb.co/yy9vsZ2/Frame-1171275414.png)

