require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('./db');

const args = process.argv;

const addData = args[2] === '--data';

async function main() {
  // Get reference to db
  const connection = await getConnection();

  console.log('Dropping tables...');
  await connection.query('DROP TABLE IF EXISTS incidents');
  await connection.query('DROP TABLE IF EXISTS equipment');
  await connection.query('DROP TABLE IF EXISTS reserves');
  await connection.query('DROP TABLE IF EXISTS ratings');
  await connection.query('DROP TABLE IF EXISTS spaces');
  await connection.query('DROP TABLE IF EXISTS users');

  console.log('Creating new tables...');

  await connection.query(`
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
      registrationCode varchar(255),
      lastPasswordUpdate datetime not null,
      create_user timestamp default current_timestamp,
      update_user timestamp default current_timestamp on update current_timestamp);
   `);

  await connection.query(`
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
   `);

  await connection.query(`
   create table equipment (
      id int unsigned primary key auto_increment,
      space_id int unsigned not null,
      name varchar(30) not null,
      number int unsigned not null,
      constraint fk_equipments_spaces_id foreign key (space_id) references spaces(id));
   `);

  await connection.query(`
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
   `);

  await connection.query(`
   create table incidents (
      id int unsigned primary key auto_increment,
      comment text default null,
      state enum ("abierta","cerrada") default "abierta",
      reserve_id int unsigned not null,
      create_incident timestamp default current_timestamp,
      update_incident timestamp default current_timestamp on update current_timestamp,
      constraint fk_incidents_reserves foreign key (reserve_id) references reserves(id));
   `);

  await connection.query(`
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
   `);

  // Create initial user
  const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

  await connection.query(`
        INSERT INTO users(lastPasswordUpdate, email, password, role, name, active,nickname,city,community,phone)
        VALUES( UTC_TIMESTAMP, "rubenpo167@gmail.com", "${password}", "admin", "Rubén Pérez", true,"rubii9","Noia","Galicia","639063381")
      `);

  if (addData) {
    console.log('Adding initial data...');

    const passwordRandomUsers = await bcrypt.hash('123456', 10);

    await connection.query(`
      insert into users (id, name, nickname, email, password, city, community, phone,is_owner,active,lastPasswordUpdate) values 
      (2, 'Uriel Hellsdon', 'uhellsdon1', 'uhellsdon1@toplist.cz', '${passwordRandomUsers}', 'Telde', 'Canarias', '6622954423',true,true,NOW()),
      (3, 'Benjamin Mellodey', 'bmellodey2', 'bmellodey2@dmoz.org', '${passwordRandomUsers}', 'Santiago De Compostela', 'Galicia', '7736800054',true,true,NOW()),
      (4, 'Rhiamon Custed', 'rcusted3', 'rcusted3@wufoo.com', '${passwordRandomUsers}', 'Ourense', 'Galicia', '2318408230',true,true,NOW()),
      (5, 'Chrissy Gemlett', 'cgemlett4', 'cgemlett4@amazon.co.jp', '${passwordRandomUsers}', 'Valladolid', 'Castilla - Leon', '1004079953',true,true,NOW()),
      (6, 'Biddie Reddihough', 'breddihough5', 'breddihough5@discuz.net', '${passwordRandomUsers}', 'Palmas De Gran Canaria, Las', 'Canarias', '3716413790',false,true,NOW()),
      (7, 'Hurley Atcheson', 'hatcheson6', 'hatcheson6@smh.com.au', '${passwordRandomUsers}', 'Palma De Mallorca', 'Baleares', '1574598212',false,true,NOW()),
      (8, 'Robbie Fouracre', 'rfouracre7', 'rfouracre7@goo.gl', '${passwordRandomUsers}', 'Palmas De Gran Canaria, Las', 'Canarias', '3224362934',false,true,NOW()),
      (9, 'Bobette Dunaway', 'bdunaway8', 'bdunaway8@shareasale.com', '${passwordRandomUsers}', 'Huesca', 'Aragon', '2804685614',false,true,NOW()),
      (10, 'Carson Killford', 'ckillford9', 'ckillford9@printfriendly.com', '${passwordRandomUsers}', 'Albacete', 'Castilla - La Mancha', '4984652382',false,true,NOW());
      `);

    await connection.query(`
    insert into spaces (id, name, city, community, adress, type, price,  description, owner_id) values
    (1, 'Zamit', 'Palmas De Gran Canaria, Las', 'Canarias', 'Avenida de Las Canteras 43', 'puesto trabajo', 200,  'Este es el espacio de trabajo ideal si estás buscando algo sencillo pero eficiente, ya que tiene todo el material necesario para realizar tu trabajo de forma cómoda. Es una sala amplía en al que hay 10 puestos individuales de trabajo para personas que no quieran reservar una oficina entera', 5),
    (2, 'Blue office', 'Barcelona', 'Cataluña', 'Carrer de la Princesa 7', 'oficina', 2100, 'Un espacio amplio, diáfano y domotizado, inundado por luz natural, con capacidad para 20 puestos de trabajo, con zona de reprografía y zonas de descanso y de reunión de libre uso. Además, es eficiente y sostenible; planteado para mejorar la eficiencia energética y la correcta gestión de residuos. Los puestos de trabajo están equipados con mobiliario ergonómico y de diseño con separaciones independientes y cuidados hasta el último detalle, es el espacio perfecto para un equipo de trabajo.', 2),
    (3, 'La paz', 'Vigo', 'Galicia', 'Av de la Florida 11', 'sala fotografíca', 49.99,  'Esta sala es ideal para realizar sesiones de fotos, o cualquier otro proyecto. Tiene instrumentos necesarios para realizar las mejores imágenes. ', 3),
    (4, 'Meetings', 'Pontevedra', 'Galicia', 'Calle de la Peregrina 5', 'sala', 120,  'Esta espacio es una sala ideal para realizar reuniones,exponer proyectos o realizar eventos de otro tipo. Cuenta con 20 butacas que las podemos colocar en función de su necesidad, ya sea para una reunion(con una mesa central y coladas alredeor las butacas) a una exposición (colocadas por filas para ver la pantalla).', 4);
    `);

    await connection.query(`
    insert into equipment (id, space_id, name, number) values
    (1, 1, 'sillas', 1),
    (2, 1, 'mesas', 1),
    (3, 1, 'monitores', 2),
    (4, 1, 'internet (MB)', 200),
    (5, 1, 'enchufes', 4),

    (6, 2, 'sillas', 20),
    (7, 2, 'mesas', 20),
    (8, 2, 'monitores', 20),
    (9, 2, 'internet (MB)', 200),
    (10, 2, 'impresoras', 2),
    (11, 2, 'taquillas', 20),

    (12, 3, 'sillas', 3),
    (13, 3, 'fondos', 3),
    (14, 3, 'ventanas de luz', 3),
    (15, 3, 'tripodes', 2),
    (16, 3, 'pantallas', 1),
    
    (17, 4, 'butacas', 20),
    (18, 4, 'proyectores', 1),
    (19, 4, 'mesas', 3),
    (20, 4, 'pantallas', 1);
    `);

    await connection.query(`
    insert into ratings (  score, comment,user_id,space_id) values 
    (4, "me gusta la iluminacion",2,1),
    (5, "me gusta encanta",3,1),
    (4, "me gusta mucho este espacio",4,1),
    (1, "no me convence",5,1),

    (1, "no me gusta",2,2),
    (2, "no está mal",3,2),
    (4, "me gusta la oficina",4,2),
    (3, "recomendable",5,2),
    (1, "no es mi estilio",6,2),

    (2, "no me gusta",2,3),
    (4, "no está mal",3,3),
    (5, "me gusta la decoración",4,3),
    (3, "recomendable",5,3),
    (1, "no es mi estilio",6,3),
    
    (4, "me gusta",2,4),
    (4, "no está mal",3,4),
    (4, "butacas muy comodas",4,4),
    (3, "recomendable",5,4),
    (1, "no se ve bien",6,4);
    `);
  }

  console.log('Initial structure created');

  connection.release();
  process.exit();
}

main();
