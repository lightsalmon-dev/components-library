import type { Story } from "@ladle/react";
import { useState } from "react";
import { StoryContainer } from "../../../.ladle/components";
import { Button } from "../button";
import { P } from "../typography";
import { Modal } from "./modal";

const textMiniModal =
	"Laudantium nihil dolorem deleniti quae eos. Et ut sequi corporis. Alias voluptatem laboriosam omnis sit ratione mollitia. Minus quis magnam a cupiditate et. Qui voluptatibus ea nostrum repudiandae quidem molestias. Et velit saepe vero aliquid id doloremque. Officia animi ut natus. Sit quis neque esse ut magnam sit. Iure aspernatur quasi voluptate exercitationem. Velit et provident nobis earum eligendi voluptatem.";
const textBigModal =
	"Laudantium nihil dolorem deleniti quae eos. Et ut sequi corporis. Alias voluptatem laboriosam omnis sit ratione mollitia. Minus quis magnam a cupiditate et. Qui voluptatibus ea nostrum repudiandae quidem molestias. Et velit saepe vero aliquid id doloremque. Officia animi ut natus. Sit quis neque esse ut magnam sit. Iure aspernatur quasi voluptate exercitationem. Velit et provident nobis earum eligendi voluptatem. Et reiciendis laudantium et nesciunt recusandae et sit illum. Pariatur et quas tempora molestiae. Illum impedit quis est nihil repellendus voluptatibus ipsum quibusdam. Neque quis quod ab qui aut. Sunt dicta quod nesciunt aut mollitia consectetur. Sequi dolores nihil molestiae consequuntur ut consequatur beatae inventore. Fuga ullam at voluptas velit qui tenetur minima fugit. Voluptas dicta deleniti facilis dolorem. Vitae nisi qui deleniti incidunt sapiente dolor. Culpa exercitationem nihil voluptas omnis. Quam excepturi aut quisquam consequatur.";

export const All: Story = () => {
	const [isDefaultDismissableModalOpen, setIsDefaultDismissableModalOpen] =
		useState(false);
	const [isMiniDismissableModalOpen, setIsMiniDismissableModalOpen] =
		useState(false);
	const [
		isDefaultNotDismissableModalOpen,
		setIsDefaultNotDismissableModalOpen,
	] = useState(false);
	const [isMiniNotDismissableModalOpen, setIsMiniNotDismissableModalOpen] =
		useState(false);
	const [isWithCustomBackdropOpen, setIsWithCustomBackdropOpen] =
		useState(false);

	const closeBigDismissableModal = () =>
		setIsDefaultDismissableModalOpen(false);
	const closeMiniDismissableModal = () => setIsMiniDismissableModalOpen(false);
	const closeBigNotDismissableModal = () =>
		setIsDefaultNotDismissableModalOpen(false);
	const closeMiniNotDismissableModal = () =>
		setIsMiniNotDismissableModalOpen(false);
	const closeWithCustomBackdrop = () => setIsWithCustomBackdropOpen(false);

	return (
		<StoryContainer>
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "30px",
					background: "red",
					zIndex: 1000,
				}}
			/>
			<button
				type="button"
				onClick={() => setIsDefaultDismissableModalOpen(true)}
			>
				Open default DISMISSABLE modal
			</button>
			<button type="button" onClick={() => setIsMiniDismissableModalOpen(true)}>
				Open mini DISMISSABLE modal
			</button>
			<button
				type="button"
				onClick={() => setIsDefaultNotDismissableModalOpen(true)}
			>
				Open default NOT DISMISSABLE modal
			</button>
			<button
				type="button"
				onClick={() => setIsMiniNotDismissableModalOpen(true)}
			>
				Open mini NOT DISMISSABLE modal
			</button>
			<button type="button" onClick={() => setIsWithCustomBackdropOpen(true)}>
				Open modal with custom backdrop
			</button>
			<Modal
				isOpen={isMiniDismissableModalOpen}
				closeModal={closeMiniDismissableModal}
				title="Mini dismissable modal"
				primaryButtonSlot={
					<Button onClick={closeMiniDismissableModal}>Confirm</Button>
				}
				secondaryButtonSlot={
					<Button onClick={closeMiniDismissableModal} variant="tertiary">
						Cancel
					</Button>
				}
				mini
			>
				<P>{textMiniModal}</P>
			</Modal>
			<Modal
				isOpen={isDefaultDismissableModalOpen}
				closeModal={closeBigDismissableModal}
				title="Default dismissable modal"
				primaryButtonSlot={
					<Button onClick={closeBigDismissableModal}>Confirm</Button>
				}
				secondaryButtonSlot={
					<Button onClick={closeBigDismissableModal} variant="tertiary">
						Cancel
					</Button>
				}
			>
				<P>{textBigModal}</P>
			</Modal>
			<Modal
				isOpen={isMiniNotDismissableModalOpen}
				closeModal={closeMiniNotDismissableModal}
				title="Mini not dismissable modal"
				primaryButtonSlot={
					<Button onClick={closeMiniNotDismissableModal}>Confirm</Button>
				}
				secondaryButtonSlot={
					<Button onClick={closeMiniNotDismissableModal} variant="tertiary">
						Cancel
					</Button>
				}
				dismissable={false}
				mini
			>
				<P>{textMiniModal}</P>
			</Modal>
			<Modal
				isOpen={isDefaultNotDismissableModalOpen}
				closeModal={closeBigNotDismissableModal}
				title="Default not dismissable modal"
				primaryButtonSlot={
					<Button onClick={closeBigNotDismissableModal}>Confirm</Button>
				}
				secondaryButtonSlot={
					<Button onClick={closeBigNotDismissableModal} variant="tertiary">
						Cancel
					</Button>
				}
				dismissable={false}
			>
				<P>{textBigModal}</P>
			</Modal>
			<Modal
				isOpen={isWithCustomBackdropOpen}
				closeModal={closeWithCustomBackdrop}
				title="Modal with custom backdrop"
				primaryButtonSlot={
					<Button onClick={closeWithCustomBackdrop}>Confirm</Button>
				}
				secondaryButtonSlot={
					<Button onClick={closeWithCustomBackdrop} variant="tertiary">
						Cancel
					</Button>
				}
				withNativeBackdrop={false}
			>
				<P>{textBigModal}</P>
			</Modal>
		</StoryContainer>
	);
};
