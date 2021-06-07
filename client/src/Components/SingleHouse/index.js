import * as React from 'react';
import './index.css';
import { Button, Card, Form, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import WorkerIdContext from "../WorkerIdContext";

class SingleHouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            toggleConfirm: false
        }
    }

    handleSubmit = () => {
        window.myLogger.info(new Date() + ": House " + this.props.house.description + " with House Id " +
            this.props.house["_id"]  + " selected by WorkerId: " + this.context.workerId);
        if(this.props.dss) {
            window.myLogger.info(new Date() + ": DSS house selected by WorkerId: " + this.context.workerId);
        } else {
            if(this.props.dssHouse === this.props.house["_id"])
                window.myLogger.info(new Date() + ": DSS House manually selected by WorkerId: " + this.context.workerId);
            else
                window.myLogger.info(new Date() + ": House manually selected by WorkerId: " + this.context.workerId);
        }
        if(this.props.correctHouse === this.props.house["_id"])
            window.myLogger.info(new Date() + ": Correct house submitted by WorkerId: " + this.context.workerId);
        else
            window.myLogger.info(new Date() + ": Incorrect house submitted by WorkerId: " + this.context.workerId);

    }

    resetFilterHandler = () => {
        if(this.props.dss) {
            window.myLogger.info(new Date() + ": Constraints reset from DSS house by WorkerId: " + this.context.workerId);
        } else {
            window.myLogger.info(new Date() + ": Constraints manually reset by WorkerId: " + this.context.workerId);
        }
        this.setState({toggleConfirm: !this.state.toggleConfirm});
        this.props.resetFilter();
    }

    render() {
        let house = this.props.house;
        return (
                <Card style={{ minWidth: "20%", maxWidth: "50%", margin: "15px" }}>
                    <Card.Img variant="top" src={house.url} />
                    <Card.Body>
                        <Card.Text>
                            <div className={"figType"}>FOR RENT</div>
                            <h2>{house.description.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}</h2>

                            <div className={"cardAddress"}>
                                {house.name.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
                            </div>
                            <div className={"card-text"}>
                                {house.summary.replace(/ \\n/g, ".")}
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        {
                            !this.state.toggleConfirm ?
                                <Button variant="primary" onClick={() => this.setState({toggleConfirm: !this.state.toggleConfirm})}>
                                    Submit this house
                                </Button>
                                :
                                <Form.Group as={Row}>
                                    <Button variant="secondary" onClick={this.resetFilterHandler}>
                                        Reset filters
                                    </Button>
                                    <Link to="/exitForm">
                                        <Button variant="success" onClick={this.handleSubmit}>
                                            Confirm your choice
                                        </Button>
                                    </Link>
                                </Form.Group>
                        }
                    </Card.Footer>
                </Card>
        );
    }
}

SingleHouse.contextType = WorkerIdContext;

export default SingleHouse;