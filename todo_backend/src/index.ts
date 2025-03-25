import app from './appServer';
import dotenv from 'dotenv';

dotenv.config();

app.listen(process.env.PORT,()=>{
  console.log(`Server is running. port=${process.env.PORT}`)
});