-- USERS
insert into users (id, name, nickname, email, password, city, community, phone,role,active) values (1, 'Rubén Pérez', 'rubii9', 'rubenpo167@gmail.com', '123456', 'Noia', 'Galicia', '6462487705',"admin",true);
insert into users (id, name, nickname, email, password, city, community, phone,is_owner,active) values (2, 'Uriel Hellsdon', 'uhellsdon1', 'uhellsdon1@toplist.cz', '123456', 'Telde', 'Canarias', '6622954423',true,true);
insert into users (id, name, nickname, email, password, city, community, phone,is_owner,active) values  (3, 'Benjamin Mellodey', 'bmellodey2', 'bmellodey2@dmoz.org', '123456', 'Santiago De Compostela', 'Galicia', '7736800054',true,true);
insert into users (id, name, nickname, email, password, city, community, phone,is_owner,active) values  (4, 'Rhiamon Custed', 'rcusted3', 'rcusted3@wufoo.com', '123456', 'Ourense', 'Galicia', '2318408230',true,true);
insert into users (id, name, nickname, email, password, city, community, phone,is_owner,active) values  (5, 'Chrissy Gemlett', 'cgemlett4', 'cgemlett4@amazon.co.jp', '123456', 'Valladolid', 'Castilla - Leon', '1004079953',true,true);
insert into users (id, name, nickname, email, password, city, community, phone,active) values  (6, 'Biddie Reddihough', 'breddihough5', 'breddihough5@discuz.net', '123456', 'Palmas De Gran Canaria, Las', 'Canarias', '3716413790',true);
insert into users (id, name, nickname, email, password, city, community, phone,active) values  (7, 'Hurley Atcheson', 'hatcheson6', 'hatcheson6@smh.com.au', '123456', 'Palma De Mallorca', 'Baleares', '1574598212',true);
insert into users (id, name, nickname, email, password, city, community, phone,active) values  (8, 'Robbie Fouracre', 'rfouracre7', 'rfouracre7@goo.gl', '123456', 'Palmas De Gran Canaria, Las', 'Canarias', '3224362934',true);
insert into users (id, name, nickname, email, password, city, community, phone,active) values  (9, 'Bobette Dunaway', 'bdunaway8', 'bdunaway8@shareasale.com', '123456', 'Huesca', 'Aragon', '2804685614',true);
insert into users (id, name, nickname, email, password, city, community, phone,active) values  (10, 'Carson Killford', 'ckillford9', 'ckillford9@printfriendly.com', '123456', 'Albacete', 'Castilla - La Mancha', '4984652382',true);


-- SPACES
insert into spaces (id, name, city, community, adress, type, price,  description, owner_id) values(2, 'Blue office', 'Barcelona', 'Cataluña', 'Carrer de la Princesa 7', 'oficina', 2100, 'Un espacio amplio, diáfano y domotizado, inundado por luz natural, con capacidad para 20 puestos de trabajo, con zona de reprografía y zonas de descanso y de reunión de libre uso. Además, es eficiente y sostenible; planteado para mejorar la eficiencia energética y la correcta gestión de residuos. Los puestos de trabajo están equipados con mobiliario ergonómico y de diseño con separaciones independientes y cuidados hasta el último detalle, es el espacio perfecto para un equipo de trabajo.', 2);
insert into spaces (id, name, city, community, adress, type, price,  description, owner_id) values (3, 'La paz', 'Vigo', 'Galicia', 'Av de la Florida 11', 'sala fotografíca', 49.99,  'Esta sala es ideal para realizar sesiones de fotos, o cualquier otro proyecto. Tiene instrumentos necesarios para realizar las mejores imágenes. ', 3);
insert into spaces (id, name, city, community, adress, type, price,  description, owner_id) values (4, 'Meetings', 'Pontevedra', 'Galicia', 'Calle de la Peregrina 5', 'sala', 120,  'Esta espacio es una sala ideal para realizar reuniones,exponer proyectos o realizar eventos de otro tipo. Cuenta con 20 butacas que las podemos colocar en función de su necesidad, ya sea para una reunion(con una mesa central y coladas alredeor las butacas) a una exposición (colocadas por filas para ver la pantalla).', 4);
insert into spaces (id, name, city, community, adress, type, price,  description, owner_id) values (1, 'Zamit', 'Palmas De Gran Canaria, Las', 'Canarias', 'Avenida de Las Canteras 43', 'puesto trabajo', 200,  'Este es el espacio de trabajo ideal si estás buscando algo sencillo pero eficiente, ya que tiene todo el material necesario para realizar tu trabajo de forma cómoda. Es una sala amplía en al que hay 10 puestos individuales de trabajo para personas que no quieran reservar una oficina entera', 5);

-- EQUIPMENT
-- Espacio 1
insert into equipment (id, space_id, name, number) values (1, 1, 'sillas', 1);
insert into equipment (id, space_id, name, number) values (2, 1, 'mesas', 1);
insert into equipment (id, space_id, name, number) values (3, 1, 'monitores', 2);
insert into equipment (id, space_id, name, number) values (4, 1, 'internet (MB)', 200);
insert into equipment (id, space_id, name, number) values (5, 1, 'enchufes', 4);
-- Espacio 2
insert into equipment (id, space_id, name, number) values (6, 2, 'sillas', 20);
insert into equipment (id, space_id, name, number) values (7, 2, 'mesas', 20);
insert into equipment (id, space_id, name, number) values (8, 2, 'monitores', 20);
insert into equipment (id, space_id, name, number) values (9, 2, 'internet (MB)', 200);
insert into equipment (id, space_id, name, number) values (10, 2, 'impresoras', 2);
insert into equipment (id, space_id, name, number) values (11, 2, 'taquillas', 20);

-- Espacio 3
insert into equipment (id, space_id, name, number) values (12, 3, 'sillas', 3);
insert into equipment (id, space_id, name, number) values (13, 3, 'fondos', 3);
insert into equipment (id, space_id, name, number) values (14, 3, 'ventanas de luz', 3);
insert into equipment (id, space_id, name, number) values (15, 3, 'tripodes', 2);
insert into equipment (id, space_id, name, number) values (16, 3, 'pantallas', 1);
-- Espacio 4
insert into equipment (id, space_id, name, number) values(17, 4, 'butacas', 20);
insert into equipment (id, space_id, name, number) values (18, 4, 'proyectores', 1);
insert into equipment (id, space_id, name, number) values(19, 4, 'mesas', 3);
insert into equipment (id, space_id, name, number) values (20, 4, 'pantallas', 1);

-- RATINGS

insert into ratings (  score, comment,user_id,space_id) values (  4, "me gusta la iluminacion",2,1);
insert into ratings (  score, comment,user_id,space_id) values(  5, "me gusta encanta",3,1);
insert into ratings (  score, comment,user_id,space_id) values (  4, "me gusta mucho este espacio",4,1);
insert into ratings (  score, comment,user_id,space_id) values (  1, "no me convence",5,1);


insert into ratings (  score, comment,user_id,space_id) values (  1, "no me gusta",2,2);
insert into ratings (  score, comment,user_id,space_id) values(  2, "no está mal",3,2);
insert into ratings (  score, comment,user_id,space_id) values (  4, "me gusta la oficina",4,2);
insert into ratings (  score, comment,user_id,space_id) values(  3, "recomendable",5,2);
insert into ratings (  score, comment,user_id,space_id) values ( 1, "no es mi estilio",6,2);


insert into ratings (  score, comment,user_id,space_id) values (  2, "no me gusta",2,3);
insert into ratings (  score, comment,user_id,space_id) values(  4, "no está mal",3,3);
insert into ratings (  score, comment,user_id,space_id) values (  5, "me gusta la decoración",4,3);
insert into ratings (  score, comment,user_id,space_id) values(  3, "recomendable",5,3);
insert into ratings (  score, comment,user_id,space_id) values ( 1, "no es mi estilio",6,3);


insert into ratings (  score, comment,user_id,space_id) values (  4, "me gusta",2,4);
insert into ratings (  score, comment,user_id,space_id) values(  4, "no está mal",3,4);
insert into ratings (  score, comment,user_id,space_id) values (  4, "butacas muy comodas",4,4);
insert into ratings (  score, comment,user_id,space_id) values(  3, "recomendable",5,4);
insert into ratings (  score, comment,user_id,space_id) values ( 1, "no se ve bien",6,4);

-- RESERVES
insert into reserves (start_date,end_date,  is_paid,is_clean,user_id,space_id) values ("2020-04-07", "2020-05-07", true, true,4,1);
insert into reserves (start_date,end_date,  is_paid,is_clean,user_id,space_id) values  ("2020-06-07", "2020-08-07",  false, true,2,2);
insert into reserves (start_date,end_date,  is_paid,is_clean,user_id,space_id) values  ( "2020-03-07", "2020-05-01",  false, false,3,3);

-- INCIDENTS
insert into incidents (   comment,reserve_id) values (  "todo correcto",1);
insert into incidents (   comment,reserve_id) values  (  "no funciona enchufe",2);
insert into incidents (   comment,reserve_id) values (  "no funciona lampara",3);
