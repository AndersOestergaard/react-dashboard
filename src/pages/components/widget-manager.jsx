import React, { Component } from "react";

const widgetsList = 
[
    {
        name: 'Widget1',
        xPosition: 1,
        yPosition: 1,
        colWidth: 2,
        colHeight: 2,
        minColWidth: 2,
        maxColWidth: 0,
        minColHeight: 2,
        maxColHeight: 0,
        static: false,
        isDraggable: true,
        isResizable: true
    },
    {
        name: 'Widget2',
        xPosition: 1,
        yPosition: 1,
        colWidth: 2,
        colHeight: 2,
        minColWidth: 2,
        maxColWidth: 0,
        minColHeight: 2,
        maxColHeight: 0,
        static: false,
        isDraggable: true,
        isResizable: true
    },
    {
        name: 'Widget3',
        xPosition: 1,
        yPosition: 1,
        colWidth: 2,
        colHeight: 2,
        minColWidth: 2,
        maxColWidth: 0,
        minColHeight: 2,
        maxColHeight: 0,
        static: false,
        isDraggable: true,
        isResizable: true
    }
]

export default class WidgetManager extends Component {
    constructor() {
		super();
		this.state = {widgets: widgetsList};
		this.handleCounter = this.handleCounter.bind(this);
	}

    // generateDOM() {
    //     return _.map(_.range(this.props.items), function (i) {
    //       return (
    //         <div key={i}>
    //           <span className="text">{i}</span>
    //         </div>
    //       );
    //     });
    //   }
    
    //   generateLayout() {
    //     const p = this.props;
    //     return _.map(new Array(p.items), function (item, i) {
    //       const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
    //       return {
    //         x: (i * 2) % 12,
    //         y: Math.floor(i / 6) * y,
    //         w: 2,
    //         h: y,
    //         i: i.toString()
    //       };
    //     });
    //   }
}