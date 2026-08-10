import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  BarChartPro,
  LineChartPro,
  ScatterChartPro,
} from "@nuam/common-fe-lib-components";
import {
  type BarSeriesType,
  type LineSeriesType,
  type ScatterSeriesType,
} from "@mui/x-charts";

describe("Charts Pro components", () => {
  const barSeries: readonly BarSeriesType[] = [
    {
      type: "bar",
      data: [10, 20],
      label: "Series 1",
    },
  ];

  const lineSeries: readonly LineSeriesType[] = [
    {
      type: "line",
      data: [10, 18],
      label: "Line Series",
    },
  ];

  const scatterSeries: readonly ScatterSeriesType[] = [
    {
      type: "scatter",
      data: [
        { x: 0, y: 10 },
        { x: 1, y: 14 },
      ],
      label: "Scatter Series",
    },
  ];

  it("renders BarChartPro with a basic series", () => {
    const { container } = render(<BarChartPro series={barSeries} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders LineChartPro with a basic series", () => {
    const { container } = render(<LineChartPro series={lineSeries} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders ScatterChartPro with a basic series", () => {
    const { container } = render(<ScatterChartPro series={scatterSeries} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
