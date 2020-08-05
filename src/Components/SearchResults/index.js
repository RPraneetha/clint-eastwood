import * as React from 'react';
import './index.css';
import SingleHouse from '../SingleHouse';
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const houseData = require('../../Data/houseData.json');

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    resultList = () => {
        let filters = this.props.filters;

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
                <div className="row">
                    {resultList.length !== 0 ? resultList.map((data, index) => {
                            return (
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" key={index}>
                                    <SingleHouse data={data} />
                                </div>
                            );
                        }) :
                        <span className="nohouses">
                            <h1>Sorry, there are no houses matching your requirements.</h1>
                        </span>
                    }
                </div>
                <div className="proceed-wrapper">
                    <Link to="/exitForm">
                        <Button size="lg" className="btn btn-green">
                            Proceed <FaArrowRight className={"FaArrowRight"}/>
                        </Button>
                    </Link>
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