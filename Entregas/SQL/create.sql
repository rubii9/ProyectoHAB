drop database if exists coworking;
create database coworking;
use coworking;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS spaces;
DROP TABLE IF EXISTS reserves;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS incidents;


create table users (
id int unsigned primary key auto_increment,
name varchar(100)not null,
nickname varchar(30)not null unique,
email varchar(60) not null unique,
password varchar(255) not null,
city varchar(50) default null,
community varchar(50) default null,
avatar varchar(255) default null,
phone varchar(15) default null,
is_owner bool default false,
role enum("normal","admin") default "normal" not null,
active bool default false not null,
registrartionCode varchar(255),
lastPasswordUpdate timestamp default current_timestamp not null,
create_user timestamp default current_timestamp,
update_user timestamp default current_timestamp on update current_timestamp);


create table spaces (
id int unsigned primary key auto_increment,
name varchar(30)not null,
city varchar(60) not null,
community varchar(60) not null,
adress varchar(255) not null,
photo1 varchar(255) default null,
photo2 varchar(255) default null,
photo3 varchar(255) default null,
type varchar(40) not null,
price decimal not null,
description text not null,
owner_id int unsigned not null,
create_space timestamp default current_timestamp,
update_space timestamp default current_timestamp on update current_timestamp,
constraint fk_spaces_users_id foreign key (owner_id) references users(id)) ;


create table equipment (
id int unsigned primary key auto_increment,
space_id int unsigned not null,
name varchar(30) not null,
number int unsigned not null,
constraint fk_equipments_spaces_id foreign key (space_id) references spaces(id));

create table reserves (
id int unsigned primary key auto_increment,
payment_date date default null,
start_date date not null,
end_date date not null,
is_paid bool default false not null,
is_clean bool default true not null,
is_confirmed bool default false not null,
confirmationCode varchar(255),
paymentCode varchar(255),
user_id int unsigned not null,
space_id int unsigned not null ,
constraint fk_reserves_users_id foreign key (user_id) references users(id) ,
constraint fk_reserves_spaces_id foreign key (space_id) references spaces(id));


create table incidents (
id int unsigned primary key auto_increment,
comment text default null,
state enum ("abierta","cerrada") default "abierta",
reserve_id int unsigned not null,
create_incident timestamp default current_timestamp,
update_incident timestamp default current_timestamp on update current_timestamp,
constraint fk_incidents_reserves foreign key (reserve_id) references reserves(id));

create table ratings (
id int unsigned primary key auto_increment,
score int(5) not null,
comment text default null,
user_id int unsigned not null ,
space_id int unsigned not null,
create_rating timestamp default current_timestamp,
update_rating timestamp default current_timestamp on update current_timestamp,
constraint fk_ratings_users_id foreign key (user_id) references users(id) ,
constraint fk_ratings_spaces_id foreign key (space_id) references spaces(id)) ;









