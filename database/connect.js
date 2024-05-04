import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@learnersdb.o52ldgz.mongodb.net/?retryWrites=true&w=majority&appName=LearnersDB`
    );
    return console.log("Conectado com sucesso!");
  } catch (error) {
    return console.error("Erro ao conectar no banco de dados:", error);
  }
};

export default connectToDatabase;
