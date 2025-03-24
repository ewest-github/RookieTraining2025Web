import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import {useState,useEffect} from 'react';
// import {theme} from './assets/theme.js'
import './todo.css';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

//tab
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

//tab
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

declare type Todo={
  value:string;
  readonly id:number;
  checked:boolean;
  removed:boolean;
};

let nextId=0;

export default function ToDoList() {
  const storage=localStorage;

  const[value,setValue]=React.useState(0);
  const[title,setTitle]=React.useState("");//初期値
  const[todos,setTodos]=useState<Todo[]>([]);//<Todo[]>は型の指定
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);  //初期データのみ読み込み
  
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);  //todosが変更されるたびに保存

  function handleTitle(title: string){
    setTitle(title);
    // console.log(title)
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,todo:Todo){
    const newValue=e.target.value;

    if(!todo.checked){
      setTodos(todos.map((t)=>{
        if(t.id===todo.id){
          t.value=newValue;
        }
        return t;
      }))
    }
  }

  function handleChecked(e:boolean,todo: Todo){
    // console.log(e)
    // todo.checked=e;
    console.log(todos);
    console.log(todo);
  
    setTodos(todos.map(t=>{
      if(t.id==todo.id){
        todo.checked=e;
      }
      return t;
    }))
  }

  function handleRemoved(todo: Todo){
    //removedを操作するsetTodos
    setTodos(todos.map(t=>{
      if(t.id==todo.id){
        todo.removed=!todo.removed;
      }
      return t;
    }))
  }

  //完全に削除
  function handleAllRemoved() {
    const remainingTodos = todos.filter((todo) => !todo.removed);  //削除されていないタスクのみ残す
    setTodos(remainingTodos);
    localStorage.setItem('todos', JSON.stringify(remainingTodos));  //ローカルストレージを更新
  }


  //titleを受けとって追加
  function onAddTodo(title: string){
    //idを取得
    nextId=JSON.parse(storage.getItem('id'));
    setTodos([
      ...todos,
      {
        id:nextId++,
        value:title,
        checked:false,
        removed:false
      }
    ]);
    // setTitle('aiueo');//落とし穴らしい
    // console.log(title);
    // console.log(todos)
    //idを保存
    storage.setItem("id",JSON.stringify(nextId));
  }

  return (
    <>
    <div>
      <Box>
        <AppBar position="static" sx={{height:'50px'}}>
            <Typography variant="h5" component="div" sx={{margin:'10px 20px'}}>
              ToDoList
            </Typography>
        </AppBar>
      </Box>
    </div>
    <div style={{margin:'30px 10px'}}>
      <Box>
        {/* <TextField value={title} onChange={e=>setTitle(e.target.value)} label="ToDoの入力" variant='outlined' sx={{width:'50%'}}/> */}
        <TextField className='textfield' value={title} onChange={(e)=>{handleTitle(e.target.value)}} label="ToDoの入力" variant='outlined' sx={{width:'50%'}}/>
        <Button className="button" variant="outlined" onClick={()=>{
          //ここでレコードを追加する
          onAddTodo(title);
          setTitle('');//textfieldを初期化
        }}>追加</Button>
      </Box>
    </div>
    <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="すべてのタスク" {...a11yProps(0)} />
            <Tab label="現在のタスク" {...a11yProps(1)} />
            <Tab label="完了したタスク" {...a11yProps(2)} />
            <Tab label="ゴミ箱" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box>
            <div>
              {todos.map((todo)=>{
                if(todo.removed===false){
                return (
                  //ユニークなkey
                  <li key={todo.id}>
                    {/* <Checkbox checked={true} onChange={(e)=>console.log(e)}/> */}
                    <Checkbox checked={todo.checked} onChange={(e)=>handleChecked(e.target.checked,todo)}/>
                    <TextField className='textfield' value={todo.value} disabled={todo.checked} onChange={(e)=>handleTextChange(e,todo)}/>
                    <Button className='button' onClick={()=>handleRemoved(todo)} variant='outlined'>削除</Button>
                    <Divider sx={{margin:'10px'}}/>
                  </li>                  
                )
              }
              })}
            </div>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        <div>
              {todos.map((todo)=>{
                if(todo.checked===false && todo.removed===false){
                return (
                  //ユニークなkey
                  <li key={todo.id}>
                    {/* <Checkbox checked={true} onChange={(e)=>console.log(e)}/> */}
                    <Checkbox checked={todo.checked} onChange={(e)=>handleChecked(e.target.checked,todo)}/>
                    <TextField className='textfield' value={todo.value} disabled={todo.checked} onChange={(e)=>handleTextChange(e,todo)}/>
                    <Button className='button' onClick={()=>handleRemoved(todo)} variant='outlined'>削除</Button>
                    <Divider sx={{margin:'10px'}}/>
                  </li>
                )
              }
              })}
            </div>        
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        <div>
              {todos.map((todo)=>{
                if(todo.checked===true && todo.removed===false){
                return (
                  //ユニークなkey
                  <li key={todo.id}>
                    {/* <Checkbox checked={true} onChange={(e)=>console.log(e)}/> */}
                    <Checkbox checked={todo.checked} onChange={(e)=>handleChecked(e.target.checked,todo)}/>
                    <TextField className='textfield' value={todo.value} disabled={todo.checked} onChange={(e)=>handleTextChange(e,todo)}/>
                    <Button className='button' onClick={()=>handleRemoved(todo)} variant='outlined'>削除</Button>
                    <Divider sx={{margin:'10px'}}/>
                  </li>
                )
              }
            })}
            </div>
          </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Button sx={{margin:'10px'}} onClick={()=>handleAllRemoved()} variant='outlined'>ごみ箱を空にする</Button>
          <div>
              {todos.map((todo)=>{
                if(todo.removed===true){
                return (
                  //ユニークなkey
                  <li key={todo.id}>
                    {/* <Checkbox checked={true} onChange={(e)=>console.log(e)}/> */}
                    <Checkbox checked={todo.checked} onChange={(e)=>handleChecked(e.target.checked,todo)}/>
                    <TextField className='textfield' value={todo.value} disabled={todo.checked} onChange={(e)=>handleTextChange(e,todo)}/>
                    <Button className='button' onClick={()=>handleRemoved(todo)} variant='outlined'>復元</Button>
                    <Divider sx={{margin:'10px'}}/>
                  </li>
                )
              }
              })}
            </div>
        </CustomTabPanel>
      </Box>
    </div>
    </>
  );
}
