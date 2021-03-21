import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import WorkerIdContext from "./Components/WorkerIdContext";

function Root() {
    let params = new URLSearchParams(window.location.search);
    let workerId = params.get('wid') ? params.get('wid') : 1234;
    let scenarioId = params.get('sid') ? params.get('sid') : 1;
    let scenarioType = params.get('acc') ? params.get('acc') : 0;
    let condition = params.get('cnd') ? params.get('cnd') : 1;
    let stage = params.get('STAGE') ? params.get('STAGE') : 1;

    return (
        <React.StrictMode>
            <WorkerIdContext.Provider value={{ workerId, scenarioId, scenarioType, condition, stage }}>
                <App />
            </WorkerIdContext.Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
