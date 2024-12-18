/** @type {import('@ladle/react').UserConfig} */
export default {
	appendToHead: `
		<link rel="preconnect" href="https://fonts.googleapis.com">
  	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
	`,
	outDir: "ladle-build",
	base: "/components-library/",
};
