drop database if exists coworking;
create database coworking;
use coworking;

DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS espacios;
DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS equipamiento;
DROP TABLE IF EXISTS incidencias;


create table usuarios (
id int unsigned primary key auto_increment,
nombre varchar(30)not null,
apellidos varchar(60) not null,
nickname varchar(30)not null unique,
email varchar(30) not null unique,
password varchar(32) not null,
provincia varchar(20) not null,
comunidad varchar(20) not null,
foto varchar(255) default null,
telefono int(9) not null,
create_user timestamp default current_timestamp,
update_user timestamp default current_timestamp on update current_timestamp);


create table espacios (
id int unsigned primary key auto_increment,
nombre varchar(30)not null,
provincia varchar(20) not null,
comunidad varchar(20) not null,
direccion varchar(40) not null,
foto1 varchar(255) default null,
foto2 varchar(255) default null,
foto3 varchar(255) default null,
tipo varchar(20) not null,
precio decimal not null,
data_inicio date not null,
date_fin date not null,
descripcion varchar(255) not null,
propietario_id int unsigned not null,
create_space timestamp default current_timestamp,
update_space timestamp default current_timestamp on update current_timestamp,
constraint fk_espacio_usuario_id foreign key (propietario_id) references usuarios(id));


create table equipamiento (
id int unsigned primary key auto_increment,
espacio_id int unsigned not null,
nombre varchar(20) not null,
cantidad int unsigned not null,
constraint fk_equipamiento_espacio_id foreign key (espacio_id) references espacios(id));

create table reservas (
id int unsigned primary key auto_increment,
fechas_pago date default null,
fecha_inicio date not null,
fecha_fin date not null,
limpieza bool default true,
usuario_id int unsigned not null,
espacio_id int unsigned not null,
constraint fk_reservas_usuarios_id foreign key (usuario_id) references usuarios(id),
constraint fk_reservas_espacios_id foreign key (espacio_id) references espacios(id));


create table incidencias (
id int unsigned primary key auto_increment,
texto varchar(255) default "sin incidencias",
reserva_id int unsigned not null,
constraint fk_incidencias_reservas foreign key (reserva_id) references reservas(id));

create table ratings (
id int unsigned primary key auto_increment,
puntuacion int(5) not null,
comentario varchar(255) default "sin comentario",
usuario_id int unsigned not null,
espacio_id int unsigned not null,
create_rating timestamp default current_timestamp,
update_rating timestamp default current_timestamp on update current_timestamp,
constraint fk_ratings_usuarios_id foreign key (usuario_id) references usuarios(id),
constraint fk_ratings_espacios_id foreign key (espacio_id) references espacios(id));









