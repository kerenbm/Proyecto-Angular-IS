CREATE DATABASE Pagina_Web;
USE Pagina_Web;

CREATE TABLE privilegios (idPrivilegio INT PRIMARY KEY AUTO_INCREMENT, visualizar BOOLEAN, agregar BOOLEAN, editar BOOLEAN,  eliminar BOOLEAN );

CREATE TABLE categoria (idCategoria INT PRIMARY KEY AUTO_INCREMENT, nombreCategoria VARCHAR(50), descripcion VARCHAR(50));


CREATE TABLE producto(idProducto INT auto_increment,idCategoria INT,nombre VARCHAR(50), costo INT,
estado VARCHAR(50), ubicacion VARCHAR(50), descripcion VARCHAR(50),
primary key (idProducto, idCategoria),
FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria) ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE foto(idFoto int primary key auto_increment, idProducto int, descripcion varchar(150), foreign key (idProducto) references producto(idProducto)    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE rol(idRol INT AUTO_INCREMENT, idPrivilegio INT,nombreRol VARCHAR(50), estado VARCHAR(50),
primary key (idRol),
FOREIGN KEY (idPrivilegio) REFERENCES privilegios(idPrivilegio));

CREATE TABLE usuario(idUsuario INT auto_increment,idRol INT, nombre VARCHAR(50), apellido VARCHAR(50), correo VARCHAR (50), direccion VARCHAR(50),
departamento VARCHAR(50), contrasenia VARCHAR(50), estado VARCHAR(50), telefono varchar(50),
primary key (idUsuario, idRol),
FOREIGN KEY (idRol) REFERENCES rol(idRol));


CREATE TABLE denuncias(	idDenuncia INT auto_increment, idDenunciado INT, nombreDenunciado VARCHAR(50), apellidoDenunciado VARCHAR(50), correoDenunciado VARCHAR(50),
						idDenunciante INT, nombreDenunciante VARCHAR(50), apellidoDenunciante VARCHAR(50), correoDenunciante VARCHAR(50), idProducto INT, nombreProducto VARCHAR(50),
                        opcion VARCHAR(256), razon TEXT, otro TEXT, estado VARCHAR(50) default "pendiente", fecha date,
primary key (idDenuncia));

CREATE TABLE suscripcion(idSuscripcion INT PRIMARY KEY AUTO_INCREMENT, idCategoria INT, idUsuario INT , correoUsuario VARCHAR(50), FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria) ON DELETE CASCADE 
        ON UPDATE CASCADE);

CREATE TABLE calificacion (
    idCalificacion INT auto_increment PRIMARY KEY,
    idProducto INT,
    idUsuario INT,
    calificacion INT,
    FOREIGN KEY (idProducto) REFERENCES producto(idProducto)     ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );

CREATE TABLE listas (idLista INT primary key auto_increment, idUsuario INT, idProducto INT, tipoLista VARCHAR(50),
foreign key (idUsuario) references usuario(idUsuario) ON DELETE CASCADE
    ON UPDATE CASCADE,
foreign key (idProducto) references producto(idProducto) ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE conversacion (
	id INTEGER AUTO_INCREMENT,
    usuario1_id INTEGER,
    usuario2_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(usuario1_id) REFERENCES usuario(idUsuario)
		ON DELETE CASCADE 
        ON UPDATE CASCADE,
    FOREIGN KEY(usuario2_id) REFERENCES usuario(idUsuario)
		ON DELETE CASCADE 
        ON UPDATE CASCADE	
);

CREATE TABLE mensaje(
	id INTEGER AUTO_INCREMENT,
    conversacion_id INTEGER,
    mensaje TEXT,
    emisor_id INTEGER,
    receptor_id INTEGER,
    fecha TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (emisor_id) REFERENCES usuario(idUsuario)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (receptor_id) REFERENCES usuario(idUsuario)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (conversacion_id) REFERENCES conversacion(id)
		ON UPDATE CASCADE
        ON DELETE CASCADE
); 

-----------------------------------------------------------------------
   
insert into privilegios (visualizar, agregar, editar, eliminar) Values
	(1,0,0,0),
    (1,1,1,1);
    
insert into rol (idPrivilegio, nombreRol, estado) values (1,'comprador', 'activo'),(2,'vendedor', 'activo');
insert into rol (idPrivilegio, nombreRol, estado) values (2,'admin', 'activo');
select * from foto;
select * from usuario;
select * from producto;
select * from categoria;
select * from suscripcion;

------------------------------MODIFICACIONES A LAS TABLAS--------------------------------------------
ALTER TABLE usuario MODIFY contrasenia blob;
ALTER TABLE usuario ADD token TEXT;
ALTER TABLE usuario ADD confirmado ENUM('1','0') DEFAULT '0';

ALTER TABLE producto ADD ubicacion VARCHAR(50);
ALTER TABLE producto ADD idCliente int;
Alter TABLE producto ADD contador int DEFAULT 0;
ALTER TABLE producto ADD imagen LONGBLOB;
ALTER TABLE producto MODIFY descripcion TEXT;

ALTER TABLE categoria MODIFY descripcion text;
ALTER TABLE categoria ADD imagen LONGBLOB;

ALTER TABLE foto MODIFY imagen LONGBLOB;
ALTER TABLE foto RENAME COLUMN descripcion TO imagen;


