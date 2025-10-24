import { Clapperboard } from "lucide-react"
import styles from './Header.module.css'
import Button from "../../ui/button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth.ts";


const Header = () => {
    const navigate = useNavigate();
    const {isAuth, user, logout} = useAuth();

    return(
            <header className={styles.header}>
                <div className={styles.block}>
                    <div className={styles.logoBlock}>
                        <Clapperboard stroke='#F5C61C' strokeWidth={2}/>
                        <span className={styles.logo}>MULTIPOISK</span>
                    </div>
                    <div>
                        {!isAuth &&
                            <div>
                                <Button text="ВОЙТИ" color='#F5C61C' onClick={() => navigate('/login')}></Button>
                            </div>
                        }

                        {isAuth &&
                            <div className={styles.profile}>
                                <div className={styles.userName}>
                                    {user?.username}
                                </div>
                                <Button text="ВЫЙТИ" color='#F5C61C' onClick={logout}></Button>
                            </div>
                        }
                    </div>
                </div>
            </header>
    )
}

export default Header;