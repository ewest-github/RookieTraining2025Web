import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
import Todo from './todo.tsx'
import './todo.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Todo/>
  </StrictMode>,
)
