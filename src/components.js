import React from "react";
import ChartWidget from './components/chart-widget.jsx'
import TestWidget1 from './components/test-widget.jsx'

const Components = {
  chartWidget: ChartWidget,
  testwidget: TestWidget1
};

export default block => {
  // component does exist
  if (typeof Components[block.component] !== "undefined") {
    return React.createElement(Components[block.component], {
      key: block.id,
      block: block
    });
  }
  // component doesn't exist yet
  return React.createElement(
    () => <div>The component {block.component} has not been created yet.</div>,
    { key: block.id}
  );
}