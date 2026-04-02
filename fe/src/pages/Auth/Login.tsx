import { FormEvent, useState } from "react";
import styles from "./Auth.module.css";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Login</h2>
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
                    <button type="submit" className={`${styles.input} ${styles.registerBtn}`}>login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;