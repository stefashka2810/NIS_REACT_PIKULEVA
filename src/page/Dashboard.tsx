import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Skeleton } from "@mui/material";

import { initialPetsState } from "../data/pets.ts";
import PetCard from "../components/PetCard/PetCard.tsx";
import EventLogPanel from "../components/EventLog/EventLogPanel.tsx";
import FilterSelect from "../components/FilterSelect/FilterSelect.tsx";

import type { Pet } from "../types/pet.types.ts";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pets, setPets] = useState<Pet[] | null>(null);
    const [filter, setFilter] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPets(initialPetsState);
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const filteredPets = useMemo(() => {
        if (filter && pets) {
            return pets.filter((pet) => pet.species === filter);
        }
        return pets;
    }, [filter, pets]);

    const handleClickFilter = useCallback((species: string | null) => {
        setFilter(species);
    }, []);

    const renderSkeletons = () => (
        <Box className={styles.cardRow}>
            {Array.from({ length: 9 }).map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        width: 280,
                        height: 210,
                        padding: 2,
                        borderRadius: "10px",
                        border: "3px solid saddlebrown",
                        backgroundColor: "#FBAD36",
                    }}
                >
                    <Skeleton variant="text" height={30} width="60%" sx={{ bgcolor: "#fff4d6" }} />
                    <Skeleton variant="text" height={20} width="40%" sx={{ bgcolor: "#fff4d6", mb: 1 }} />
                    <Skeleton variant="rounded" height={120} sx={{ bgcolor: "#fff4d6" }} />
                </Box>
            ))}
        </Box>
    );

    return (
        <>
            {isLoading && (
                <div className={styles.grid}>
                    <EventLogPanel />
                    <section className={styles.cardSection}>
                        <div className={styles.row}>
                            <FilterSelect value={filter} onChange={handleClickFilter} />
                        </div>
                        {renderSkeletons()}
                    </section>
                </div>
            )}

            {!isLoading && pets && (
                <div className={styles.grid}>
                    {/* SIDEBAR */}
                    <EventLogPanel />

                    {/* MAIN PET GRID */}
                    <section className={styles.cardSection}>
                        <div className={styles.row}>
                            <FilterSelect value={filter} onChange={handleClickFilter} />
                        </div>

                        <div className={styles.cardRow}>
                            {filteredPets && filteredPets.length > 0 ? (
                                filteredPets.map((pet) => (
                                    <PetCard key={pet.id} {...pet} />
                                ))
                            ) : (
                                <span>No pets found</span>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default Dashboard;
