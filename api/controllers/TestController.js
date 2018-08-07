/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  correctIp: function(req, res, next) {
		if (!req.param('ip')) return res.badRequest('Ip is required');
		if (!req.param('secret')) return res.badRequest('Secret is required');
		if (req.param('secret') != variables.secret) return res.forbidden('forbidden');
		if (externalIp == req.param('ip')) return res.send();
		externalIp = req.param('ip');
		var message = 'Your external ip: ' + externalIp;
		// for (var i = 0; i < chats.length; i++) {
			bot.sendMessage(chatId, message);
		// }

		res.send(externalIp);
	}
 
};

