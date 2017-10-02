module.exports = function(sequelize, DataTypes) {
    let Team = sequelize.define('team', {
        owner: DataTypes.INTEGER,
        teamName: DataTypes.STRING
    });
    return Team;
};