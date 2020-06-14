import React from 'react';
import './App.css';
// import './Bootstrap/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";

function App() {
  return (
    <div className="globalContainer">
        <div className="dashboard">
            <div className="bodyWrapper">
                <div className="contentWrapper">
                    <div className="dashboardTitle">
                        <h3>Find Your Perfect House</h3>
                    </div>
                    <div className="selectBarWrapper">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
