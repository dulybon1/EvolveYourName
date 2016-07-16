var fit = {}

// calculates the fitness of an individual and assigns it to the property fitness
fit.calculateFitness = function (fitnessMeasure, toMeasure)
{
	// console.log(typeof(toMeasure));
	var count = 0;
	for (var i = 0; i < fitnessMeasure.length; i++)
	{
		if (fitnessMeasure.charAt(i) == toMeasure.name.charAt(i))
		{
			count +=1;
		}
	}
	toMeasure.fitness = count;
	//console.log(toMeasure);
}

// get fitness for the whole population
fit.calculateFitnessForAll = function (fitnessMeasure, population)
{
	for(var i=0;i<population.length; i++)
	{
		fit.calculateFitness(fitnessMeasure, population[i]);
	}
}

module.exports = fit