import React from "react";

export default function VisualizeTable() {
  return (
    <div className="flex flex-col">
      <div className="">
        Find Shortest Path
      </div>
      <div>Select algorithm</div>
      <div className="flex flex-col grow">
        <div className="flex flex-row justify-around">
          <div>From vertex:</div>
          <div className="underline">1</div>
        </div>
        <div className="flex flex-row justify-around">
          <div>To vertex:</div>
          <div className="underline">10</div>
        </div>
      </div>
      <button className="self-center">Visualize</button>
    </div>
    );
}