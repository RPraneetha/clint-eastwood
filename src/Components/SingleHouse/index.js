import * as React from 'react';
import './index.css';
import { FaEuroSign } from "react-icons/fa";

class SingleHouse extends React.Component {
  render() {
    let house = this.props.data;
    return (
      <div className="singleHouse">
        <a href="#" className="card">
          <div className="figure">
            <img src={house.img} alt="image" width={"500"} height={"300"} />
            <div className="figCaption">
              <div><FaEuroSign />{house.rent}</div>
              <span>{house.interiorType}</span>
              <span> Available for {house.duration} months</span>
            </div>
            <div className="figType">FOR RENT</div>
          </div>
          <h2>{this.props.data.name}</h2>
          <div className="cardAddress"><span className="icon-pointer" />
            {this.props.data.address}
            </div>
          {/*<ul className="cardFeat">*/}
          {/*  <li><span className="fa fa-moon-o" /> {this.props.data.beds}</li>*/}
          {/*  <li><span className="icon-drop" /> {this.props.data.toilets}</li>*/}
          {/*  <li><span className="icon-frame" /> {this.props.data.square} Sq Ft</li>*/}
          {/*</ul>*/}
        </a>
      </div>
    );
  }
}

export default SingleHouse;