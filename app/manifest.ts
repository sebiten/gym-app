import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GymApp",
    short_name: "GymApp",
    description:
      "Web publica y panel administrativo para gestionar socios, membresias y vencimientos de un gimnasio.",
    start_url: "/",
    display: "standalone",
    background_color: "#06080f",
    theme_color: "#06080f",
    lang: "es-AR"
  };
}
