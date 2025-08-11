import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI;

async function connectToDB() {
  try {
    mongoose.connect(uri)
    console.log("Conectado...")
  } catch (error) {
    console.log(`Erro: ${error}`)
  }
}


export default connectToDB;
