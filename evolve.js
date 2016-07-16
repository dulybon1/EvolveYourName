// require modules
const constants = require("./custom-modules/constants");
var helpers = require("./custom-modules/helpers");
var mutation = require("./custom-modules/mutation");
var fit = require("./custom-modules/fit");
var cross = require("./custom-modules/crossover");


var population = [];


//	http://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt=function(index, character) {
	//console.log(character + " - " + index);
    return this.substr(0, index) + character + this.substr(index+character.length);
}

// add an index to each individual
function indexThePopulation(population)
{
	for(var i= 0; i< population.length; i++)
	{
		population[i].index = i;
	}
}

// this function generates and return an individual
function generateIndividual(name)
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
function generateNamePopulation(name)
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

		population.push(obj);
		//console.log(obj + " pushed");
	}
	
}

function evolve(name)
{
	var fitnessLevel = 0;

	//generate the population
	generateNamePopulation(name);

	//calculate their fitness
	fit.calculateFitnessForAll(name, population);

	//sort based on fitness
	helpers.sortPopulation(population);

	// get the best
	var best = helpers.getTheBest(population);

	//while the best fitness < name.length
	while(best.fitness < name.length)
	{
		// mutate
		mutation.mutatePopulation(population);

		// perform crossover
		cross.performCrossover(population);

		//calculate their fitness
		fit.calculateFitnessForAll(name, population);

		//sort based on fitness
		helpers.sortPopulation(population);

		// the best element
		best = helpers.getTheBest(population);

		// length of valuables array
		var valuablesLength = helpers.getAllValuables(population).length;

		console.log("valuables: " + valuablesLength);

		console.log(population.length);

		// limit population to 100000
		population = population.slice(0, constants.maxPopulationSize);

		console.log(best);
		console.log(population.length);
	
	}

	return best;

}

console.log(evolve("duly bonheur"));

