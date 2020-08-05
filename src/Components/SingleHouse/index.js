import * as React from 'react';
import './index.css';
import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import {
    FaCalendarAlt,
    FaChair,
    FaDog,
    FaEuroSign,
    FaLanguage,
    FaRegAddressCard,
    FaShoppingCart,
    FaUniversity,
    FaUserFriends
} from "react-icons/fa";
import {Link} from "react-router-dom";


class SingleHouse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose = () => this.setState({showModal: false});
    handleShow = () => this.setState({showModal: true});

    render() {
        let house = this.props.house;
        return (
            <div className={"singleHouse"}>
                <a href={"#/search"} className={"card"} onClick={this.handleShow}>
                    <div className={"figure"}>
                        <img src={house.img} alt={"image"} width={"500"} height={"300"} />
                        <div className={"figCaption"}>
                            <div><FaEuroSign />{house.rent}</div>
                            <span>{house.duration} months</span>
                            <span><FaCalendarAlt /></span>
                            <span>{house.interiorType}</span>
                            <span><FaChair /></span>
                        </div>
                        <div className={"figType"}>FOR RENT</div>
                    </div>
                    <h2>{house.name}</h2>
                    <div className={"cardAddress"}><span className={"icon-pointer"} />
                        {house.address}
                    </div>
                    <ul className={"cardFeat"}>
                        { house.pets && <li><FaDog title={"Pets Allowed"}/></li> }
                        { house.couples && <li><FaUserFriends title={"Suitable for Couples"}/></li> }
                        { house.registration && <li><FaRegAddressCard title={"Registration Possible"}/></li> }
                        { house.supermarkets && <li><FaShoppingCart title={"Close to Supermarkets"}/></li> }
                        { house.university && <li><FaUniversity title={"Close to University"}/></li> }
                        { house.dutch && <li><FaLanguage title={"Dutch Speaking"}/></li> }
                    </ul>
                </a>
                <Modal size={"lg"} show={this.state.showModal} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title className={"modalTitle"}>{house.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"modalFigure"}>
                            <img src={house.img} alt={house.name} />
                        </div>
                        <div className={"modalCardAddress"}>
                            <span className={"icon-pointer"} />
                            {house.address}
                        </div>
                        <Container>
                            <Row>
                                <Col xs={6} md={4}>
                                    <div>Rent: <FaEuroSign />{house.rent}</div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <span><FaCalendarAlt /></span>
                                    Duration: {house.duration} months
                                </Col>
                                <Col xs={6} md={4}>
                                    <FaChair />Interior Type: {house.interiorType}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={4}>
                                    <FaDog title={"Pets Allowed"}/> Pets Allowed: { house.pets ? "Yes" : "No"  }
                                </Col>
                                <Col xs={6} md={4}>
                                    <FaUserFriends title={"Suitable for Couples"}/> Suitable for Couples: { house.couples ? "Yes" : "No"  }
                                </Col>
                                <Col xs={6} md={4}>
                                    <FaRegAddressCard title={"Registration Possible"}/> Registration Possible: { house.registration ? "Yes" : "No"  }
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={4}>
                                    <FaShoppingCart title={"Close to Supermarkets"}/> Close to Supermarkets: { house.supermarkets ? "Yes" : "No"  }
                                </Col>
                                <Col xs={6} md={4}>
                                    <FaUniversity title={"Close to University"}/> Close to University: { house.university ? "Yes" : "No"  }
                                </Col>
                                <Col xs={6} md={4}>
                                    <FaLanguage title={"Dutch Speaking"}/> Dutch Speaking: { house.dutch ? "Yes" : "No"  }
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Back
                        </Button>
                            <Link to="/exitForm">
                                <Button variant="primary" onClick={this.handleClose}>
                                    Confirm Your Choice
                                </Button>
                            </Link>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default SingleHouse;