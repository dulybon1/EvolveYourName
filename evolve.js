var alphabet = "abcdefghijklmnopqrstuvwxyz ";
const initialPopulationSize = 1000;
const maxPopulationSize = 1000;
var population = [];


// Returns a random number between min (inclusive) and max (exclusive), from microsoft
function getRandomArbitrary(min, max) 
{
  return Math.random() * (max - min) + min;
}

// from stackOverflow: 
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

// this function sorts the population based on the fitness property
function sortPopulation(population)
{
	population.sort(function(a, b)
	{
		if(a.fitness < b.fitness) return 1;
		else if(a.fitness > b.fitness) return -1;
		else return 0;

	});
}

// gets the best fitted individual
function getTheBest(sortedPopulation)
{
	const best = sortedPopulation[0];
	return best;
}

// gets all the individuals that match the best in fitness
function getAllTheBests(sortedPopulation)
{
	//var i = 0;
	var bests = [];
	// while(sortedPopulation[i].fitness == getTheBest(sortedPopulation).fitness)
	// {
	// 	bests.push(sortedPopulation[i]);
	// 	i++;
	// }

	for (var i = 0; i < sortedPopulation.length; i++) 
	{
		if(sortedPopulation[i].fitness == getTheBest(sortedPopulation).fitness){
			bests.push(sortedPopulation[i]);
		}
	}
	return bests;
}

// gets all the individuals whose fitness are not 0;
function getAllValuables(sortedPopulation)
{
	//var i = 0;
	var valuables = [];
	// while(sortedPopulation[i].fitness > 0)
	// {
	// 	valuables.push(sortedPopulation[i]);
	// 	i++;
	// }

	for (var i = 0; i < sortedPopulation.length; i++) 
	{
		if (sortedPopulation[i].fitness > 1) {
			valuables.push(sortedPopulation[i]);
		}
	}
	return valuables;
}

// calculates the fitness of an individual and assigns it to the property fitness
function calculateFitness(fitnessMeasure, toMeasure)
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

// this function generates and return an individual
function generateIndividual(name)
{
	const nameSize = name.length;
	var individualName = "";
	for (var i = 0; i < nameSize; i++) 
	{
		individualName = individualName + alphabet[Math.floor(getRandomArbitrary(0,27))];
	}

	var obj = {};
	obj.name = individualName;

	calculateFitness(name, obj);

	//obj.fitness = 0;

	return obj;
}

// this function generates a population
function generateNamePopulation(name)
{
	const nameSize = name.length;

	for (var i = 0; i < initialPopulationSize; i++) 
	{
		//console.log("big for loop entered");
		var name = "";

		for (var s = 0; s < nameSize; s++)
		{
			name = name + alphabet[Math.floor(getRandomArbitrary(0,27))];
			
		}

		var obj = {};
		obj.name = name;

		population.push(obj);
		//console.log(obj + " pushed");
	}
	
}




// mutate an individual at one location WORKING!!
function mutateIndividual(individual)
{
	// get the length of the name
	var nameSize = individual.name.length;

	// debug
	//console.log(individual.name);

	// generate random index for name
	var randForItem = Math.floor(getRandomArbitrary(0, nameSize));

	// generate random index for alphabet
	var randForAlphabet = Math.floor(getRandomArbitrary(0,27));

	// perform one letter mutation
	individual.name = individual.name.replaceAt(randForItem, alphabet.charAt(randForAlphabet));

	// debug
	//console.log(individual.name);

}

// mutate the whole population using mutate individual WORKING!!
function mutatePopulation(population)
{
	var nameSize = population[0].name.length;
	for(var i = 0; i < population.length; i++)
	{
		mutateIndividual(population[i]);
	}
}

// 50/50 crossover WORKING!!
function crossover50(individual1, individual2)
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
		
	// debug
	//console.log("crossover50: " +individual1.name + "-" + individual2.name);
}

// get fitness for the whole population
function calculateFitnessForAll(fitnessMeasure, population)
{
	for(var i=0;i<population.length; i++)
	{
		// console.log("calculateFitnessForAll: " + population[i]);
		// console.log("calculateFitnessForAll: " + typeof(population[i]));
		calculateFitness(fitnessMeasure, population[i]);
	}
}

// performs the crossover in a population
function performCrossover(sortedPopulation)
{
	var allBest = getAllTheBests(sortedPopulation);
	var allVal = getAllValuables(sortedPopulation);

	for (var i = 0; i < allBest.length; i++) 
	{
		

		for (var j = 0; j < allVal.length; j++) 
		{
			//create new objects to avoid modifying existing individuals
			var best = Object.create(allBest[i]);
			var val = Object.create(allVal[j]);


			crossover50(best, val);

			sortedPopulation.push(best);
			sortedPopulation.push(val);

			// console.log("best: ");
			// console.log(best);

			// console.log("val: ");
			// console.log(val);		
		}
	}

}

function evolve(name)
{
	var fitnessLevel = 0;

	//generate the population
	generateNamePopulation(name);

	//calculate their fitness
	calculateFitnessForAll(name, population);

	//sort based on fitness
	sortPopulation(population);

	// get the best
	var best = getTheBest(population);

	//while the best fitness < name.length
	while(best.fitness < name.length)
	{
		// mutate
		mutatePopulation(population);

		// perform crossover
		performCrossover(population);

		//calculate their fitness
		calculateFitnessForAll(name, population);

		//sort based on fitness
		sortPopulation(population);

		// the best element
		best = getTheBest(population);

		// length of valuables array
		var valuablesLength = getAllValuables(population).length;

		console.log("valuables: " + valuablesLength);

		console.log(population.length);

		//population = population.slice(0, valuablesLength);

		// limit population to 100000
		population = population.slice(0, maxPopulationSize);

		console.log(best);
		console.log(population.length);

		//console.log(population)

		// while(fitnessLevel < name.length/4)
		// {
		// 	console.log("fitnessLevel: "+fitnessLevel);
		// 	fitnessLevel++;
		// 	console.log("fitnessLevel: "+fitnessLevel);
		// }

		
	}

	return best;
		

}

// DEBUG AREA




// crossover50(population[0],population[1]);
// mutatePopulation(population);

// calculateFitnessForAll(name,population);

// sortPopulation(population)

// console.log(population.length);

// performCrossover(population);

// console.log(population.length);

// console.log(getTheBest(population));
// console.log(getAllTheBests(population));
// console.log(getAllValuables(population));
//console.log(generateIndividual("boom"));

console.log(evolve("yllka skilja bonheur"));