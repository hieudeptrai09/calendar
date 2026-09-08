import type { Route } from "./+types/home";
import CalendarPage from "../calendar/page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Calendar App" },
    { name: "description", content: "A simple calendar application." },
  ];
}

export default function Home() {
  return <CalendarPage />;
}