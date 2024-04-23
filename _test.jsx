import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getMonthYear } from "../../utils/Helpers";
import { FaInfinity } from "react-icons/fa6";
import classNames from "classnames";

/**
 * @description creates a line chart with two axes, `x` and `y`, based on the provided
 * data. It calculates the line's value and marker positions, and adds tooltips to
 * display the values for each point on the line.
 * 
 * @param { object } data - 2D array of data that is being plotted, which is used to
 * calculate and display various metrics such as the line's value and delta, as well
 * as the points on the line.
 * 
 * @param { metric/label for line chart representation. } metric - 0-based index of
 * an object property to extract from each data point and be used as the x-axis label
 * for the line chart.
 * 
 * 		- `metric`: The name of the metric to be displayed on the line chart.
 * 		- `label`: A string label for the line chart.
 * 
 * 	The `useEffect` hook is used to calculate and update the state variables `amount`,
 * `delta`, and `points` based on the input data. The `amount` variable is calculated
 * by reducing the input data to a single value using the `reduce` function, and then
 * setting it as the current value of the state. The `delta` variable is calculated
 * by taking the difference between the previous and latest values in the input data,
 * and then applying a threshold to determine whether the line should be classified
 * as positive or negative. Finally, the `points` array is updated with a new set of
 * objects containing the x and y values for each point on the line chart.
 * 
 * 	The `ResponsiveLine` component is used to render the line chart, which takes
 * several props, including `data`, `margin`, `yScale`, `tooltip`, `markers`, `curve`,
 * `enableGridX`, `enableGridY`, `lineWidth`, `colors`, `pointSize`, and `useMesh`.
 * The `data` prop is used to pass the array of points for the line chart, while the
 * `margin` prop is used to set the margins around the chart. The `yScale` prop is
 * used to define the scale for the y-axis, which is set to a linear scale with a
 * minimum value of 0 and a maximum value equal to the sum of the highest values in
 * the `points` array multiplied by 1.5.
 * 
 * 	The `tooltip` prop is used to define the tooltip text for each point on the chart,
 * which is generated using the `getMonthYear` function to extract the x-value and
 * y-value from the `point` object. The `markers` prop is used to add a line marker
 * to the chart, while the `curve` prop is used to set the curve type for the chart.
 * The `enableGridX` and `enableGridY` props are used to disable the grid lines for
 * the x-axis and y-axis, respectively. The `lineWidth` prop is used to set the width
 * of the line for the chart, while the `colors` prop is used to define the color
 * scheme for the chart. Finally, the `pointSize` prop is used to set the size of
 * each point on the chart, and the `useMesh` prop is used to enable mesh-style
 * rendering for the chart.
 * 
 * @param { string } label - text label for the line, which is displayed above the
 * line chart.
 * 
 * @returns { array } a line chart with markers and a curve, displaying the specified
 * metric over time.
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
       * @description takes an object `data` and extracts two values from it: `x` is the
       * value of `data.period`, while `y` is the value of `data[metric]`.
       * 
       * @param { object } data - dataset to be processed, providing the necessary information
       * for calculating the output value of the function.
       * 
       * @returns { object } a JSON object containing `x` and `y` properties, where `x`
       * represents the period and `y` represents the metric value.
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
       * @description generates a line chart with markers and a curve, using the given data
       * to create a visual representation of the data.
       * 
       * @param { array } data - 2D dataset to be visualized as a line, providing the x and
       * y values of each point in the dataset.
       * 
       * @param { object } margin - 10-pixel buffers applied to each side of the chart,
       * effectively setting the range of visible data based on top, right, bottom, and
       * left margins.
       * 
       * @param { `linear` scale. } yScale - scale for the y-axis, specifying the minimum
       * and maximum values of the data points, as well as the type of scaling to use (in
       * this case, linear).
       * 
       * 	1/ `type`: The scale type is set to "linear".
       * 	2/ `min`: The minimum value is set to 0.
       * 	3/ `max`: The maximum value is determined by calculating the maximum value among
       * all points in the dataset, and then multiplying it by 1.5 (or scaling it up by
       * 50%). This ensures that the y-axis has sufficient range to display the entirety
       * of the data distribution.
       * 	4/ `tooltip`: The tooltip text is generated based on the input `delta`. If `delta`
       * is true, the tooltip displays the month and year of each data point. Otherwise,
       * it returns null (i.e., no tooltip is displayed).
       * 
       * @param { React Element Ref. } tooltip - tooltip content that will be displayed
       * when the user hovers over a specific point on the line chart.
       * 
       * 		- `dataset`: This property refers to the data that is used to generate the line
       * chart. It is an array of objects, where each object represents a single data point
       * on the chart. Each data point consists of `x` and `y` properties, which correspond
       * to the x-axis and y-axis values, respectively.
       * 		- `margin`: This property sets the spacing between the lines and the edges of
       * the chart. It is an object with four properties: `top`, `right`, `bottom`, and
       * `left`. Each property sets the spacing value for that respective edge of the chart.
       * 		- `yScale`: This property sets the scale for the y-axis values. It is an object
       * with two properties: `type` and `minMax`. The `type` property can be either "linear"
       * or "logarithmic", depending on the type of scale required. The `minMax` property
       * sets the minimum and maximum values that the y-axis can take.
       * 		- `tooltip`: This property refers to a function that is called when the user
       * hovers over a data point on the chart. The function returns an HTML element
       * containing additional information about the data point, such as its x and y
       * coordinates and value.
       * 		- `markers`: This property sets the markers for the chart. It is an array of
       * objects, where each object represents a single marker. Each marker has properties
       * for the axis it belongs to (`axis`) and its characteristics, such as color, size,
       * and line style.
       * 		- `curve`: This property sets the curve type for the chart. It can be either
       * "natural" or "basis". The "natural" curve is a smooth, continuous line, while the
       * "basis" curve is a series of straight lines connecting the data points.
       * 		- `enableGridX`: This property sets whether to display the x-axis grid.
       * 		- `enableGridY`: This property sets whether to display the y-axis grid.
       * 		- `lineWidth`: This property sets the line width for the chart.
       * 		- `colors`: This property sets the colors used for the chart. It is an array of
       * strings, each representing a color.
       * 		- `pointSize`: This property sets the size of the data points on the chart.
       * 		- `useMesh`: This property sets whether to use a mesh for the chart instead of
       * a line.
       * 		- `enableCrosshair`: This property sets whether to display a crosshair on the
       * chart when the user hovers over it.
       * 
       * @param { object } markers - 2D markers to be displayed on the line chart, including
       * the default marker for the y-axis and an additional custom marker.
       * 
       * @param { string } curve - 3D curve used to visualize the data, with options for
       * linear, natural, and others available.
       * 
       * @param { boolean } enableGridX - x-axis grid lines display state, set to `false`
       * to hide them.
       * 
       * @param { boolean } enableGridY - visibility of the grid lines on the y-axis in the
       * chart, with a value of `false` indicating that the grid lines are not visible.
       * 
       * @param { number } lineWidth - width of the line used to draw the curve, and it is
       * set to 1.5 in this case to indicate a thick line.
       * 
       * @param { array } colors - 1-dimensional array of colors used to color the line
       * marker series.
       * 
       * @param { integer } pointSize - size of each data point marker on the chart, with
       * larger values resulting in bigger markers and smaller values resulting in smaller
       * markers.
       * 
       * @param { boolean } useMesh - 3D mesh visualization feature, which is enabled or
       * disabled through its value of `true` or `false`, respectively, allowing for a more
       * detailed and immersive representation of the data in the graph.
       * 
       * @param { boolean } enableCrosshair - enablement of crosshairs feature, which is
       * used to display a vertical line at a specific point on the chart when a user hovers
       * over it with their mouse.
       * 
       * @param { object } theme - configuration of the visualization's theme, including
       * the axis styling, line width, colors, and other elements.
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
