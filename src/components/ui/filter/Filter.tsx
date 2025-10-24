import styles from './Filter.module.css';
import {useState} from "react";

const Filter = ({handleFilter}: {handleFilter: Function}) => {
    const [toogle, setToogle] = useState<'все' | 'любимые'>('все');

    return (
        <div className={styles.filterBlock}>
            <div onClick={() => {
                setToogle('все');
                handleFilter('все');
            } } className={toogle==='все' ? styles.filterItemActive : styles.filterItem}>
                ВСЕ
            </div>
            <div onClick={() => {
                setToogle('любимые');
                handleFilter('любимые');
            }} className={toogle==='любимые' ? styles.filterItemActive : styles.filterItem}>
                ЛЮБИМЫЕ
            </div>
        </div>
    )
}

export default Filter;