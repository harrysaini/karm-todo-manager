const osHomedir = require('os-homedir')();

module.exports ={
	historyLocation : osHomedir+'/.karm/data/karm.history.json',
	currentLocation : osHomedir+'/.karm/data/karm.current.json',
	configLocation : osHomedir+'/.karm/karm.config.json',
	storageLocation : osHomedir+'/.karm/data',
	karmDataLocation : osHomedir+'/.karm'
}