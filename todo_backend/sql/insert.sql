truncate table todo cascade;

insert into todo(id,value,checked,removed) values (1,'買い物',false,false);
insert into todo(id,value,checked,removed) values (2,'部屋掃除',true,false);
insert into todo(id,value,checked,removed) values (3,'お風呂',false,true);

select setval(pg_get_serial_sequence('todo','id'),100);