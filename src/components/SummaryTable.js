import React from "react";

export default function SummaryTable() {
  return (
    <div className="flex flex-col">
      <div className="">
        Graph Summary
      </div>
      <div className="flex flex-col grow">
        <div className="flex flex-row justify-around">
          <div>Node count:</div>
          <div className="underline">1</div>
        </div>
        <div className="flex flex-row justify-around">
          <div>Edge count:</div>
          <div className="underline">10</div>
        </div>
      </div>
    </div>
  );
}