import {
	type FC,
	type MouseEventHandler,
	type PropsWithChildren,
	type ReactNode,
	useCallback,
	useEffect,
	useId,
	useRef,
} from "react";
import { IconXMark } from "../../icons/icon-x-mark";
import cn from "../../utils/cn";
import { H3 } from "../typography";

type Modal = FC<
	PropsWithChildren<{
		isOpen: boolean;
		closeModal: () => void;
		title: string;
		className?: string;
		primaryButtonSlot: ReactNode;
		secondaryButtonSlot?: ReactNode;
		mini?: boolean;
		dismissable?: boolean;
	}>
>;

export const Modal: Modal = ({
	children,
	isOpen,
	closeModal,
	title,
	className,
	primaryButtonSlot,
	secondaryButtonSlot,
	mini,
	dismissable = true,
}) => {
	const ref = useRef<HTMLDialogElement>(null);
	const titleId = useId();

	// react to the isOpen prop, opening / closing the dialog
	useEffect(() => {
		const shouldOpen = isOpen && !ref.current?.open;
		const shouldClose = !isOpen && ref.current?.open;
		if (shouldOpen) {
			ref.current?.showModal();
		} else if (shouldClose) {
			ref.current?.close();
		}
	}, [isOpen]);

	// detect key down of the escape key to close the modal, when is open, if the modal is dismissable then close it
	// otherwise prevent the default behavior
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (isOpen && event.key === "Escape") {
				if (dismissable) {
					closeModal();
				} else {
					event.preventDefault();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, closeModal, dismissable]);

	// A function to handle clicks on the dialog backdrop, possibly closing the modal if the click is outside the dialog.
	const handlePossibleClickOnBackdrop = useCallback<
		MouseEventHandler<HTMLDialogElement>
	>(
		(event) => {
			// Check if the dialog element is present, but only if the dialog is dismissable
			if (dismissable && ref.current) {
				// Get the position and dimensions of the dialog
				const rect = ref.current.getBoundingClientRect();

				// Determine if the click is inside the dialog's bounding box
				const isClickInsideDialog =
					event.clientY >= rect.top && // Click is below the top edge
					event.clientY <= rect.bottom && // Click is above the bottom edge
					event.clientX >= rect.left && // Click is right of the left edge
					event.clientX <= rect.right; // Click is left of the right edge

				// If the click is outside the dialog, close the modal
				if (!isClickInsideDialog) {
					closeModal();
				}
			}
		},
		[closeModal, dismissable],
	);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: It's fine to use click events here, as it's not a button
		<dialog
			className={cn(
				"ls-dialog",
				{
					"ls-dialog-dismissable": dismissable,
					"ls-dialog-mini": mini,
				},
				className,
			)}
			onClick={handlePossibleClickOnBackdrop}
			ref={ref}
			aria-labelledby={titleId}
		>
			<header className="ls-dialog-header">
				<H3 id={titleId} className="ls-dialog-header-title">
					{title}
				</H3>
				{dismissable && (
					<button
						className="ls-dialog-close-button"
						onClick={closeModal}
						aria-label="Close modal"
						type="button"
					>
						<IconXMark />
					</button>
				)}
			</header>
			<div className="ls-dialog-body">{children}</div>
			<footer className="ls-dialog-footer">
				{secondaryButtonSlot && <div>{secondaryButtonSlot}</div>}
				<div>{primaryButtonSlot}</div>
			</footer>
		</dialog>
	);
};
