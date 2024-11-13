import { useLayoutEffect } from "react";

export const useLockBodyScroll = (lock: boolean) => {
	useLayoutEffect(() => {
		if (!lock) return;

		const originalStyle = window.getComputedStyle(document.body).overflow;
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;

		// Apply styles to lock scroll
		document.body.style.overflow = "hidden";
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}

		// Cleanup styles on unmount or when lock is false
		return () => {
			document.body.style.overflow = originalStyle;
			document.body.style.paddingRight = "";
		};
	}, [lock]);
};
