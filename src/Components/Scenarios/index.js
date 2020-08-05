import React from "react";
import "./index.css";
import { Card } from "react-bootstrap";

class Scenarios extends React.Component {
    render() {
        const scenarioItem = this.props.scenarioItem;

        return (
            <div className={"scenarioWrapper"}>
                <Card className={"scenarioCard"}>
                    <Card.Header as={"h3"}>
                        Scenario
                    </Card.Header>
                    <Card.Text>
                        {scenarioItem.scenario}
                    </Card.Text>
                </Card>
            </div>
        );
    }
}

export default Scenarios;
