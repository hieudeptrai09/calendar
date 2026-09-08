import CalendarGrid from "./calendarGrid";

export default function CalendarPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center pt-6 pb-4">
        Calendar Page
      </h1>
      <div className="px-4 pb-6">
        <CalendarGrid />
      </div>
    </div>
  );
}
