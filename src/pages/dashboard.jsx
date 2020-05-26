import React, { Component } from "react";
import WidgetCarousel from "./components/widget-carousel";
import DashboardBasicGridLayout from "./components/grid-layout";
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
 
const initialWidgets = {
  widgets: [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
    },
    {
        id: 4,
        name: 'Widget4',
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
        id: 5,
        name: 'Widget5',
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
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    if(!this.state){
      this.state = initialWidgets;
    }

    this.handleToUpdate = this.handleToUpdate.bind(this)
  }

  handleToUpdate = updatedWidget => {
    this.updateWidgetList(updatedWidget);

    console.log(this.state.widgets);
  }

  async updateWidgetList(_updated){
    this.setState(state => {
      const widgets = state.widgets.map(widget => {
        if (widget.id === _updated.id) {
          console.log("found match")
          return _updated;
        } else {
          console.log("no match")
          return widget;
        }
      });
      
      console.log(widgets)

      return {widgets};
    });
  }
  
  render() {
    return (
      <div>
        {/* <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h4>Widgets</h4>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <WidgetCarousel
                  handleToUpdate = {this.handleToUpdate}
                  widgets={this.state.widgets}/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion> */}
        
        <DashboardBasicGridLayout widgets={this.state.widgets}/>
      </div>
    );
  }

  
}