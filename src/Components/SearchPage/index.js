import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from "../SearchBar";

class SearchPage extends React.Component {
    render() {
        return (
            <div className="globalContainer">
                <div className="dashboard">
                    <div className="bodyWrapper">
                        <div className="contentWrapper">
                            <div className="dashboardTitle">
                                <h3>Find Your Perfect House</h3>
                            </div>
                            <div className="scenarioWrapper">
                                <h5>Scenario</h5>
                                <p>Imagine you are Alice. Your task is to interact with the bot to find a suitable
                                    housing for Alice
                                    Here is some info about her
                                    Alice is looking for a place to stay in Delft for at least 1 year.
                                    She is an international student and requires registration in the municipality.
                                    She has a maximum budget of 600 euros and the commute time to the university should
                                    be less than 10 minutes by bike.
                                    Further, she prefers a place near the city centre and supermarkets.
                                    She also prefers a studio compared to sharing.</p>
                            </div>
                            <div className="selectBarWrapper">
                                <SearchBar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPage;
