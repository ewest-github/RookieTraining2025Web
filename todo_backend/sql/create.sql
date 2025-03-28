drop table if exists todo cascade;

create table todo(
  id serial not null
  , value text not null
  , checked boolean not null default false
  ,removed boolean not null default false
  ,PRIMARY KEY(id)
);

comment on table todo is 'ToDo';
comment on column todo.id is 'ToDo管理番号';
comment on column todo.value is 'タイトル';
comment on column todo.checked is '達成フラグ';
comment on column todo.removed is '削除フラグ';
