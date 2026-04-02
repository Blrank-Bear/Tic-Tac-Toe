import styles from "./Button.module.css";

export const Button = ({ children, onClick }: any) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};