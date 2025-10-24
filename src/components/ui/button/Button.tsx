import styles from './Button.module.css'

interface Props {
    text: string,
    color?: string,
    textColor?: string,
    onClick?: (event: React.MouseEvent<HTMLElement>) => void,
    type?: 'button' | 'submit' | 'reset',
}

const Button = ({text, color, textColor, onClick, type = 'button'}: Props) => {
    return (
        <button 
            className={styles.button}
            type={type}
            style={{ backgroundColor: color,
                     color: textColor}} 
            onClick={onClick}>
            {text}
        </button>
    )
}
export default Button;