const constants = require("./constants.js");
var helpers = require("./helpers");
var pop = {}
pop.population = []

// this function generates and return an individual
pop.generateIndividual = function (name)
{
	const nameSize = name.length;
	var individualName = "";
	for (var i = 0; i < nameSize; i++) 
	{
		individualName = individualName + constants.alphabet[Math.floor(helpers.getRandomArbitrary(0,constants.alphabet.length))];
	}

	var obj = {};
	obj.name = individualName;

	calculateFitness(name, obj);

	return obj;
}

// this function generates a population
pop.generateNamePopulation = function (name)
{
	const nameSize = name.length;

	for (var i = 0; i < constants.initialPopulationSize; i++) 
	{
		//console.log("big for loop entered");
		var name = "";

		for (var s = 0; s < nameSize; s++)
		{
			name = name + constants.alphabet[Math.floor(helpers.getRandomArbitrary(0,constants.alphabet.length))];
			
		}

		var obj = {};
		obj.name = name;

		pop.population.push(obj);
		//console.log(obj + " pushed");
	}
	
}

module.exports = pop