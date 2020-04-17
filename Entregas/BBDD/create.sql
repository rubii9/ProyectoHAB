drop database if exists coworking;
create database coworking;
use coworking;

DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS space;
DROP TABLE IF EXISTS reserve;
DROP TABLE IF EXISTS rating;


create table user (
id int primary key auto_increment,
name varchar(30)not null,
surname varchar(60) not null,
email varchar(30) not null unique,
password varchar(32) not null,
location varchar(20) not null,
photo varchar(255) default "sin imagen",
telefono int(9) not null,
create_user timestamp default current_timestamp,
update_user timestamp default current_timestamp on update current_timestamp);


create table space (
id int primary key auto_increment,
name varchar(30)not null,
location varchar(20) not null,
photo varchar(255) default "sin imagen",
type varchar(20) not null,
date_start date not null,
date_end date not null,
description varchar(255) not null,
equipment varchar(255) not null,
owner_id int not null,
create_space timestamp default current_timestamp,
update_space timestamp default current_timestamp on update current_timestamp,
constraint fk_space_user_id foreign key (owner_id) references user(id));


create table reserve (
id int primary key auto_increment,
incidences varchar(255) default "sin incidencias",
payment_date date default null,
reserve_start date not null,
reserve_end date not null,
isclean bool default true,
user_id int not null,
space_id int not null,
create_reserve timestamp default current_timestamp,
update_reserve timestamp default current_timestamp on update current_timestamp,
constraint fk_reserve_user_id foreign key (user_id) references user(id),
constraint fk_reserve_space_id foreign key (space_id) references space(id));


create table rating (
id int primary key auto_increment,
rate int(5) not null,
comment varchar(255) default null,
user_id int not null,
space_id int not null,
create_rating timestamp default current_timestamp,
update_rating timestamp default current_timestamp on update current_timestamp,
constraint fk_rating_user_id foreign key (user_id) references user(id),
constraint fk_rating_space_id foreign key (space_id) references space(id));









