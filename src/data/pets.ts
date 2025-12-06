import petsJson from './pets.json'
import type {Pet} from "../types/pet.types.ts";

export const initialPetsState: Pet[]  = petsJson.pets as Pet[];