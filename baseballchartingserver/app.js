require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const sequelize = require('./db.js');
// const cors = require('cors');
const router = require('./router.js');
const Team = sequelize.import(__dirname + '\/models\/team.js');
const Player = sequelize.import(__dirname + '\/models\/player.js');
const Position = sequelize.import(__dirname + '\/models\/position.js');

// Player.sync({force: true});
sequelize.sync();
// app.use(cors());
app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
router(app);

http.listen(process.env.PORT || 3000, function() {
	console.log("Listening on port 3000");
})