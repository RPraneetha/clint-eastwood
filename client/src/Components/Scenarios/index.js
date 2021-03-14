import React from "react";
import "./index.css";
import { Card } from "react-bootstrap";

class Scenarios extends React.Component {
    render() {

        return (
            <div className={"scenarioWrapper"}>
                <Card className={"scenarioCard"}>
                    <Card.Header as={"h5"}>
                        Imagine you are the student as given in the below scenario.
                    </Card.Header>
                    <Card.Text>
                        {this.props.scenarioItem}
                    </Card.Text>
                    <Card.Footer>
                        <strong>Your task is to enter the requirements as stated in the scenario to find a suitable housing for yourself.
                            There is at least one house that matches the given situation correctly.</strong>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default Scenarios;
