import { Fragment } from "react";

export default function WorkGrid() {
  return (
    <div className="grid grid-cols-7 grid-rows-24 border border-gray-300 absolute inset-0">
      {Array.from({ length: 24 }).map((_, rowIndex) => (
        <Fragment key={rowIndex}>
          {Array.from({ length: 7 }).map((_, colIndex) => (
            <div key={colIndex} className="border border-gray-300">
              {/* Content for each cell */}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
