

export default class Genetic {

    // this is class for genetic algorithms
    constructor() {
        this.population = [];
        this.mutationRate = 0.01;
        this.matingPool = [];
        this.generations = 0;
        this.finished = false;
        this.target = '';
        this.perfectScore = 1;
    }

    // this method creates a new population
    createPopulation(population, target, mutationRate) {
        this.population = population;
        this.target = target;
        this.mutationRate = mutationRate;
        this.calcFitness();
    }

    // this method calculates the fitness of each member of the population
    calcFitness() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(this.target);
        }
    }

    // this method generates a mating pool
    naturalSelection() {
        this.matingPool = [];
        let maxFitness = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }
        for (let i = 0; i < this.population.length; i++) {
            let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
            let n = floor(fitness * 100);
            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }
    }

    // this method creates a new generation
    generate() {
        for (let i = 0; i < this.population.length; i++) {
            let a = floor(random(this.matingPool.length));
            let b = floor(random(this.matingPool.length));
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations++;
    }

    // this method returns the best member of the population
    getBest() {
        return this.best;
    }

    // this method computes the average fitness of the population
    getAverageFitness() {
        let total = 0;
        for (let i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
        }
        return total / (this.population.length);
    }

    // this method returns whether the evolution is finished or not
    isFinished() {
        return this.finished;
    }

    // this method returns the number of generations
    getGenerations() {
        return this.generations;
    }

    // this method returns the population
    getPopulation() {
        return this.population;
    }

    // this method returns the target
    getTarget() {
        return this.target;
    }

    // this method returns the mutation rate
    getMutationRate() {
        return this.mutationRate;
    }

    // this method sets the mutation rate
    setMutationRate(mutationRate) {
        this.mutationRate = mutationRate;
    }

    // this method sets the population
    setPopulation(population) {
        this.population = population;
    }

    // this method sets the target
    setTarget(target) {
        this.target = target;
    }

    // this method sets the perfect score
    setPerfectScore(perfectScore) {
        this.perfectScore = perfectScore;
    }

    // this method sets the finished flag
    setFinished(finished) {
        this.finished = finished;
    }
}