import React, { useEffect, useRef } from "react";
import { GoslingComponent, GoslingRef } from "gosling.js";

const goslingSpec = {
  title: "Basic Marks: bar",
  subtitle: "Tutorial Examples",
  tracks: [
    {
      layout: "linear",
      width: 800,
      height: 180,
      data: {
        url: "https://resgen.io/api/v1/tileset_info/?d=UvVPeLHuRDiYA3qwFlm7xQ",
        type: "multivec",
        row: "sample",
        column: "position",
        value: "peak",
        categories: ["sample 1"],
        binSize: 5,
      },
      mark: "bar",
      x: { field: "start", type: "genomic", axis: "bottom" },
      xe: { field: "end", type: "genomic" },
      y: { field: "peak", type: "quantitative", axis: "right" },
      size: { value: 5 },
    },
  ],
};

function App() {
  const gosRef = useRef<GoslingRef>(null);

  useEffect(() => {
    if (gosRef.current) {
      const currentRef = gosRef.current;
      // specProcessed
      currentRef.api.subscribe("specProcessed", (_, data) => {
        console.log("specProcessed", data);
      });
    }
    return () => gosRef.current?.api.unsubscribe("specProcessed");
  }, [gosRef.current])

  return (
    <div>
      <GoslingComponent ref={gosRef} spec={goslingSpec} />
    </div>
  );
}

export default App;
