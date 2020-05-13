# CONSULTAS

-- Listar todos los espacios disponibles

select s.* from spaces s
left join reserves r
on  s.id=r.space_id
where r.end_date is null and r.start_date is null or r.end_date < now() 
order by s.create_space desc;


-- Realizar consulta para busqueda(nombre,localidad,tipo,equipamiento,fechas)

SELECT id, name, city,description, price,photo1,photo2,photo3
FROM spaces
WHERE name LIKE '%?%';

SELECT id, name, city,description, price,photo1,photo2,photo3
FROM spaces
WHERE city LIKE '%%';

SELECT id, name, city,description, price,photo1,photo2,photo3
FROM spaces
WHERE community LIKE '%?%';

SELECT id, name, city,description, price,photo1,photo2,photo3
FROM spaces
WHERE type LIKE '%?%';

SELECT s.*,eq.name,eq.number FROM spaces s, equipment eq
where s.id=eq.space_id
AND eq.name like '%?%';

select s.*,r.* from spaces s
left join reserves r
on  s.id=r.space_id
where r.end_date is null and r.start_date is null or r.end_date < "2020-08-07";

-- Listar datos usuario

SELECT id,name,nickname,email,city,community,avatar FROM users;


-- Listar un espacio concreto y su info + rating (SPACES (8))

SELECT s.*, avg(r.score)
FROM spaces s
left join ratings r
on s.id=r.space_id
where s.id = ?
group by s.id
ORDER BY create_space DESC;



-- Listar reserva "mi coworking" (incidencias + listar el espacio reservado)

select s.* ,r.*,i.*from reserves r,incidents i, spaces s
where r.id = i.reserve_id and r.space_id = s.id
and user_id = ?;

-- Listar espacios publicados por un usuario concreto

select u.name, s.* from users u,spaces s
where u.id=s.owner_id
and u.id=?;


-- Listar votos de un espacio
select score,comment,user_id,space_id from ratings
where space_id = ?;

-- Listar votos de un usuario
select score,comment,user_id,space_id from ratings
where user_id = ?;

-- Eliminar un usuario 

delete from equipment where space_id = (
 select id from spaces where owner_id = ?);
delete from incidents where reserve_id =
	(select id from reserves where space_id = (
		select id from spaces where owner_id = ?)
        );
delete from reserves where space_id =(
 select id from spaces where owner_id = ?);
delete from ratings where user_id=? ;
delete from ratings where user_id =?;
delete from spaces where owner_id = ?;
delete from users where id = ?;

-- Eliminar un espacio

delete from equipment where space_id = ?;
delete from incidents where reserve_id =
	(select id from reserves where space_id =?);
delete from reserves where space_id =?;
delete from ratings where space_id =?;
delete from spaces where id = ?;
