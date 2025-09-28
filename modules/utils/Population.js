

export default class Population {

    // this is specific population class in genetic algorithms
    
    calcFitness(target) {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(target);
        }
    }
}