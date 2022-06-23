const { Sequelize } = require("sequelize");
const database = require("../database/bd");

const Lugar = database.sequelize.define(
    //nome da tabela do postgres
    "lugares",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        pais:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        imagem:{
            type: Sequelize.STRING,
            allowNull: false,
        },

        descricao:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        atracoes:{
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true, 
        timestamps: false,
        createdAt: false,
        updateAt: false,
    }
);

/*const initTable = async () => {
    await Lugar.sync();
};
initTable();*/

module.exports = Lugar;