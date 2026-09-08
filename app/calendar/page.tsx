import { useEffect, useState } from "react";
import CalendarGrid from "./calendarGrid";

export default function CalendarPage() {
  const [works, setWorks] = useState<string[]>([]);

  useEffect(() => {
    const works = { ...localStorage };
    setWorks(Object.keys(works));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center pt-6 pb-4">
        Calendar Page
      </h1>
      <div className="px-4 pb-6">
        <CalendarGrid works={works} />
      </div>
    </div>
  );
}
