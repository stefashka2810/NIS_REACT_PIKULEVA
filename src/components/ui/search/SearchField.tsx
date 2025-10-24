import {useEffect, useRef, useState} from "react";
import styles from './Search.module.css'
import {Search} from "lucide-react";

const SearchField = ({onSaveSearchValue}:{onSaveSearchValue: (searchText: string) => void}) => {
    const [searchText, setSearchText] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSearchClick = () => {
        onSaveSearchValue(searchText);
    }

    useEffect(() => {
        onSaveSearchValue(searchText);
    }, [searchText]);

    return (
        <div className={styles.searchBlock}>
            <input
                type='text'
                placeholder='Ищу...'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                maxLength={50}
                ref={inputRef}
                className={styles.input}
            ></input>
            <div className={styles.searchIcon} onClick={handleSearchClick}>
                <Search width={20} height={20}/>
            </div>
        </div>
    )
}

export default SearchField;