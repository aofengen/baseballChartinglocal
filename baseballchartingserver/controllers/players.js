const sequelize = require('../db.js');
const User = sequelize.import('../models/user.js');
const Team = sequelize.import('../models/team.js');
const Player = sequelize.import('../models/player.js');

exports.addPlayer = function(req, res) {
    let name = req.body.player.name;
    let teamName = req.body.player.teamName;
    let number = req.body.player.number;
    let owner = req.user.id;

    Player
    .create({
        owner: owner,
        teamName: teamName,
        name: name,
        number: number
    }).then(
        function createSuccess(player) {
            res.json({
                player: player
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
};

exports.getPlayers = function(req, res) {
    let userid = req.user.id;

    Player.findAll({
        where: {owner: userid}
    })
    .then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.json(504, err.message);
        }
    );
};

exports.deletePlayer = function(req, res) {
    let player = req.body.player;
    
    Player.destroy({where: {name: player}})
    .then(
        function deleteSuccess(data) {
            res.json(data);
        },
        function deleteError(error) {
            res.json(500, err.message);
        }
    );
}