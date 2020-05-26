import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

export default class ListWidget extends Component {
    
	constructor(props) {
        super(props);
        this.state = this.props.widget;
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.persist();
      
        let _value = event.target.value;
        let _propName = event.target.name;

        this.setState({[_propName]: parseInt(_value)});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.props.handleToUpdate(this.state)         
    }

	render() {
		return (
		    <Card style={{ maxWidth: '16rem' }}>
                <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Accordion>
                        <Accordion.Toggle eventKey="1">Settings</Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridXPosition">
                                            <Form.Label>X Position</Form.Label>
                                            <Form.Control size="sm" type="number" readOnly value={this.state.xPosition}/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridYPosition">
                                            <Form.Label>Y Position</Form.Label>
                                            <Form.Control size="sm" type="number" readOnly value={this.state.yPosition}/>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridColWidth">
                                            <Form.Label>Col Width</Form.Label>
                                            <Form.Control size="sm" type="number" readOnly value={this.state.colWidth}/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridColHeight">
                                            <Form.Label>Col Height</Form.Label>
                                            <Form.Control name="colHeight" size="sm" type="number" value={this.state.colHeight} onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridMinColWidth">
                                            <Form.Label>Min Width</Form.Label>
                                            <Form.Control size="sm" type="number" readOnly value={this.state.minColWidth}/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridMinColHeight">
                                            <Form.Label>Min Height</Form.Label>
                                            <Form.Control size="sm" type="number" readOnly value={this.state.minColHeight}/>
                                        </Form.Group>
                                    </Form.Row>
                                    <input type="submit" />
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Accordion>
                </Card.Body>
            </Card>
		);
	}
}