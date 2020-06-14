import React from 'react';
import Iframe from 'react-iframe'

class Form extends React.Component {

    render() {
        return (
            <div className="contentWrapper">

                <Iframe
                    url="https://fs11.formsite.com/V9PQWO/8wbymhd8h7/index.html"
                    // url="https://fs11.formsite.com/V9PQWO/8wbymhd8h7/fill?id5-1=1&id5-2=1&id5-3=1&id5-4=1&id5-5=1&id5-6=1&id5-7=1&id5-8=1&id5-9=1&id10=YourValue4"
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
