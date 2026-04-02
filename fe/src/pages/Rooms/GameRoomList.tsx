import { createRoom, getRooms } from "../../services/game.service";
import { Room } from "../../types";
import styles from "./GameRoomList.module.css";

const GameRoomList = () => {
    const rooms: Room[] | null = getRooms();
    const user_id = localStorage.getItem('user_id');

    const handleCreate = () => {
        createRoom(user_id);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Game Rooms</h2>
            <button onClick={handleCreate} className={styles.createBtn}>+ create Room</button>
            <div className={styles.list}>
                {rooms != null ? Array.from(rooms).map((room: Room, idx) => (
                    <div key={idx} className={styles.roomCard}>
                        <span>RoomID: {room.id}</span>
                        <button className={styles.createBtn} onClick={() => (window.location.href = `/game/${room.id}`)}>
                            Join
                        </button>
                    </div>
                )) : null}
            </div>
        </div>
    );
};

export default GameRoomList;