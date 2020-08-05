import React from 'react';
import Iframe from 'react-iframe'

class Form extends React.Component {

    render() {
        return (
            <div className="contentWrapper">
                <Iframe
                    url={this.props.url}
                    width="100%"
                    height="100%"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>

            </div>
        );
    }
}

export default Form;
