type WorkInner = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
};

type Work = Record<string, WorkInner>;
