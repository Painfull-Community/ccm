const mongoose = require('mongoose'); // there is an impostor amongoose
const fs = require("fs");
let apis
let config = {}
let botConfig = {}
require("dotenv").config();
let remoteMode = false
if (process.env.MONGO_HOST) remoteMode = true
/*mongoose.connect(process.env.MONGO_HOST);

const db = mongoose.connection;
db.on('error', (err) => {
	console.error(console, 'connection error:')
	apis["core-error"].api.error(err + "\nLikely invalid mongodb connection string");
	remoteMode = false
});

var Module
db.once('open', function() {
	const moduleSchema = new mongoose.Schema({
		config: Object
	});
	Module = mongoose.model('module', moduleSchema);
});*/

function initAPIs(util) {
	apis = util.apis
	botConfig = util.config

	let localConfig
	if (!remoteMode) {
		if (!fs.existsSync(`${__dirname}/ccm.json`)) fs.writeFileSync(`${__dirname}/ccm.json`, "{}")
		localConfig = fs.readFileSync(`${__dirname}/ccm.json`) 
		console.log("c: " + JSON.stringify(localConfig))
	}

	botConfig.enabledModules.forEach(module => {
		if (!remoteMode) {
			if (localConfig[module]) {
				config[module] = localConfig[module]
			} else {
				config[module] = {}
				localConfig[module] = {}
				fs.writeFileSync(`${__dirname}/ccm.json`, JSON.stringify(localConfig, null, 4))
			}
		}
	})
}

function save(moduleName) {
	if (!remoteMode) {
		let localConfig = fs.readFileSync(`${__dirname}/ccm.json`) 
		localConfig[moduleName] = config[moduleName]
		fs.writeFileSync(`${__dirname}/ccm.json`, JSON.stringify(localConfig, null, 4))
	}
}
 // how do we test it
 // hmm
 // maybe we can test it with a test bot
 // brand new idea
 // and this module can contain
 // a test command
module.exports = {
	api: {save},
	config,
	initAPIs
}