type ButtonProps = {
    children: React.ReactNode;
    variant?:'primary' |'secondary';
    disabled?:boolean;
    onClick?:()=>void;
};

const styles = {
    primary: 'bg-blue-500 text-white font-bold py-2 px-4 rounded',
    secondary: 'bg-gray-500 text-white font-bold py-2 px-4 rounded',
    disabled: 'opacity-50 cursor-not-allowed',
}

export default function Button({ children, variant = 'primary', disabled = false, onClick }: ButtonProps) {
    return (
        <button className={`${styles[variant]} ${disabled ? styles.disabled : ''}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}