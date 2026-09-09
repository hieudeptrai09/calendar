import type { Route } from "./+types/home";
import CalendarPage from "../calendar/page";
import { WorkContextProvider } from "~/calendar/workContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Calendar App" },
    { name: "description", content: "A simple calendar application." },
  ];
}

export default function Home() {
  return (
    <WorkContextProvider>
      <CalendarPage />
    </WorkContextProvider>
  );
}
