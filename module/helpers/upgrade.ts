import { CharacterSchema } from "../../types/actor-character";
import { UpgradeRule } from "../../types/upgrade";


export function upgrade(rules: UpgradeRule[], character: CharacterSchema): CharacterSchema {
    // Deep clone the character to avoid mutating the original object
    const newCharacter: CharacterSchema = JSON.parse(JSON.stringify(character));

    for (const rule of rules) {
        let effectsToApply = rule.effects;

        // Handle choice logic
        if (rule.choose !== undefined && rule.choose > 0) {
            effectsToApply = rule.effects.slice(0, rule.choose);
            console.log(`Upgrade choice made: Picking first ${rule.choose} options from`, rule.effects.map(e => e.name));
        }

        for (const effect of effectsToApply) {
            const { name, value } = effect;

            if (rule.target === "element") {
                const elementKey = name as keyof typeof newCharacter.elements;
                const target = newCharacter.elements[elementKey];
                
                if (target !== undefined) {
                    // Check if it's an object with a 'value' property or just a number
                    const isObject = typeof target === 'object' && target !== null && 'value' in target;
                    const currentVal = isObject ? (target as any).value : (target as unknown as number);
                    
                    let newVal = currentVal;
                    switch (rule.mode) {
                        case "add":
                            newVal = currentVal + value;
                            break;
                        case "set":
                            newVal = value;
                            break;
                        case "multiply":
                            newVal = Math.floor(currentVal * value);
                            break;
                    }

                    if (isObject) {
                        (newCharacter.elements[elementKey] as any).value = newVal;
                    } else {
                        (newCharacter.elements as any)[elementKey] = newVal;
                    }
                }
            } else if (rule.target === "skill") {
                const skillKey = name as keyof typeof newCharacter.skills;
                // Check if the skill exists in the schema
                if (skillKey in newCharacter.skills) {
                    const currentVal = newCharacter.skills[skillKey];

                    switch (rule.mode) {
                        case "add":
                            newCharacter.skills[skillKey] = currentVal + value;
                            break;
                        case "set":
                            newCharacter.skills[skillKey] = value;
                            break;
                        case "multiply":
                            newCharacter.skills[skillKey] = Math.floor(currentVal * value);
                            break;
                    }
                }
            }
        }
    }

    return newCharacter;
}
