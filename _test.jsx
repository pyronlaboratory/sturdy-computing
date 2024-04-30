import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getMonthYear } from "../../utils/Helpers";
import { FaInfinity } from "react-icons/fa6";
import classNames from "classnames";


/**
 * @description Uses state to calculate and display line data, including the line's
 * value, delta (change), and markers for each point on the line.
 * 
 * @param { object } data - 2D array of data points that will be plotted on the line
 * chart, and it is used to calculate the line's y value and to populate the tooltip
 * with the correct labels and values.
 * 
 * @param { unknown or unspecified type, as it is not specified directly in the
 * provided code snippet. } metric - 0-based index of the data series to be plotted.
 * 
 * 		- `metric`: The name of the metric to be displayed on the line chart.
 * 		- `label`: The label text for the line chart.
 * 
 * 	The `useEffect` hook is used to effectively update the state of the component
 * when the `data` prop changes. Here's what it does:
 * 
 * 		- `data.length > 1`: Checks if there are more than one data point in the `data`
 * array. If so, proceed with calculating the line chart.
 * 		- `setAmount(data.reduce((acc, current) => { ... }))`: Calculates the total value
 * of all data points by summing up their values using the `reduce` method.
 * 		- `const previous = data[data.length - 2][metric]`: Gets the previous value of
 * the metric from the second-to-last data point.
 * 		- `const latest = data[data.length - 1][metric]`: Gets the latest value of the
 * metric from the last data point.
 * 		- `setDelta(((100 * (latest - previous)) / previous).toFixed(1))`): Calculates
 * and sets the line chart's delta value by taking the difference between the latest
 * and previous values, multiplying it by 100, and then rounding it to one decimal place.
 * 		- `const _points = [ ... ]`: Creates an array of points for the line chart.
 * 		- `setPoints(_points)`: Updates the component's state with the new array of points.
 * 
 * 	The `deltaClasses` class is defined using the `classNames` function, which takes
 * an array of class names and applies them to the element. In this case, it creates
 * a class that displays the line chart's delta value as either positive, negative,
 * or baseline (i.e., 0) based on its absolute value.
 * 
 * @param { string } label - text label for the line chart, which is displayed near
 * the line on the chart.
 * 
 * @returns { object } a React component that displays a line graph with points and
 * markers.
 */
const Line = ({ data, metric, label }) => {
  
  const [amount, setAmount] = useState(0);
  const [delta, setDelta] = useState(0.0);
  const [points, setPoints] = useState([]);
  useEffect(() => {
    if (data.length > 1) {
      setAmount(
        data.reduce((acc, current) => {
          return current[metric] + acc;
        }, 0),
      );

      const previous = data[data.length - 2][metric];
      const latest = data[data.length - 1][metric];
      setDelta(((100 * (latest - previous)) / previous).toFixed(1));

      /**
       * @description Takes a `data` object containing a `period` property and an optional
       * `metric` property. It returns an object with two properties, `x` set to the value
       * of `period`, and `y` set to the value of `metric`.
       * 
       * @param { object } data - dataset to be processed, providing the `x` coordinate
       * (representing the time period) and the `y` coordinate (representing the metric value).
       * 
       * @returns { object } a data object with `x` and `y` properties, where `x` represents
       * the given period and `y` represents the value of the specified metric.
       */
      const _points = [
        {
          id: metric,
          data: data.map((data) => ({
            x: data.period,
            y: data[metric],
          })),
        },
      ];
      setPoints(_points);
    } else {
      setAmount(data?.[0]?.[metric]);
      setDelta(null);
      setPoints([]);
    }
  }, [data]);

  const deltaClasses = classNames(
    "delta",
    delta >= 0 ? "positive" : "negative",
    isFinite(delta) && "baseline",
  );

  return (
    <div className="line">
      <div className="title">{label}</div>

      <div className="content">
        <div className="value">{amount?.toLocaleString("en-US") ?? 0}</div>

        <div>
          {isFinite(delta) ? (
            <div className={deltaClasses}>
              <span>{delta >= 0 ? "↑" : "↓"}</span>
              <span className="number">{Math.abs(delta)}</span>
              <span className="percent">%</span>
            </div>
          ) : null}
        </div>
      </div>

      
      
      
      {/**
       * @description Creates an interactive line plot, with a customizable y-scale and
       * tooltip displaying the month and value for each point on the line.
       * 
       * @param { array } data - 2D points data array that will be rendered on the chart
       * as markers.
       * 
       * @param { object } margin - 10px padding around the chart, applying to the top,
       * right, bottom, and left borders of the chart area.
       * 
       * @param { linear scale. } yScale - scalar that defines the range of values displayed
       * on the y-axis, with a minimum value of 0 and a maximum value determined by the
       * maximum value of the `points` array multiplied by a factor of 1.5.
       * 
       * 		- `type`: The type of scaling used for the y-axis is 'linear'.
       * 		- `min`: The minimum value on the y-axis is 0.
       * 		- `max`: The maximum value on the y-axis is the maximum value among all points
       * in the dataset, which is calculated as the maximum of the `y` values of each point
       * in the first dimension of the input array, multiplied by 1.5.
       * 
       * 	Note that if `delta` is true, then a tooltip is displayed for each point on the
       * line, showing the month and year of the corresponding data point.
       * 
       * @param { element of type ReactNode. } tooltip - content of the tooltip that appears
       * when the user hovers over a point on the line chart, and it is rendered as a React
       * element inside a `div` with a specified CSS class.
       * 
       * 		- `datum`: The current point being rendered on the line.
       * 		- `delta`: A boolean indicating whether to display the tooltip for the current
       * point or not. If true, the tooltip will be displayed; otherwise, it will be hidden.
       * 		- `getMonthYear()`: A function that formats a date as a string in the format
       * "month year". This function is used to display the date in the tooltip.
       * 		- `point`: The current point being rendered on the line.
       * 		- `x`: The x-coordinate of the current point.
       * 		- `y`: The y-coordinate of the current point.
       * 
       * @param { object } markers - 2D markers to be displayed on the line chart, including
       * the default marker for the y-axis and an additional custom marker with specified
       * properties.
       * 
       * @param { string } curve - type of curve to use for the line chart, with possible
       * values including "natural", "linear", and others.
       * 
       * @param { boolean } enableGridX - horizontal grid lines, disabling it hides them
       * from view.
       * 
       * @param { boolean } enableGridY - vertical grid lines in the chart, disabling it
       * will hide them.
       * 
       * @param { number } lineWidth - width of the line used to render the mesh, which can
       * be adjusted from 1 to 10.
       * 
       * @param { array } colors - 1-dimensional color palette for the line chart, with
       * each color representing a unique point on the chart.
       * 
       * @param { integer } pointSize - point size of the marker, which determines the
       * visual size of each point on the line.
       * 
       * @param { boolean } useMesh - 3D mesh visualization feature, which when set to
       * `true`, enables the display of a mesh surface overlaid on top of the line chart,
       * providing a more detailed and interactive representation of the data.
       * 
       * @param { boolean } enableCrosshair - crosshair visibility, which when set to false
       * disables the display of a crosshair marker at the current point on the graph.
       * 
       * @param { object } theme - axis theme, which sets the appearance of the x-axis and
       * y-axis lines, ticks, and grid, among other options.
       */}
      <ResponsiveLine
        data={points}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        yScale={{
          type: "linear",
          min: 0,
          max: points.length
            ? Math.max(...points[0].data.map((d) => d.y)) * 1.5
            : 10000,
        }}
        tooltip={(datum) => {
          if (delta) {
            return (
              <div className="line-tooltip">
                <span className="label">
                  {getMonthYear(datum.point.data.x)}
                </span>
                :<span className="value"> {datum.point.data.y}</span>
              </div>
            );
          } else {
            return null;
          }
        }}
        markers={[
          {
            axis: "y",
            lineStyle: {
              stroke: "#717d86",
              strokeWidth: 1.5,
            },
            value: 0,
          },
        ]}
        curve={"natural"}
        enableGridX={false}
        enableGridY={false}
        lineWidth={1.5}
        colors={["#26de81"]}
        pointSize={1}
        useMesh={true}
        enableCrosshair={false}
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: "none",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Line;
