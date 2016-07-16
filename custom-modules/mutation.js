var helpers = require("./helpers");
var constants = require("./constants");
var mutation = {}

// mutate an individual at one location
mutation.mutateIndividual = function (individual)
{
	// get the length of the name
	var nameSize = individual.name.length;

	// generate random index for name
	var randForItem = Math.floor(helpers.getRandomArbitrary(0, nameSize));

	// generate random index for alphabet
	var randForAlphabet = Math.floor(helpers.getRandomArbitrary(0,constants.alphabet.length));

	// perform one letter mutation
	individual.name = individual.name.replaceAt(randForItem, constants.alphabet.charAt(randForAlphabet));

}

// mutate the whole population using mutate individual
mutation.mutatePopulation = function(population)
{
	var nameSize = population[0].name.length;
	for(var i = 0; i < population.length; i++)
	{
		mutation.mutateIndividual(population[i]);
	}
}

module.exports = mutation