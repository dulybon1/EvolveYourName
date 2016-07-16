var helpers = {}

// Returns a random number between min (inclusive) and max (exclusive), from microsoft
helpers.getRandomArbitrary = function(min, max){
	return Math.random() * (max - min) + min;
}

// sort the population
helpers.sortPopulation = function (population)
{
	population.sort(function(a, b)
	{
		if(a.fitness < b.fitness) return 1;
		else if(a.fitness > b.fitness) return -1;
		else return 0;

	});
}

// get the most fit individual
helpers.getTheBest = function(sortedPopulation)
{
	const best = sortedPopulation[0];
	return best;
}

// get individuals who match the best in fitness
 helpers.getAllTheBests = function(sortedPopulation)
{
	var bests = [];

	for (var i = 0; i < sortedPopulation.length; i++) 
	{
		if(sortedPopulation[i].fitness == helpers.getTheBest(sortedPopulation).fitness){
			bests.push(sortedPopulation[i]);
		}
	}
	return bests;
}

// gets all the individuals whose fitness are not 0;
helpers.getAllValuables = function (sortedPopulation)
{
	var valuables = [];

	for (var i = 0; i < sortedPopulation.length; i++) 
	{
		if (sortedPopulation[i].fitness > 1) {
			valuables.push(sortedPopulation[i]);
		}
	}
	return valuables;
}

module.exports = helpers;