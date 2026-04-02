import styles from "../../pages/Game/Game.module.css";

export const Square = ({ value, onClick }: any) => {
  return (
    <button
      className={`${styles.square} ${styles[value]}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};