import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import WorkerIdContext from "./Components/WorkerIdContext";

function Root() {
    let params = new URLSearchParams(window.location.search);
    let workerId = params.get('wid') ? params.get('wid') : 1234;
    let condition = params.get('cnd') ? params.get('cnd') : 1;
    let stage = params.get('STAGE') ? params.get('STAGE') : 1;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let scenarioId, scenarioType;
    switch (true) {
        case (condition == 1) && (stage == 1):
            scenarioId = getRandomInt(1, 3);
            scenarioType = 0;
            break;
        case (condition == 1) && (stage == 2):
            scenarioId = getRandomInt(4, 6);
            scenarioType = 0;
            break;
        case (condition == 2) && (stage == 1):
            scenarioId = getRandomInt(1, 3);
            scenarioType = 1;
            break;
        case (condition == 2) && (stage == 2):
            scenarioId = getRandomInt(4, 6);
            scenarioType = 1;
            break;
        case (condition == 3) && (stage == 1):
            scenarioId = getRandomInt(4, 6);
            scenarioType = 0;
            break;
        case (condition == 3) && (stage == 2):
            scenarioId = getRandomInt(1, 3);
            scenarioType = 0;
            break;
        case (condition == 4) && (stage == 1):
            scenarioId = getRandomInt(4, 6);
            scenarioType = 1;
            break;
        case (condition == 4) && (stage == 2):
            scenarioId = getRandomInt(1, 3);
            scenarioType = 1;
            break;
        default:
            alert("Incorrect condition or stage provided");
    }
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
