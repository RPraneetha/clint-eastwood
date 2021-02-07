import React from "react";
import "./index.css";
import { Card } from "react-bootstrap";

class Scenarios extends React.Component {
    render() {

        return (
            <div className={"scenarioWrapper"}>

                <Card className={"scenarioCard"}>
                    <Card.Header as={"h4"}>
                        Imagine you are the student as given in the below scenario. Your task is to interact with the bot to find a suitable housing for this student <br/>
                        There is only one house that matches the given situation correctly <br/><br/>
                        <h3><strong>Here is the given scenario:</strong></h3>
                    </Card.Header>
                    <Card.Text>
                        {this.props.scenarioItem}
                    </Card.Text>
                </Card>
            </div>
        );
    }
}

export default Scenarios;
