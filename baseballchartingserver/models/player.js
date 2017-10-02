module.exports = function(sequelize, DataTypes) {
    let Player = sequelize.define('player', {
        owner: DataTypes.INTEGER,
        teamName: DataTypes.STRING,
        name: DataTypes.STRING,
        number: DataTypes.INTEGER
    })
    return Player;
}