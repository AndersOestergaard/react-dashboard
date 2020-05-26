import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button'; 
import Nav from "react-bootstrap/Nav";
import {Row, Col, Form, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import TestWidget from '../widgets/testwidget'

import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const initialWidgets = [
    {
        id: 0,
        name: 'TestWidget0',
        layout: {
          i: "0",
          x: 0,
          y: 0,
          w: 7,
          h: 10,
          minW: 7,
          minH: 10,
          static: false,
          isDraggable: true,
          isResizable: true
        }
    },
    {
      id: 1,
      name: 'TestWidget1',
      layout: {
        i: "1",
        x: 0,
        y: 0,
        w: 4,
        h: 6,
        static: false,
        isDraggable: true,
        isResizable: true
      }
    },
    {
      id: 2,
      name: 'TestWidget2',
      layout: {
        i: "2",
        x: 0,
        y: 0,
        w: 7,
        h: 10,
        static: false,
        isDraggable: true,
        isResizable: true
      }
    },
    {
      id: 3,
      name: 'TestWidget3',
      layout: {
        i: "3",
        x: 0,
        y: 0,
        w: 7,
        h: 10,
        static: false,
        isDraggable: true,
        isResizable: true
      }
    },
    {
      id: 4,
      name: 'TestWidget4',
      layout: {
        i: "4",
        x: 0,
        y: 0,
        w: 7,
        h: 10,
        static: false,
        isDraggable: true,
        isResizable: true
      }
    }
  ];

class ToolBoxItem extends React.Component {

  handleChange(event) {
    event.persist();

    this.props.handleToUpdate(this.state)  
  }

  render() {
    return (
      <Card className="widget-list">
        {console.log(this.props.item)}
        <Card.Header>
          <Row>
            <Col><Button onClick={this.props.onTakeItem.bind(undefined, this.props.item)}>Add</Button></Col>
            <Col><h4>{this.props.item.name}</h4></Col>
            <Col>
              <Accordion.Toggle className="settings-btn"  eventKey={this.props.item.i}>
                <FontAwesomeIcon icon={faEllipsisH} className="fa-2x" />
              </Accordion.Toggle>
            </Col>
          </Row>
        </Card.Header>
        <Accordion.Collapse eventKey={this.props.item.i}>
          <Card.Body>
            Settings
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridXPosition">
                  <Form.Label>X Position</Form.Label>
                  <Form.Control size="sm" type="number" value={this.props.item.x} onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridYPosition">
                  <Form.Label>Y Position</Form.Label>
                  <Form.Control size="sm" type="number" readOnly value={this.props.item.y}/>
                </Form.Group>
              </Form.Row>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}

class ToolBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleToolbox() {
    this.setState({ open: !this.state.open })
    // this.props.onCompactTypeChange(this.state.open);
  }
  
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  render() {
    return (
      <div class="d-flex flex-row widgetMenu">
            <Button variant="secondary" className="open-widget-btn"
              onClick={() => this.toggleToolbox()}
              aria-controls="Open widget List"
              aria-expanded={this.state.open}>
                <span className="horizontal-btn-text">Widgets</span>
            </Button>
            <div className={`bg-dark widget-toolbox ${this.state.open ? "toolbox-open" : "toolbox-closed"}`}>
              <Accordion className="flex-grow w-100 widget-list">
                {this.props.items.map(item => (
                  <ToolBoxItem
                    key={item.id}
                    item={item}
                    onTakeItem={this.props.onTakeItem}
                    handleToUpdate={this.props.handleToUpdate}
                  />
                ))}
              </Accordion>
            </div >
      </div>
    );
  }
}

export default class DashboardBasicGridLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: generateWidgetLayouts()
  };

  state = {
    active: false,
    currentBreakpoint: "lg",
    compactType: null,
    mounted: false,
    layouts: { lg: [] },
    toolbox: { lg: this.props.initialLayout },
    widgets: initialWidgets
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM() {
    return _.map(this.state.layouts[this.state.currentBreakpoint], l => {
      return (
        <Card key={l.i} className={l.static ? "static" : ""}>
          <Card.Header>
            <span>{l.i}</span>
            <div className="hide-button" onClick={this.onPutItem.bind(this, l)}>
              &times;
            </div>
          </Card.Header>
          <Card.Body className="overflow-hidden">
            <TestWidget></TestWidget>
          </Card.Body>
        </Card>
      );
    });
  }

  onBreakpointChange = breakpoint => {
    this.setState(prevState => ({
      currentBreakpoint: breakpoint,
      toolbox: {
        ...prevState.toolbox,
        [breakpoint]:
          prevState.toolbox[breakpoint] ||
          prevState.toolbox[prevState.currentBreakpoint] ||
          []
      }
    }));
  };

  onCompactTypeChange = (openState) => {
    // const { compactType: oldCompactType } = this.state;
    const compactType =
      openState === true
        ? "horizontal"
        : null;
    this.setState({ compactType });
  };

  onTakeItem = item => {
    console.log("take Item");
    console.log(item);

    this.setState(prevState => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: prevState.toolbox[
          prevState.currentBreakpoint
        ].filter(({ i }) => i !== item.i)
      },
      layouts: {
        ...prevState.layouts,
        [prevState.currentBreakpoint]: [
          ...prevState.layouts[prevState.currentBreakpoint],
          item
        ]
      }
    }));
  };

  onPutItem = item => {
    console.log("Put Item");
    console.log(item);

    this.setState(prevState => {
      return {
        toolbox: {
          ...prevState.toolbox,
          [prevState.currentBreakpoint]: [
            ...(prevState.toolbox[prevState.currentBreakpoint] || []),
            item
          ]
        },
        layouts: {
          ...prevState.layouts,
          [prevState.currentBreakpoint]: prevState.layouts[
            prevState.currentBreakpoint
          ].filter(({ i }) => i !== item.i)
        }
      };
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
    this.setState({ layouts });
  };

  onNewLayout = () => {
    this.setState({
      layouts: { lg: generateWidgetLayouts() }
    });
  };

  updateGrid() {
    // Force a render without state change...
    this.forceUpdate();
  }

  render() {
    return (
      <div class="d-flex flex-row">
          <div className="flex-fill dashboardGrid mx-4 mt-3" >
            <ResponsiveReactGridLayout
                {...this.props}
                layouts={this.state.layouts}
                onBreakpointChange={this.onBreakpointChange}
                onLayoutChange={this.onLayoutChange}
                // WidthProvider option
                measureBeforeMount={false}
                // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                // and set `measureBeforeMount={true}`.
                useCSSTransforms={this.state.mounted}
                compactType={this.state.compactType}
                preventCollision={!this.state.compactType}
              >
                {this.generateDOM()}
                {/* {this.props.widgets.map((_widget) => {
                  return (
                    <div key={_widget.id} 
                      data-grid={{ 
                        x: _widget.xPosition, 
                        y: _widget.yPosition, 
                        w: _widget.colWidth, 
                        h: _widget.colHeight, 
                        minW: _widget.minColWidth, 
                        minH: _widget.minColHeight }}>
                      <span className="text">{_widget.name}</span>
                    </div>
                  );
                })} */}
            </ResponsiveReactGridLayout>
          </div>
          <div className="px-0">
          <ToolBox
                  items={this.state.toolbox[this.state.currentBreakpoint] || []} 
                  onTakeItem={this.onTakeItem}
                  onCompactTypeChange={this.onCompactTypeChange} />
            
          </div>   
      </div>
    );
  }
}

function generateLayout() {
  return _.map(_.range(0, 25), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

function generateWidgetLayouts() {
  return _.map(initialWidgets, function(widget, i) {
    return widget.layout;
  });
}

// export default class DashboardBasicGridLayout extends React.PureComponent {
//   static defaultProps = {
//     className: "layout",
//     items: 20,
//     rowHeight: 30,
//     onLayoutChange: function () { },
//     cols: 12
//   };

//   constructor(props) {
//     super(props);

//     const layout = this.generateLayout();
//     this.forceUpdate()
//     // this.state = { layout };
//     this.state = this.props.widgets;
//   }

//   generateDOM() {
//     return this.props.widgets.map(widget => {
//       console.log(widget.id)
//       return (
//         <div key={widget.id}>
//           <span className="text">{widget.name}</span>
//         </div>
//       );
//     });
//   }

//   generateLayout() {
//     const p = this.props;
//     return this.props.widgets.map(widget => {
//       console.log(widget.id)
//       return {
//         x: parseInt(widget.xPosition),
//         y: parseInt(widget.yPosition),
//         w: parseInt(widget.colWidth),
//         h: parseInt(widget.colHeight),
//         minW: parseInt(widget.minColWidth), 
//         minH: parseInt(widget.minColHeight),
//         i: widget.id
//       };
//     });

//     // return _.map(new Array(p.widgets), function (widget) {
//     //   return {
//     //     x: parseInt(widget.xPosition),
//     //     y: parseInt(widget.yPosition),
//     //     w: parseInt(widget.colWidth),
//     //     h: parseInt(widget.colHeight),
//     //     i: parseInt(widget.id)
//     //   };
//     // });
//   }

//   onLayoutChange(layout) {
//     this.props.onLayoutChange(layout);
//   }

//   render() {
//     return (
//       <ReactGridLayout
//         // layout={this.state.layout}
//         onLayoutChange={this.onLayoutChange}
//         {...this.props}
//       >
//         {this.props.widgets.map((_widget) => {
//             return (
//               <div key={_widget.id} 
//                 data-grid={{ 
//                   x: _widget.xPosition, 
//                   y: _widget.yPosition, 
//                   w: _widget.colWidth, 
//                   h: _widget.colHeight, 
//                   minW: _widget.minColWidth, 
//                   minH: _widget.minColHeight }}>
//                 <span className="text">{_widget.name}</span>
//               </div>
//             );
//           })}
//         {/* {this.generateDOM()} */}
//         <div key="22" data-grid={{ x: 4, y: 0, w: 2, h: 4, minW: 2, minH: 4 }}><Game /></div>
//       </ReactGridLayout>
//     );
//   }
// }

//----------------------------------------------------------------------