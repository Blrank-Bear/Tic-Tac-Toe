import { FormEvent, useState } from "react"; // fix
import styles from "./Auth.module.css";
import { register } from "../../apis/auth.server";

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        register(email, password);
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        className={styles.input} 
                        placeholder="User Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input
                        type="password"
                        name="password"
                        className={styles.input} 
                        placeholder="User Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required />
                    <button type="submit" className={`${styles.input} ${styles.registerBtn}`}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;