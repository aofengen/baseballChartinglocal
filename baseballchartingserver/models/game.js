module.exports = function(sequelize, DataTypes){
	let Game = sequelize.define('game', {
		owner: DataTypes.INTEGER,
		filename: DataTypes.STRING
	});
	return Game;
};