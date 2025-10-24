import { SquareMenu,  InspectionPanel} from 'lucide-react';
import {useState} from "react";
import styles from "./Toggle.module.css"

const Toggle = ({onModeClick}:{onModeClick: (mode: 'список' | 'плитка') => void}) => {
    const [mode, setMode] = useState<'список' | 'плитка'>('список');

    return (
        <div className={styles.toggleBlock}>
            {mode === 'список' &&
                <div onClick={() => {
                    setMode('плитка');
                    onModeClick('плитка');
                }} className={styles.toggleButton}>
                    <SquareMenu color='black'/>
                </div>
            }

            {mode === 'плитка' &&
                <div onClick={() => {
                    setMode('список');
                    onModeClick('список');
                }} className={styles.toggleButton}>
                    <InspectionPanel color='black'/>
                </div>
            }
        </div>
    )
}

export default Toggle;