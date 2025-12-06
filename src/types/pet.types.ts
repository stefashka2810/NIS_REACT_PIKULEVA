export type Pet = {
    id: number;
    name: string;
    species: string;
    mood: Mood;
    energy: number;
    level: number;
    avatar: string;
};

export type PetAction = {
    type: 'feed' | 'level up' | 'cheer' | 'pet' | 'reset' | 'update_from_hook';
    payload?: {
        energy: number;
        mood: Mood;
    }
};

export type Mood = 'bad' | 'normal' | 'good' | 'excellent';

