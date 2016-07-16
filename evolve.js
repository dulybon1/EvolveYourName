// require modules
const constants = require("./custom-modules/constants");
var helpers = require("./custom-modules/helpers");
var mutation = require("./custom-modules/mutation");
var fit = require("./custom-modules/fit");
var cross = require("./custom-modules/crossover");
var pop = require("./custom-modules/population.js");


//	http://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt=function(index, character) {
	//console.log(character + " - " + index);
    return this.substr(0, index) + character + this.substr(index+character.length);
}


function evolve(name)
{
	var fitnessLevel = 0;

	//generate the population
	pop.generateNamePopulation(name);

	//calculate their fitness
	fit.calculateFitnessForAll(name, pop.population);

	//sort based on fitness
	helpers.sortPopulation(pop.population);

	// get the best
	var best = helpers.getTheBest(pop.population);

	//while the best fitness < name.length
	while(best.fitness < name.length)
	{
		// mutate
		mutation.mutatePopulation(pop.population);

		// perform crossover
		cross.performCrossover(pop.population);

		//calculate their fitness
		fit.calculateFitnessForAll(name, pop.population);

		//sort based on fitness
		helpers.sortPopulation(pop.population);

		// the best element
		best = helpers.getTheBest(pop.population);

		// length of valuables array
		var valuablesLength = helpers.getAllValuables(pop.population).length;

		console.log("valuables: " + valuablesLength);

		console.log(pop.population.length);

		// limit population to 100000
		pop.population = pop.population.slice(0, constants.maxPopulationSize);

		console.log(best);
		console.log(pop.population.length);
	
	}

	return best;

}

console.log(evolve("adrian leonard skilja-bonheur"));

