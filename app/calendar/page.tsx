import CalendarGrid from "./calendarGrid";
import { useWorkContext } from "./workContext";

export default function CalendarPage() {
  const { works } = useWorkContext();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center pt-6 pb-4">
        Calendar Page
      </h1>
      <div className="px-4 pb-6">
        <CalendarGrid works={Object.keys(works)} />
      </div>
    </div>
  );
}
