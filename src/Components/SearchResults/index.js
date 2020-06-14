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
        let resultList = houseData.filter((house) => (
            house.duration === filters.duration &&
                house.rent <= filters.maxRent && house.rent >= filters.minRent &&
                house.furnishedType === filters.interiorType &&
                house.houseType === filters.houseType &&
                house.dutch === filters.dutch &&
                house.registration === filters.registration &&
                house.supermarkets === filters.supermarkets &&
                house.university === filters.uni &&
                house.couples === filters.couples &&
                house.pets === filters.pets
        ))

        return (
            <div className="resultsList">
                <div className="row">
                    {resultList.length != 0 ? resultList.map((data, index) => {
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