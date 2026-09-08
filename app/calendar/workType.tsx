type WorkInner = {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
};

type Work = Record<string, WorkInner>;
