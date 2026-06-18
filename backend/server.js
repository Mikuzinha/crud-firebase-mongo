const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const admin = require("firebase-admin");

const auth = require("./middleware/auth");

const Produto = require("./models/Produto");

const serviceAccount =
    require("./firebase-config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://CRUD:Monika@apicluster.16v6wu3.mongodb.net/crud"
)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log("Erro MongoDB:", err));

app.get("/produtos", auth, async (req, res) => {

    const produtos =
        await Produto.find();

    res.json(produtos);

});

app.post("/produtos", auth, async (req, res) => {

    const produto =
        await Produto.create(req.body);

    res.json(produto);

});

app.put("/produtos/:id", auth, async (req, res) => {

    const produto =
        await Produto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

    res.json(produto);

});

app.delete("/produtos/:id", auth, async (req, res) => {

    await Produto.findByIdAndDelete(
        req.params.id
    );

    res.json({
        mensagem: "Produto excluído"
    });

});

app.listen(3000, () => {
    console.log("Servidor rodando");
});