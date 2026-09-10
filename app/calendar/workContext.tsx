import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PREFIX } from "./constant";
import type { Work, WorkInner } from "./type";
import { shiftWork, validate } from "./utils";

type WorkContextValue = {
  works: Work;
  saveWork: (workId: string, work: WorkInner) => void;
  moveWork: (workId: string, grabTime: string, dropTime: string) => void;
  removeWork: (workId: string) => void;
};

const WorkContext = createContext<WorkContextValue | null>(null);

export function WorkContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [works, setWorks] = useState<Work>({});

  useEffect(() => {
    const works: Work = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(PREFIX)) continue;
      try {
        works[key] = JSON.parse(localStorage.getItem(key)!);
      } catch {}
    }
    setWorks(works);
  }, []);

  const saveWork = useCallback((workId: string, work: WorkInner) => {
    localStorage.setItem(workId, JSON.stringify(work));
    setWorks((prev) => ({ ...prev, [workId]: work }));
  }, []);

  const moveWork = useCallback(
    (workId: string, grabTime: string, dropTime: string) => {
      setWorks((prev) => {
        const work = prev[workId];
        if (!work) return prev;
        const result = validate(shiftWork(work, grabTime, dropTime), prev, workId);
        if (!result.ok) return prev;
        localStorage.setItem(workId, JSON.stringify(result.work));
        return { ...prev, [workId]: result.work };
      });
    },
    [],
  );

  const removeWork = useCallback((workId: string) => {
    localStorage.removeItem(workId);
    setWorks(({ [workId]: _removed, ...rest }) => rest);
  }, []);

  const value = useMemo(
    () => ({ works, saveWork, moveWork, removeWork }),
    [works, saveWork, moveWork, removeWork],
  );

  return <WorkContext.Provider value={value}>{children}</WorkContext.Provider>;
}

export function useWorkContext() {
  const context = useContext(WorkContext);
  if (!context)
    throw new Error("useWorkContext must be used inside WorkProvider");
  return context;
}
