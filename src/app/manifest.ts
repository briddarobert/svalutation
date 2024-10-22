import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		theme_color: "#8936FF",
		background_color: "#2EC6FE",
		icons: [
			{
				purpose: "maskable",
				sizes: "512x512",
				src: "icon512_maskable.png",
				type: "image/png",
			},
			{
				purpose: "any",
				sizes: "512x512",
				src: "icon512_rounded.png",
				type: "image/png",
			},
		],
		orientation: "any",
		display: "standalone",
		dir: "auto",
		lang: "it-IT",
		name: "Svalutation",
		short_name: "Svalutation",
		start_url: "http://85.235.150.118:3000/",
		scope: "http://85.235.150.118:3000/",
		description: "This app is awesome",
	};
}
