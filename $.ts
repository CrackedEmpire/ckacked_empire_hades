import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/portfolio";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Cracked Empire — character art" },
      {
        name: "description",
        content:
          "Cracked Empire, also Hades. Furries, humans, any species. Mechanical detail is priced higher. Boosty or ByBit.",
      },
    ],
  }),
});

function Home() {
  return <Portfolio />;
}
