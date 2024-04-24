import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
// import { getResponses } from "../../../controllers/poll";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function PollResponse(pollId) {
  // const [response, setResponse] = useState(null);

  // getResponses(pollId).then((data) => {
  //   //
  // });
  return (
    <BarChart
      width={500}
      height={300}
      series={[{ data: uData, label: "uv", id: "uvId" }]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}
