import { memo, useCallback, useState } from "react";
import type { FC } from "react";
import { Version } from "./components/Elements/Version";

import styles from "@/src/app.module.scss";

export const App: FC = memo(() => {
  const [count, setCount] = useState(0);
  const countUp = useCallback(() => setCount((count) => count + 1), []);
  const countDown = useCallback(() => setCount((count) => count - 1), []);

  return (
    <main>
      <section className={styles["AppVersions__section"]}>
        <p className={styles["AppVersions__container"]}>
          <Version
            target="Application version"
            version={appVersions.app()}
            className={styles["AppVersions__container__element"]}
          />
        </p>
        <p className={styles["AppVersions__container"]}>
          <span className={styles["AppVersions__container__element"]}>
            Runtime Version:
          </span>
          <Version
            target="Chrome"
            version={appVersions.chrome()}
            className={styles["AppVersions__container__element"]}
          />
          <Version
            target="Node.js"
            version={appVersions.node()}
            className={styles["AppVersions__container__element"]}
          />
          <Version
            target="Electron"
            version={appVersions.electron()}
            className={styles["AppVersions__container__element"]}
          />
        </p>
      </section>
      <section>
        <p className={styles["Count__info"]}>Count is: {count}</p>
        <button className={styles["Count__up-button"]} onClick={countUp}>
          +1
        </button>
        <button className={styles["Count__down-button"]} onClick={countDown}>
          -1
        </button>
      </section>
    </main>
  );
});
