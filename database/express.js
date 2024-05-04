import express from "express";
import bcrypt from "bcrypt";
import UserModel from "./models/user.model.js";
const app = express();
import cors from "cors";

app.use(express.json()); // Para lidar com dados JSON no corpo da requisição
app.use(cors());

app.post("/login", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
    console.log("Conectado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/login", async (req, res) => {
  const { username, password } = req.body; // Obtendo os parâmetros da consulta

  try {
    const user = await UserModel.findOne({ username, password }); // Usando findOne para encontrar um usuário com o nome de usuário e senha correspondentes
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.delete("/users/:password", async (req, res) => {
  try {
    const password = req.params.password;
    await UserModel.findOneAndDelete({
      password,
    });
    res.status(200).send();
    console.log(password);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/users", async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verifica a senha usando bcrypt
    const match = await bcrypt.compare(password, user.password); // Comparando com a senha padrão "123456"

    if (!match) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // Autenticação bem-sucedida
    res.status(200).json({ message: "Login bem-sucedido" });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.status(200).json({ name: user.name });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor Express rodando na porta 3000");
});
