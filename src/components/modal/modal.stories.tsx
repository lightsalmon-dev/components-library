import type { Story } from "@ladle/react";
import { useState } from "react";
import { StoryContainer } from "../../../.ladle/components";
import { Button } from "../button";
import { P } from "../typography";
import { Modal } from "./modal";

export const All: Story = () => {
	const [isDefaultModalOpen, setIsDefaultModalOpen] = useState(false);
	const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);
	const closeBigModal = () => setIsDefaultModalOpen(false);
	const closeMiniModal = () => setIsMiniModalOpen(false);

	return (
		<StoryContainer>
			<button type="button" onClick={() => setIsDefaultModalOpen(true)}>
				Open default modal
			</button>
			<button type="button" onClick={() => setIsMiniModalOpen(true)}>
				Open mini modal
			</button>
			<Modal
				isOpen={isMiniModalOpen}
				closeModal={closeMiniModal}
				title="Mini modal"
				primaryButtonSlot={<Button onClick={closeMiniModal}>Confirm</Button>}
				secondaryButtonSlot={
					<Button onClick={closeMiniModal} variant="tertiary">
						Cancel
					</Button>
				}
				mini
			>
				<P>
					Laudantium nihil dolorem deleniti quae eos. Et ut sequi corporis.
					Alias voluptatem laboriosam omnis sit ratione mollitia. Minus quis
					magnam a cupiditate et. Qui voluptatibus ea nostrum repudiandae quidem
					molestias. Et velit saepe vero aliquid id doloremque. Officia animi ut
					natus. Sit quis neque esse ut magnam sit. Iure aspernatur quasi
					voluptate exercitationem. Velit et provident nobis earum eligendi
					voluptatem.
				</P>
			</Modal>
			<Modal
				isOpen={isDefaultModalOpen}
				closeModal={closeBigModal}
				title="Default modal"
				primaryButtonSlot={<Button onClick={closeBigModal}>Confirm</Button>}
				secondaryButtonSlot={
					<Button onClick={closeBigModal} variant="tertiary">
						Cancel
					</Button>
				}
			>
				<P>
					Laudantium nihil dolorem deleniti quae eos. Et ut sequi corporis.
					Alias voluptatem laboriosam omnis sit ratione mollitia. Minus quis
					magnam a cupiditate et. Qui voluptatibus ea nostrum repudiandae quidem
					molestias. Et velit saepe vero aliquid id doloremque. Officia animi ut
					natus. Sit quis neque esse ut magnam sit. Iure aspernatur quasi
					voluptate exercitationem. Velit et provident nobis earum eligendi
					voluptatem. Et reiciendis laudantium et nesciunt recusandae et sit
					illum. Pariatur et quas tempora molestiae. Illum impedit quis est
					nihil repellendus voluptatibus ipsum quibusdam. Neque quis quod ab qui
					aut. Sunt dicta quod nesciunt aut mollitia consectetur. Sequi dolores
					nihil molestiae consequuntur ut consequatur beatae inventore. Fuga
					ullam at voluptas velit qui tenetur minima fugit. Voluptas dicta
					deleniti facilis dolorem. Vitae nisi qui deleniti incidunt sapiente
					dolor. Culpa exercitationem nihil voluptas omnis. Quam excepturi aut
					quisquam consequatur.
				</P>
			</Modal>
		</StoryContainer>
	);
};
