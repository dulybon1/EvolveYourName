var alphabet = "abcdefghijklmnopqrstuvwxyz";
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

function sortPopulation(population)
{
	population.sort(function(a, b)
	{
		if(a.fitness < b.fitness) return 1;
		else if(a.fitness > b.fitness) return -1;
		else return 0;

	});
}

//WORKING!!
function generateNamePopulation(name)
{
	const nameSize = name.length;

	for (var i = 0; i < 1000; i++) 
	{
		//console.log("big for loop entered");
		var name = "";

		for (var s = 0; s < nameSize; s++)
		{
			name = name + alphabet[Math.floor(getRandomArbitrary(0,26))];
			
		}

		var obj = {};
		obj.name = name;

		population.push(obj);
		//console.log(obj + " pushed");
	}
	
}

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
	var randForAlphabet = Math.floor(getRandomArbitrary(0,26));

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

// DEBUG AREA

generateNamePopulation("duly");

//console.log("before crossover: " + population[0].name+ "--" +population[1].name);

crossover50(population[0],population[1]);
mutatePopulation(population);
//indexThePopulation(population);

//console.log("after crossover: " + population[0].name+ "--" +population[1].name);

calculateFitness("duly", population[0]);

calculateFitnessForAll("duly",population);

sortPopulation(population)

console.log(population);


//console.log(population);