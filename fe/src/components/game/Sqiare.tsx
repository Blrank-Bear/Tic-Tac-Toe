import styles from "../../pages/Game/Game.module.css";

export const Square = ({ value, onClick }: any) => {
  return (
    <button
      className={`${styles.square} ${value === "X" ? styles.x : value === "O" ? styles.o : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};