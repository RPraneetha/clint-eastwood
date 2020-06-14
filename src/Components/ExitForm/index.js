import React from 'react';
import Iframe from 'react-iframe'

class Form extends React.Component {

    render() {
        return (
            <div className="contentWrapper">
                <Iframe
                    url="https://fs11.formsite.com/V9PQWO/hnvnvvqayi/index.html"
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
