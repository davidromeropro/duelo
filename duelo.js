class Card {
	constructor(name, cost) {
		this.name = name;
		this.cost = cost;
	}
}

class Unit extends Card {
	constructor(name, cost, power, res) {
		super(name, cost);
		this.power = power;
		this.res = res;
	}
	attack(target) {
		// reduce target res by power.
		target.res -= this.power;
	}
}

class Effect extends Card {
	constructor(name, cost, text, stat, magnitude) {
		super(name, cost);
		this.text = text;
		this.stat = stat;
		this.magnitude = magnitude;
	}

	play(target) {
		if (target instanceof Unit) {
			// apply effect
			let attribute = this.stat.match(/res/ig) ? "res" : "power";
			target[attribute] = eval(target[attribute] + this.magnitude);
		} else {
			throw new Error("Target must be a unit!");
		}
	}
}

// Turn 1 Player 1
const redBeltNinja = new Unit("Ninja Cinturón Rojo", 3, 3, 4);
console.log('El jugador 1 convoca a "Ninja Cinturón Rojo"', redBeltNinja);
const hardAlgorithm = new Effect("Algoritmo Difícil", 2, "aumentar la resistencia del objetivo en 3", "resilencia", "+3");
hardAlgorithm.play(redBeltNinja);
console.log('El jugador 1 juega "Algoritmo duro" en "Ninja Cinturón Rojo"', redBeltNinja);

// Turn 2 Player 2
const blackBeltNinja = new Unit("Ninja Cinturón Negro", 4, 5, 4);
console.log('El jugador 2 convoca a "Ninja Cinturón Negro"', blackBeltNinja);
const unhandledPromiseReject = new Effect("Rechazo de promesa no manejado", 1, "reducir la resistencia del objetivo en 2", "resilencia", "-2");
unhandledPromiseReject.play(redBeltNinja);
console.log('El jugador 2 juega "Rechazo de promesa no controlada" en "Ninja Cinturón Rojo"', redBeltNinja);

// Turn 3 Player 1
const pairProgramming = new Effect("Programación en pareja", 3, "aumentar el poder del objetivo en 2", "poder", "+2");
pairProgramming.play(redBeltNinja);
console.log('El jugador 1 juega "Programación en pareja" en "Ninja Cinturón Rojo"', redBeltNinja);
redBeltNinja.attack(blackBeltNinja);
console.log('El jugador 1 tiene el ataque "Ninja Cinturón Rojo" "Ninja Cinturón Negro"', blackBeltNinja);
