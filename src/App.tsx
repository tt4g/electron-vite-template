import { FC, useCallback } from "react";
import { useState } from "react";
import styles from "@/app.module.scss";

export const App: FC = () => {
  const [count, setCount] = useState(0);
  const countUp = useCallback(() => setCount((count) => count + 1), []);
  const countDown = useCallback(() => setCount((count) => count - 1), []);

  return (
    <main>
      <p className={styles.versions}>
        This app is using "Chrome {appVersions.chrome()}", "Node.js{" "}
        {appVersions.node()}", and "Electron {appVersions.electron()}".
      </p>
      <div>
        <p className={styles["count-info"]}>Count is: {count}</p>
        <button className={styles["count-up-button"]} onClick={countUp}>
          +1
        </button>
        <button className={styles["count-down-button"]} onClick={countDown}>
          -1
        </button>
      </div>
    </main>
  );
};
