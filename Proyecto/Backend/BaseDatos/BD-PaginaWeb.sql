CREATE DATABASE Pagina_Web;
USE Pagina_Web;

CREATE TABLE privilegios (idPrivilegio INT PRIMARY KEY, ver VARCHAR(50), editar VARCHAR(50), eliminar VARCHAR(50), 
agregar VARCHAR (50));

CREATE TABLE categoria (idCategoria INT PRIMARY KEY, nombreCategoria VARCHAR(50), descripcion VARCHAR(50));

CREATE TABLE producto(idProducto INT,idCategoria INT, nombre VARCHAR(50), tipo VARCHAR(50), costo INT, foto varchar(50),
estado VARCHAR(50), descripcion VARCHAR(50), descuento INT,
primary key (idProducto, idCategoria),
FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria));

CREATE TABLE rol(idRol INT,idPrivilegio INT,nombreRol VARCHAR(50), estado VARCHAR(50),
primary key (idRol,idPrivilegio),
FOREIGN KEY (idPrivilegio) REFERENCES privilegios(idPrivilegio));

CREATE TABLE usuario(idUsuario INT,idRol INT, nombre VARCHAR(50), apellido VARCHAR(50), email VARCHAR (50), direccion VARCHAR(50),
departamento VARCHAR(50), contrasenia VARCHAR(50), estado VARCHAR(50), telefono INT,
primary key (idUsuario, idRol),
FOREIGN KEY (idRol) REFERENCES rol(idRol));



