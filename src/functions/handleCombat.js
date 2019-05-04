const handleCombat = oldStats => {
	let hero1DealingDamage = false;
	let hero1ReceivingDamage = false;
	let hero2DealingDamage = false;
	let hero2ReceivingDamage = false;
	let asCriticalHero1 = false;
	let asCriticalHero2 = false;
	let asMissedHero1 = false;
	let asMissedHero2 = false;
	let damageDeal;

	let criticalHitHero1 = oldStats.hero1.powerstats.intelligence / 10;
	let chanceMissHero1 = oldStats.hero1.powerstats.speed / 10;

	let criticalHitHero2 = oldStats.hero2.powerstats.intelligence / 10;
	let chanceMissHero2 = oldStats.hero2.powerstats.speed / 10;

	if (oldStats.firstAttack) {
		let criticalChance = Math.floor(Math.random() * 101);
		let missChance = Math.floor(Math.random() * 101);

		if (chanceMissHero2 <= missChance) {
			if (criticalHitHero1 >= criticalChance) {
				damageDeal =
					oldStats.hero1.powerstats.strength -
					oldStats.hero2.powerstats.durability / 5 +
					oldStats.hero1.powerstats.power * 2;
				oldStats.hero2.powerstats.life -= Math.floor(damageDeal);
				asCriticalHero1 = true;
			} else {
				damageDeal =
					oldStats.hero1.powerstats.strength -
					oldStats.hero2.powerstats.durability / 3 +
					oldStats.hero2.powerstats.power;
				oldStats.hero2.powerstats.life -= Math.floor(damageDeal);
			}
		} else {
			asMissedHero2 = true;
		}

		hero1DealingDamage = true;
		hero2ReceivingDamage = true;
	}

	if (!oldStats.firstAttack) {
		let criticalChance = Math.floor(Math.random() * 101);
		let missChance = Math.floor(Math.random() * 101);

		if (chanceMissHero1 <= missChance) {
			if (criticalHitHero2 >= criticalChance) {
				damageDeal =
					oldStats.hero2.powerstats.strength -
					oldStats.hero1.powerstats.durability / 5 +
					oldStats.hero2.powerstats.power * 2;
				asCriticalHero2 = true;
				oldStats.hero1.powerstats.life -= Math.floor(damageDeal);
			} else {
				damageDeal =
					oldStats.hero2.powerstats.strength -
					oldStats.hero1.powerstats.durability / 3 +
					oldStats.hero2.powerstats.power;
				oldStats.hero1.powerstats.life -= Math.floor(damageDeal);
			}
		} else {
			asMissedHero1 = true;
		}

		hero2DealingDamage = true;
		hero1ReceivingDamage = true;
	}

	if (oldStats.hero2.powerstats.life <= 0) {
		oldStats.hero2.powerstats.life = 0;
	}

	if (oldStats.hero1.powerstats.life <= 0) {
		oldStats.hero1.powerstats.life = 0;
	}

	return {
		hero1DealingDamage: hero1DealingDamage,
		hero1ReceivingDamage: hero1ReceivingDamage,
		hero2DealingDamage: hero2DealingDamage,
		hero2ReceivingDamage: hero2ReceivingDamage,
		firstAttack: !oldStats.firstAttack,
		damageDeal: Math.floor(damageDeal),
		hero1: {
			...oldStats.hero1,
			powerstats: {
				...oldStats.hero1.powerstats,
				life: Math.ceil(oldStats.hero1.powerstats.life),
			},
			asCritical: asCriticalHero1,
			asMissed: asMissedHero1,
		},
		hero2: {
			...oldStats.hero2,
			powerstats: {
				...oldStats.hero2.powerstats,
				life: Math.ceil(oldStats.hero2.powerstats.life),
			},
			asCritical: asCriticalHero2,
			asMissed: asMissedHero2,
		},
	};
};

export default handleCombat;
