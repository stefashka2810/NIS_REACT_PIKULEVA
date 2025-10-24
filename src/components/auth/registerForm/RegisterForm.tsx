import {useState} from "react";
import Button from "../../ui/button/Button.tsx";
import {useAuth} from "../../../hooks/useAuth.ts";
import {NavLink} from "react-router-dom";
import styles from "../Auth.module.css"

export const RegisterForm = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {error, register, clearError} = useAuth();

    const handleRegister = () => {
        register({username, email, password});
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        handleRegister();
    }
    
    const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) clearError(); 
        setter(e.target.value);
    }

    return (
        <div className={styles.form}>
            <form className={styles.formContent} onSubmit={handleSubmit}>
                <div className={styles.title}>
                    <NavLink to='/register'
                             style={({ isActive }) => ({
                                 color: isActive ? '#F5C61C' : 'grey',
                                 textDecoration: 'none',
                             })}>
                        РЕГИСТРАЦИЯ
                    </NavLink>
                    <span style={{color: '#F5C61C'}}>/</span>
                    <NavLink to='/login'
                             style={({ isActive }) => ({
                                 color: isActive ? '#F5C61C' : 'grey',
                                 textDecoration: 'none',
                             })}>
                        АВТОРИЗАЦИЯ
                    </NavLink>
                </div>
                {error &&
                    <div className={styles.error}>
                        {error}
                    </div>}
                <input
                    name='username'
                    type='text'
                    placeholder='Имя'
                    value={username}
                    onChange={handleInputChange(setUsername)}
                    className={styles.input}
                ></input>
                <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    className={styles.input}
                ></input>
                <input
                    name='password'
                    type='password'
                    placeholder='Пароль'
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    className={styles.input}
                ></input>
                <Button text='ОТПРАВИТЬ' color='#F5C61C' onClick={handleRegister} ></Button>
            </form>
        </div>
    )
}