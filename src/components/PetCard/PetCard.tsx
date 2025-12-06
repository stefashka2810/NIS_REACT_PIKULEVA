import type {Pet, PetAction} from "../../types/pet.types.ts";
import {initialPetsState} from "../../data/pets.ts";
import {memo, useCallback, useEffect, useReducer, useRef} from "react";
import PetActions from "../PetActions/PetActions.tsx";
import usePetLifecycle from "../../hooks/usePetLifecycle.ts";
import styles from './PetCard.module.scss'

const PetCard = memo((initialPet: Pet) => {
    const [pet, dispatch] = useReducer(reducer, initialPet);
    const { decreaseEnergy, energy, mood, setEnergy, changeMood, access } = usePetLifecycle(initialPet);
    const avatarRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setEnergy(pet.energy);
    }, [pet.energy, setEnergy]);


    useEffect(() => {
        changeMood();
        dispatch({
            type: 'update_from_hook',
            payload: {
                mood: mood,
                energy: energy
            }
        })
    }, [changeMood, energy, mood]);

    useEffect(() => {
        const interval = setInterval(() => {
            decreaseEnergy();
        }, 50000);

        return () => clearInterval(interval);
    }, [decreaseEnergy]);

    const handleClickAction = useCallback((action: PetAction) => {
        dispatch(action);
        if (!avatarRef.current) return;

        const img = avatarRef.current;
        img.classList.remove(styles.glow);
        void img.offsetWidth;

        img.classList.add(styles.glow);

        setTimeout(() => {
            img.classList.remove(styles.glow);
        }, 1500);
    }, []);

    return (
        <div className={styles.section}>
            <div className={styles.card}>
                <header className={styles.cardTitleRow}>
                    <span style={access? {fontWeight: 'bold', fontSize: '25px'} : {fontWeight: 'bold', fontSize: '25px', color: 'darkred'} }>{pet.name.toUpperCase()}</span>
                    <span className={styles.row}>
                        <span className={styles.species}>{pet.species}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="saddlebrown" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="lucide lucide-paw-print-icon lucide-paw-print"><circle cx="11" cy="4" r="2"/><circle
                            cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path
                            d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
                        </svg>
                    </span>

                </header>

                <div className={styles.params}>
                    <span>
                        <span style={{fontWeight: 'bold'}}>{pet.mood}</span> mood
                    </span>
                    <span>
                        <span style={{fontWeight: 'bold'}}>{pet.energy}</span> energy
                    </span>
                    <span>
                        <span style={{fontWeight: 'bold'}}>{pet.level}</span> level
                    </span>
                </div>

                <div className={styles.levelBackground}>
                    <img
                        src={pet.avatar}
                        alt={'picture'}
                        ref={avatarRef}
                    ></img>
                </div>
            </div>

            <div className={styles.row2}>
                <PetActions onClick={handleClickAction} pet={pet} access={access}/>
            </div>

        </div>
    )
});

function reducer(pet: Pet, action: PetAction): Pet {
    switch (action.type) {
        case "feed":
            return {...pet, energy: Math.min(pet.energy + 10, 100)};
        case "level up":
            return {...pet, level: Math.min(pet.level + 1, 10)};
        case "pet":
        case "cheer":
            { const moodOrder: Pet['mood'][] = ['bad', 'normal', 'good', 'excellent'];
            const currentIndex = moodOrder.indexOf(pet.mood);
            const nextIndex = Math.min(currentIndex + 1, moodOrder.length - 1);
            return {...pet, mood: moodOrder[nextIndex]}; }
        case "reset":
            return initialPetsState.find(initialPet => initialPet.id === pet.id) || pet;
        case "update_from_hook":
            return {...pet, energy: action.payload?  action.payload.energy : 0, mood: action.payload?  action.payload.mood : 'bad'};
        default:
            return pet;
    }
}

export default PetCard;