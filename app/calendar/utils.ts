import { LIMIT, MINUTE_PER_DAY, PREFIX } from "./constant";
import type { boundingClientRect } from "./type";

export const coordinateToDate = (
  screenX: number,
  screenY: number,
  boxRect?: boundingClientRect,
) => {
  if (!boxRect) return new Date().toISOString().slice(0, 16);
  const dateOffset = Math.floor(
    ((screenX - boxRect.left) * LIMIT) / boxRect.width,
  );
  const minuteFromMidnight =
    ((screenY - boxRect.top) * MINUTE_PER_DAY) / boxRect.height;
  const date = new Date();
  date.setDate(date.getDate() + dateOffset);
  date.setHours(0, minuteFromMidnight, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const dateToCoordinate = (
  dateTimeString: string,
  boxRect?: boundingClientRect,
) => {
  if (!boxRect) return { left: 0, top: 0 };
  const [date, time] = dateTimeString.split("T");
  const [hour, minute] = time.split(":");
  const minuteOffset = Number.parseInt(hour) * 60 + Number.parseInt(minute);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(date).getTime();
  const MS_PER_DAY = 86400000;
  const dateOffset = Math.round((start - today) / MS_PER_DAY);
  return {
    left: (dateOffset * boxRect.width) / LIMIT,
    top: (minuteOffset * boxRect.height) / MINUTE_PER_DAY,
  };
};

export const createWorkId = () =>
  `${PREFIX}${Math.floor(Math.random() * 1000000000).toString(36)}`;
