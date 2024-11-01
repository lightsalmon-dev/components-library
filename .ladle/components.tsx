import "./globals.scss";
import type { GlobalProvider } from "@ladle/react";
import type { FC, PropsWithChildren } from "react";
import styles from "./components.module.scss";

export const Provider: GlobalProvider = ({ children }) => <>{children}</>;

export const StoryContainer: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};
