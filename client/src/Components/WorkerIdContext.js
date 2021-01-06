import React from "react";

const WorkerIdContext = React.createContext({
    workerId: 1234,
    scenarioId: 1,
    scenarioType: 0
});
export default WorkerIdContext;