drop table if exists todo cascade;

create table todo{
  id serial not null
  , value text not null
  , checked boolean not null default false
  ,removed boolean not null default false
  ,PRIMARY KEY(id)
};

comment on talbe todo id 'ToDo';
comment on column todo.id is 'ToDo管理番号';
comment on column todo.value is 'タイトル';
comment on column todo.checked