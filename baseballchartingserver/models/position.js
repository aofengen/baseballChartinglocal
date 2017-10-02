module.exports = function(sequelize, DataTypes) {
    let Position = sequelize.define('position', {
        positionName: DataTypes.STRING,
        bench: DataTypes.BOOLEAN,
        pitcher: DataTypes.BOOLEAN
    })
    return Position;
}