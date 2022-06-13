const Lugar = require("../models/Lugares");
let message = "";
let type = "";
const orderById = { order: [["id", "ASC"]] };

const Op = require("sequelize").Op;

const getAll = async (req, res) => {
  try {
    const lugares = await Lugar.findAll();
    res.render("index", {
      lugares,
      message,
      type,
      lugarSearch: [],
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const lugar = await Lugar.findByPk(req.params.id);
    const lugares = await Lugar.findAll(orderById);
    res.render("detalhes", {
      lugar,
      message,
      type,
      lugarSearch: [],
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const criar = (req, res) => {
  try {
    res.render("criar", { message, type });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const criacao = async (req, res) => {
  try {
    const lugar = req.body;
    if (
      !lugar.nome ||
      !lugar.pais ||
      !lugar.imagem ||
      !lugar.descricao ||
      !lugar.atracoes
    ) {
      message = "Preencha todos os campos para cadastro!";
      type = "danger";
      return res.redirect("/criar");
    }
    await Lugar.create(lugar);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const editar1 = async (req, res) => {
  const lugar = await Lugar.findByPk(req.params.id);

  if (!lugar) {
    res.render("editar", {
      message: "lugare não foi encontrado!",
      type: "danger",
    });
  }
  res.render("editar", {
    lugar,
    message: "Editado com sucesso",
    type: "success",
  });
};

const editar = async (req, res) => {
  try {
    const lugar = await Lugar.findByPk(req.params.id);
    const { nome, pais, imagem, descricao, atracoes } = req.body;

    lugar.nome = nome;
    lugar.pais = pais;
    lugar.imagem = imagem;
    lugar.descricao = descricao;
    lugar.atracoes = atracoes;

    const lugarEditado = await lugar.save();

    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const deletar = async (req, res) => {
  try {
    const lugar = await Lugar.findByPk(req.params.id);

    if (!lugar) {
      res.render("deletar", {
        message: "Lugar não foi encontrado!",
        type: "danger",
      });
    }
    res.render("deletar", {
      lugar,
      message: "",
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const deletar1 = async (req, res) => {
  const lugar = await Lugar.findByPk(req.params.id);

  if (!lugar) {
    res.render("deletar", {
      message: "Lugar não encontrado",
    });
  }

  await lugar.destroy();
  res.redirect("/");
};

const pesquisaNome = async (req, res) => {
  try {
    const lugar = await Lugar.findAll({
      where: {
        nome: {
          [Op.like]: `%${req.body.lugar}%`,
        },
      },
      order: [["id", "ASC"]],
    });

    if (lugar.length == 0) {
      (message = "Lugar não foi encontrado"), (type = "danger");
      return res.redirect("/");
    }

    res.render("index", {
      lugares: [],
      message,
      type,
      lugarSearch: lugar,
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  criar,
  criacao,
  editar1,
  editar,
  deletar,
  deletar1,
  pesquisaNome,
};
