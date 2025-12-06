import {useCallback, useState} from "react";
import type {Mood, Pet} from "../types/pet.types.ts";

const usePetLifecycle = (pet: Pet) => {
    const [energy, setEnergy] = useState<number>(pet.energy);
    const [mood, setMood] = useState<Mood>(pet.mood);
    const [access, setAccess] = useState<boolean>(true);

    const changeMood = useCallback(() => {
        if (energy <= 20) {
            setMood('bad')
            setAccess(false);
        } else if (energy > 20 && energy <= 60) {
            setMood('normal')
        } else if (energy > 60 && energy <= 80) {
            setMood('good')
        } else if (energy > 80) {
            setMood('excellent')
        }

    }, [energy])

    const decreaseEnergy = useCallback(() => {
        setEnergy(prev => Math.max(prev - 20, 0))
    }, []);

    return { decreaseEnergy, changeMood, setEnergy, mood, access, energy};
}

export default usePetLifecycle;