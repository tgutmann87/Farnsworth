const Auth = require("../Auth");
const SteamAPI = require('steamapi');
const steam = new SteamAPI(Auth.getSteamAPI());

module.exports = {
	userStats: function()
	{
		return steam.getUserStats(76561198108055615, 730);
	}
}