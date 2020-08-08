import * as React from 'react';
import './index.css';
import SingleHouse from '../SingleHouse';

const houseData = require('../../Data/houseData.json');

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    resultList = () => {
        let filters = this.props.filters;
        let data = this.props.data;

        Object.entries(filters).forEach(([key, value]) => {
            if(value === -1) {
                delete filters[key];
            }
        })

        let resultList = houseData.filter(function(house) {
            let conditionSatisfied = true;
            for(let key of Object.keys(filters))
            {
                if (filters.hasOwnProperty(key)) {
                    conditionSatisfied = key === "rent" ? house[key] <= filters[key] : house[key] === filters[key];
                    if (!conditionSatisfied)
                        break;
                }
            }
            return conditionSatisfied;
        })

        return (
            <div className="resultsList">
                <div className="nohouses">
                    <h2>Select A House To Proceed!</h2>
                    <span>Hover over the houses to see additional information</span>
                </div>
                <div className="row">
                    {resultList.length !== 0 ? resultList.map((house, index) => {
                            return (
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" key={index}>
                                    <SingleHouse house={house} />
                                </div>
                            );
                        }) :
                        <span className="nohouses">
                            <h1>Sorry, there are no houses matching your requirements.</h1>
                        </span>
                    }
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="searchForm">
                <div className="resultTable">
                    <div className="resultBody">
                        {this.resultList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResults;