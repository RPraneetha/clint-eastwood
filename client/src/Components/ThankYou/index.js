import * as React from 'react';
import './index.css';
import WorkerIdContext from "../WorkerIdContext";
import Loader from "../Loader";

class ThankYou extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(function() {
            this.setState({ loading: false })
        }.bind(this), 1000)
    }

    render() {
        return (
            this.state.loading ?
                <Loader />
                :
            <div className="thankyou-header">
                <h1>Thank You For Completing The Task!</h1>
            </div>
        );
    }
}

ThankYou.contextType = WorkerIdContext;

export default ThankYou;