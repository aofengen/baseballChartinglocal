const router = require('express').Router();
const sequelize = require('../db.js');
const User = sequelize.import('../models/user.js');
const Team = sequelize.import('../models/team.js');

exports.addTeam = function(req, res) {
    let teamName = req.body.teamName;
    let owner = req.user.id;

    Team
    .create({
        owner: owner,
        teamName: teamName
    }).then(
        function createSuccess(team) {
            res.json({
                team: team
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
};

exports.getTeams = function(req, res) {
    let userid = req.user.id;

    Team.findAll({
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

exports.deleteTeam = function(req, res) {
    let team = req.body.team;

    Team.destroy({where: {teamName: team}})
    .then(
        function deleteSuccess(data) {
            res.json(data);
        },
        function deleteError(error) {
            res.json(500, err.message);
        }
    );
}