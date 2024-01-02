const weapons = [
    { name: "Dagger", cost: 8, damage: 4, armor: 0 },
    { name: "Shortsword", cost: 10, damage: 5, armor: 0 },
    { name: "Warhammer", cost: 25, damage: 6, armor: 0 },
    { name: "Longsword", cost: 40, damage: 7, armor: 0 },
    { name: "Greataxe", cost: 74, damage: 8, armor: 0 }
];

const armors = [
    { name: "Leather", cost: 13, damage: 0, armor: 1 },
    { name: "Chainmail", cost: 31, damage: 0, armor: 2 },
    { name: "Splintmail", cost: 53, damage: 0, armor: 3 },
    { name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
    { name: "Platemail", cost: 102, damage: 0, armor: 5 }
];

const rings = [
    { name: "Damage +1", cost: 25, damage: 1, armor: 0 },
    { name: "Damage +2", cost: 50, damage: 2, armor: 0 },
    { name: "Damage +3", cost: 100, damage: 3, armor: 0 },
    { name: "Defense +1", cost: 20, damage: 0, armor: 1 },
    { name: "Defense +2", cost: 40, damage: 0, armor: 2 },
    { name: "Defense +3", cost: 80, damage: 0, armor: 3 }
];

const createAllPossibleCombos = () => {
    const allCombos = [];

    // 1 weapon, 1 armor, 2 rings
    for (let weapon of weapons) {
        for (let armor of armors) {
            for (let ring1 of rings) {
                for (let ring2 of rings) {
                    if (ring1.name !== ring2.name) {
                        allCombos.push({ weapon, armor, ring1, ring2 });
                    }
                }
            }
        }
    }

    // 1 weapon, 1 armor, 1 ring
    for (let weapon of weapons) {
        for (let armor of armors) {
            for (let ring of rings) {
                allCombos.push({ weapon, armor, ring });
            }
        }
    }

    // 1 weapon, 1 armor 0 ring
    for (let weapon of weapons) {
        for (let armor of armors) {
            allCombos.push({ weapon, armor });
        }
    }

    // 1 weapon, 0 armor, 2 rings
    for (let weapon of weapons) {
        for (let ring1 of rings) {
            for (let ring2 of rings) {
                if (ring1.name !== ring2.name) {
                    allCombos.push({ weapon, ring1, ring2 });
                }
            }
        }
    }

    // 1 weapon, 0 armor, 1 ring
    for (let weapon of weapons) {
        for (let ring of rings) {
            allCombos.push({ weapon, ring });
        }
    }

    // 1 weapon, 0 armor, 0 ring
    for (let weapon of weapons) {
        allCombos.push({ weapon });
    }

    return allCombos;
}

const createPlayerWithEquipment = (equipment) => {
    let cost = 0;
    let damage = 0;
    let armor = 0;

    for (let item of Object.values(equipment)) {
        cost += item.cost;
        damage += item.damage;
        armor += item.armor;
    }

    return {
        hitPoints: 100,
        damage,
        armor,
        cost
    };
};

const playGame = (player) => {
    const boss = {
        hitPoints: 109,
        damage: 8,
        armor: 2
    };

    let playerTurn = true;
    while (player.hitPoints > 0 && boss.hitPoints > 0) {
        if (playerTurn) {
            boss.hitPoints -= Math.max(1, player.damage - boss.armor);
        } else {
            player.hitPoints -= Math.max(1, boss.damage - player.armor);;
        }

        playerTurn = !playerTurn;
    }

    return player.hitPoints > 0;
};

const part1 = () => {
    const allCombos = createAllPossibleCombos();

    let minimumCost = 999999;
    allCombos.forEach(combo => {
        const player = createPlayerWithEquipment(combo);
        if (playGame(player) && player.cost < minimumCost) {
            minimumCost = player.cost;
        }
    })
    console.log("Part 1 - Minimum cost of equipment to kill the boss: " + minimumCost);
}

const part2 = () => {
    const allCombos = createAllPossibleCombos();

    let maximumCost = 0;
    allCombos.forEach(combo => {
        const player = createPlayerWithEquipment(combo);
        if (!playGame(player) && player.cost > maximumCost) {
            maximumCost = player.cost;
        }
    })
    console.log("Part 2 - Maximum cost of equipment to die to the boss: " + maximumCost);
}

part1();
part2();