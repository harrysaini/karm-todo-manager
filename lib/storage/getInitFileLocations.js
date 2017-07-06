const osHomedir = require('os-homedir')();

module.exports ={
	historyLocation : osHomedir+'/.karm/data/karm.history.json',
	currentLocation : osHomedir+'/.karm/data/karm.current.json',
	configLocation : osHomedir+'/.karm/karm.config.json',
	storageLocation : osHomedir+'/.karm/data',
	karmDataLocation : osHomedir+'/.karm',
	localConfigDirectory : osHomedir+'/.config/karm',
	localConfigLocation : osHomedir+'/.config/karm/karm.internal-config.json'
}