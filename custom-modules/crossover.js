var helpers = require("./helpers");

var cross = {}


// 50/50 crossover WORKING!!
cross.crossover50 = function(individual1, individual2)
{
	// get the length of the name
	var nameSize = individual1.name.length;

	// get the midpoint
	var midpoint = Math.floor(nameSize/2);

	// debug
	//console.log("crossover50: " +individual1.name + "-" + individual2.name);

	var tempIndividual = {};
	tempIndividual.name = individual1.name;
	//tempIndividual.fitness = individual1.fitness;

	//replace from [0->midpoint[ for individual1
	for (var i = 0; i < midpoint; i++) 
	{
		individual1.name = individual1.name.replaceAt(i, individual2.name.charAt(i));
	}
		
	//replace from [midpoint -> end] in individual2
	for (var z = 0; z < midpoint; z++) 
	{
		individual2.name = individual2.name.replaceAt(z, tempIndividual.name.charAt(z))
	}
		
}

cross.performCrossover = function(sortedPopulation)
{
	var allBest = helpers.getAllTheBests(sortedPopulation);
	var allVal = helpers.getAllValuables(sortedPopulation);

	for (var i = 0; i < allBest.length; i++) 
	{

		for (var j = 0; j < allVal.length; j++) 
		{
			//create new objects to avoid modifying existing individuals
			var best = Object.create(allBest[i]);
			var val = Object.create(allVal[j]);

			cross.crossover50(best, val);

			sortedPopulation.push(best);
			sortedPopulation.push(val);
		
		}
	}

}

module.exports = cross