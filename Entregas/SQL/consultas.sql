# CONSULTAS

-- Listar todos los espacios 

SELECT s.*, avg(r.score)
FROM spaces s
left join ratings r
on s.id=r.space_id
group by s.id
ORDER BY create_space DESC;

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
where r.end_date is null or r.end_date < "2020-05-05";

-- Listar datos usuario

SELECT id,name,surname,nickname,email,city,community,avatar FROM users;


-- Listar un espacio concreto y su info + rating

SELECT s.*, avg(r.score)
FROM spaces s
left join ratings r
on s.id=r.space_id
where s.id = 2
group by s.id
ORDER BY create_space DESC;



-- Listar reserva "mi coworking" (incidencias + listar el espacio reservado)

select r.*,i.* from reserves r,incidents i
where r.id = i.reserve_id 
and space_id = ?;

-- Listar espacios publicados por un usuario concreto

select u.name, u.surname , s.* from users u,spaces s
where u.id=s.owner_id
and u.id=2;
