export type boundingClientRect = {
  x: number;
  y: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
};

export type WorkInner = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
};

export type Work = Record<string, WorkInner>;

export type WorkErrors = Partial<Record<keyof WorkInner, string>>;

export type ValidationResult =
  | { ok: true; work: WorkInner }
  | { ok: false; errors: WorkErrors };
