import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getMonthYear } from "../../utils/Helpers";
import { FaInfinity } from "react-icons/fa6";
import classNames from "classnames";


/**
 * @description uses the `useEffect` hook to compute and render a line chart based
 * on an array of data. It handles the calculation and rendering of the line, as well
 * as adding tooltips for points on the line.
 * 
 * @param { array } data - 2D array of data to be visualized, which is used to calculate
 * the line's value and delta, and to populate the tooltip information.
 * 
 * @param { string } metric - 0-based index of a metric in the `data` array, which
 * is used to calculate the line's value and other properties.
 * 
 * @param { string } label - text displayed alongside the line chart, typically
 * indicating the metric being plotted.
 * 
 * @returns { `ReactElement`. } a line chart showing the given data, with points
 * labeled and a tooltip for each point.
 * 
 * 		- `div.title`: The title of the line.
 * 		- `div.content`: The content of the line, which includes the value and a marker
 * for the line.
 * 		- `div.value`: The value of the line.
 * 		- `div.baseline`: Whether the line is baselined or not.
 * 		- `div.negative` or `div.positive`: Whether the line is negative or positive, respectively.
 * 		- `div.number`: The number associated with the line.
 * 		- `div.percent`: The percentage associated with the line.
 * 		- `ResponsiveLine`: A component that renders a responsive line graph.
 * 		- `data`: An array of data points.
 * 		- `margin`: An object that defines the margins for the graph.
 * 		- `yScale`: An object that defines the scale for the y-axis.
 * 		- `tooltip`: A function that returns a tooltip for the line.
 * 		- `markers`: An array of markers for the line.
 * 		- `curve`: The curve type for the line.
 * 		- `enableGridX`: Whether to enable the x-axis grid.
 * 		- `enableGridY`: Whether to enable the y-axis grid.
 * 		- `lineWidth`: The width of the line.
 * 		- `colors`: An array of colors for the line.
 * 		- `pointSize`: The size of the points on the line.
 * 		- `useMesh`: Whether to use a mesh for the line.
 * 		- `enableCrosshair`: Whether to enable the crosshair for the line.
 * 		- `theme`: An object that defines the theme for the graph.
 * 
 * 	Note: The ` Line` function is a reusable component that takes an array of data
 * as input and renders a line graph with customizable properties.
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
       * @description takes in an object `data` and extracts the values of the `x` property
       * and the value of the `y` property for a specific metric.
       * 
       * @param { object } data - dataset to be processed, providing the necessary context
       * for the function to operate.
       * 
       * @returns { object } a pair of objects containing the input `x` and `y` values.
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
       * @description generates a line chart with a custom y-scale based on the length of
       * the data points, and adds a tooltip to display the month and value for each point.
       * 
       * @param { object } data - 2D point data to be visualized on the chart, which includes
       * the x and y values of each point.
       * 
       * @param { object } margin - 10-pixel buffers added to the top, right, bottom, and
       * left of the chart area to prevent clipping of the lines when they touch the edges
       * of the chart.
       * 
       * @param { `linear` scale. } yScale - 0-10000 range for the y-axis of the line chart,
       * and sets the minimum and maximum values for each point's y coordinate based on the
       * provided data.
       * 
       * 		- `type`: The scale type is set to "linear", indicating that the data will be
       * displayed as a continuous line with no gaps or jumps.
       * 		- `min`: The minimum value of the scale is set to 0, which means that the lowest
       * possible y-value is 0.
       * 		- `max`: The maximum value of the scale is calculated based on the highest value
       * in the input data array. If there are multiple peaks with the same height, the
       * maximum value will be set to the average of those values. The maximum value is
       * multiplied by 1.5 to create a more dramatic effect when hovering over the line.
       * 		- `tooltip`: A tooltip function is defined to display additional information
       * when the user hovers over a point on the line. The function takes a single argument,
       * `datum`, which contains information about the point being hovered over. If `delta`
       * is set to true, the tooltip will display the month and year of the data point,
       * otherwise it will return null.
       * 
       * @param { ReactElementref. } tooltip - tooltip text to display when the user hovers
       * over a point on the line chart, providing additional information about the data
       * point, such as the date and value.
       * 
       * 		- `tooltip`: If `delta` is true, then `tooltip` returns a React component that
       * displays the date and value of each data point. The component consists of two
       * elements: `<span>` and `<span>`. The first `<span>` has a class of "label", and
       * the second `<span>` has a class of "value".
       * 		- `datum`: The current data point being hovered over.
       * 		- `point`: The point being hovered over, with its `x` and `y` coordinates.
       * 		- `data`: The array of data points.
       * 
       * 	The various attributes of `tooltip` are:
       * 
       * 		- `className`: The class name of the container element for the tooltip.
       * 		- `style`: An object of CSS styles to apply to the tooltip container.
       * 		- `onHover`: A callback function that is triggered when the user hovers over a
       * data point. The function takes `datum` and `point` as arguments.
       * 
       * 	Note: The `tooltip` property is only available if `delta` is set to true.
       * 
       * @param { array } markers - 2D marker collection that displays as lines on the
       * chart, with each line corresponding to a specific value of the data points.
       * 
       * @param { string } curve - curvature of the line plot, with possible values being
       * "natural", "linear", or "logarithmic".
       * 
       * @param { boolean } enableGridX - 2D grid display for the line plot, and when set
       * to `false`, it disables the grid lines in the x-axis, making the visualization of
       * the data more fluid and unobstructed.
       * 
       * @param { boolean } enableGridY - vertical grid lines, disabling them will hide
       * them from being displayed on the graph.
       * 
       * @param { 1.5-valued scalar. } lineWidth - width of the line used to display the
       * generated documentation for the code, with a value of 1.5 in this case.
       * 
       * 		- `lineWidth`: The width of the line representing the chart data.
       * 		- `margin`: An object that defines the margins around the chart area.
       * 		- `yScale`: A scale defining the range of values for the vertical axis.
       * 		- `tooltip`: A function that generates a tooltip element for each point on the
       * line, displaying the x-axis value and y-axis value.
       * 		- `markers`: An array of objects defining the markers displayed on the chart.
       * In this case, there is only one marker defined with an axis of "y" and a line style.
       * 		- `curve`: The type of curve used to draw the line.
       * 		- `enableGridX`: Whether to display the grid for the x-axis.
       * 		- `enableGridY`: Whether to display the grid for the y-axis.
       * 		- `colors`: An array of colors used to fill the markers.
       * 		- `pointSize`: The size of each point on the line.
       * 		- `useMesh`: Whether to use a mesh or not for the line.
       * 		- `enableCrosshair`: Whether to display a crosshair on the chart.
       * 
       * @param { array } colors - 6 colors to be used for the line chart's markers, with
       * the value `#26de81` specifying the color of the first marker.
       * 
       * @param { integer } pointSize - size of each point on the line chart, with a value
       * of 1 indicating that each point is sized equally.
       * 
       * @param { boolean } useMesh - 3D mesh visualization of the data, which is enabled
       * by default to provide a more detailed and interactive representation of the data.
       * 
       * @param { boolean } enableCrosshair - enablement of a crosshair display on the line
       * chart, with a value of `false` disabling it.
       * 
       * @param { object } theme - visual theme of the line chart, including options for
       * axis ticks, line styles, and point sizes.
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
