import * as React from 'react';
import './index.css';
import Loader from "../Loader";
import WorkerIdContext from "../WorkerIdContext";

class ResQue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.props.logger.info(new Date() + ": Exit survey started by WorkerId: " + this.context.workerId +
        "with stage " + this.context.stage + " and condition " + this.context.condition)
        setTimeout(function () {
            this.setState({ loading: false })
        }.bind(this), 2000)
    }

    handleOptionChange = (e) => {
        let className = e.currentTarget.name
        let value = e.currentTarget.value
        let time = new Date()

       this.props.logger.info(time + "Value for question ID " + className + " changed to " + value);
    }

    navigate = (e) => {
        e.preventDefault();
        let workerId = this.context.workerId;
        let stage = this.context.stage;
        let condition = this.context.condition;
        let logger = this.props.logger;
        let req = {
            workerId: this.context.workerId,
            startTime: new Date(e.target.elements.startTime.value).getTime(),
            stopTime: new Date().getTime(),
            condition: this.context.condition,
            stage: this.context.stage,
            accuracy: this.context.accuracy,
            scenarioId: "",
            quality_q1: e.target.elements.quality_q1.value,
            quality_q2: e.target.elements.quality_q2.value,
            quality_q3: e.target.elements.quality_q3.value,
            interaction_q1: e.target.elements.interaction_q1.value,
            interaction_q2: e.target.elements.interaction_q2.value,
            interface_q1: e.target.elements.interface_q1.value,
            interface_q2: e.target.elements.interface_q2.value,
            interface_q3: e.target.elements.interface_q3.value,
            easeOfUse_q1: e.target.elements.easeOfUse_q1.value,
            easeOfUse_q2: e.target.elements.easeOfUse_q2.value,
            easeOfUse_q3: e.target.elements.easeOfUse_q3.value,
            usefulness_q1: e.target.elements.usefulness_q1.value,
            usefulness_q2: e.target.elements.usefulness_q2.value,
            control_q1: e.target.elements.control_q1.value,
            control_q2: e.target.elements.control_q2.value,
            attitudes_q1: e.target.elements.attitudes_q1.value,
            attitudes_q2: e.target.elements.attitudes_q2.value,
            attitudes_q3: e.target.elements.attitudes_q3.value,
            attitudes_q4: e.target.elements.attitudes_q4.value,
            attitudes_q5: e.target.elements.attitudes_q5.value,
            intentions_q1: e.target.elements.intentions_q1.value,
            intentions_q2: e.target.elements.intentions_q2.value,
            intentions_q3: e.target.elements.intentions_q3.value,
            intentions_q4: e.target.elements.intentions_q4.value,
            intentions_q5: e.target.elements.intentions_q5.value,
            intentions_q6: e.target.elements.intentions_q6.value
        };
        fetch('/forms/log-exit', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(req)
        }).then(function(){
           logger.info(new Date() + ": ResQue survey submitted by WorkerId: " + workerId);
            if (stage === "1") {
                logger.info(new Date() + ": Redirecting to transition page - WorkerId: " + workerId);
            } else if (stage === "2") {
                logger.info(new Date() + ": Redirecting to completion page - WorkerId: " + workerId);
            }
        }).then(function (){
            if (stage === "1") {
                window.location = "https://crowdsensing.tk/dss?PROLIFIC_PID=" + workerId +
                    "&cnd=" + condition + "&stage=2";
            } else if (stage === "2") {
                window.location = "https://app.prolific.co/submissions/complete?cc=84186F2D";
            }
        });
    }

    render() {
        return (
            this.state.loading ?
                <Loader />
                :
                <div>
                    <script src="https://s.pageclip.co/v1/pageclip.js" charSet="utf-8"></script>
                    <link rel="stylesheet" href="https://s.pageclip.co/v1/pageclip.css" media="screen" />
                    <div className="survey" style={{ margin: 'auto', width: '55%' }}>
                        <div className="header-form" style={{ margin: 'auto', textAlign: 'center', background: '#0EAAA6', padding: '25px' }}>
                            <span style={{ display: 'inline-block', verticalAlign: 'middle', margin: 'auto' }}><h2 style={{ color: '#FFFFFF', fontSize: '20pt', fontFamily: 'sans-serif', verticalAlign: 'middle' }}>Tell Us What You Think Of The System</h2></span>
                        </div>
                        <form id="survey-form" className="pageclip-form" method="post" onSubmit={(e) => this.navigate(e)}>
                            <input type="hidden" id="workerId" className="workerId" name="workerId" defaultValue="default-id" />
                            <input type="hidden" id="interfaceType" className="interfaceType" name="interfaceType" defaultValue="gui" />
                            <input type="hidden" id="startTime" className="startTime" name="startTime" defaultValue={new Date()} />
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="fr-highlighted" colSpan={6} style={{ verticalAlign: 'middle' }}>
                                            <div style={{ textAlign: 'center' }}><strong><span className="section" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>Quality of recommendations</span></strong></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fr-thick" style={{ width: '50%' }}><br /></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-agree"><strong>Strongly Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="agree"><strong>Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="disagree"><strong>Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Strongly Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                                            <label htmlFor="neither"><strong>Neither Agree nor Disagree</strong></label>
                                            <div style={{ textAlign: 'center' }}><br /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>The houses recommended to me matched my interests.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-1" name="quality_q1" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-2" name="quality_q1" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-3" name="quality_q1" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-4" name="quality_q1" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-5" name="quality_q1" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>The houses recommended to me are similar to each other.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-1" name="quality_q2" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-2" name="quality_q2" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-3" name="quality_q2" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-4" name="quality_q2" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-5" name="quality_q2" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I was only provided with general recommendations (e.g., top rated houses), which are the same for anyone.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-1" name="quality_q3" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-2" name="quality_q3" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-3" name="quality_q3" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-4" name="quality_q3" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-5" name="quality_q3" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="fr-highlighted" colSpan={6} style={{ verticalAlign: 'middle' }}>
                                            <div style={{ textAlign: 'center' }}><strong><span className="section" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>Interaction Adequacy</span></strong></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fr-thick" style={{ width: '50%' }}><br /></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-agree"><strong>Strongly Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="agree"><strong>Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="disagree"><strong>Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Strongly Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                                            <label htmlFor="neither"><strong>Neither Agree nor Disagree</strong></label>
                                            <div style={{ textAlign: 'center' }}><br /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>The system allows me to tell what I like/dislike.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-1-1" name="interaction_q1" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-1-2" name="interaction_q1" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-1-3" name="interaction_q1" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-1-4" name="interaction_q1" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-1-5" name="interaction_q1" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>The system explains why the products are recommended to me.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-2-1" name="interaction_q2" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-2-2" name="interaction_q2" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-2-3" name="interaction_q2" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-2-4" name="interaction_q2" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="2-2-5" name="interaction_q2" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="fr-highlighted" colSpan={6} style={{ verticalAlign: 'middle' }}>
                                            <div style={{ textAlign: 'center' }}><strong><span className="section" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>Interface Adequacy</span></strong></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fr-thick" style={{ width: '50%' }}><br /></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-agree"><strong>Strongly Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="agree"><strong>Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="disagree"><strong>Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Strongly Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                                            <label htmlFor="neither"><strong>Neither Agree nor Disagree</strong></label>
                                            <div style={{ textAlign: 'center' }}><br /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>The information provided for the recommended houses is sufficient for me to apply for tenancy.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-1-1" name="interface_q1" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-1-2" name="interface_q1" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-1-3" name="interface_q1" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-1-4" name="interface_q1" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-1-5" name="interface_q1" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>The labels of this system's interface are clear.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-2-1" name="interface_q2" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-2-2" name="interface_q2" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-2-3" name="interface_q2" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-2-4" name="interface_q2" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-2-5" name="interface_q2" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>The layout of this system's interface is visually appealing.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-3-1" name="interface_q3" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-3-2" name="interface_q3" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-3-3" name="interface_q3" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-3-4" name="interface_q3" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="3-3-5" name="interface_q3" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="fr-highlighted" colSpan={6} style={{ verticalAlign: 'middle' }}>
                                            <div style={{ textAlign: 'center' }}><strong><span className="section" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>Perceived Ease of Use</span></strong></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fr-thick" style={{ width: '50%' }}><br /></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-agree"><strong>Strongly Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="agree"><strong>Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="disagree"><strong>Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Strongly Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                                            <label htmlFor="neither"><strong>Neither Agree nor Disagree</strong></label>
                                            <div style={{ textAlign: 'center' }}><br /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I found it easy to tell this system what I like/dislike.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-1-1" name="easeOfUse_q1" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-1-2" name="easeOfUse_q1" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-1-3" name="easeOfUse_q1" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-1-4" name="easeOfUse_q1" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-1-5" name="easeOfUse_q1" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I found it easy to inform the system if I dislike/like the recommended house.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-2-1" name="easeOfUse_q2" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-2-2" name="easeOfUse_q2" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-2-3" name="easeOfUse_q2" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-2-4" name="easeOfUse_q2" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-2-5" name="easeOfUse_q2" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I became familiar with the system very quickly.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-3-1" name="easeOfUse_q3" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-3-2" name="easeOfUse_q3" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-3-3" name="easeOfUse_q3" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-3-4" name="easeOfUse_q3" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="4-3-5" name="easeOfUse_q3" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="fr-highlighted" colSpan={6} style={{ verticalAlign: 'middle' }}>
                                            <div style={{ textAlign: 'center' }}><strong><span className="section" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>Perceived Usefulness</span></strong></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fr-thick" style={{ width: '50%' }}><br /></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-agree"><strong>Strongly Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="agree"><strong>Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="disagree"><strong>Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Strongly Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                                            <label htmlFor="neither"><strong>Neither Agree nor Disagree</strong></label>
                                            <div style={{ textAlign: 'center' }}><br /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>This system helped me find the ideal house.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-1-1" name="usefulness_q1" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-1-2" name="usefulness_q1" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-1-3" name="usefulness_q1" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-1-4" name="usefulness_q1" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-1-5" name="usefulness_q1" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>Finding a house to rent with the help of this system is easy.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-2-1" name="usefulness_q2" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-2-2" name="usefulness_q2" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-2-3" name="usefulness_q2" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-2-4" name="usefulness_q2" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="5-2-5" name="usefulness_q2" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="fr-highlighted" colSpan={6} style={{ verticalAlign: 'middle' }}>
                                            <div style={{ textAlign: 'center' }}><strong><span className="section" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>Control/Transparency</span></strong></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fr-thick" style={{ width: '50%' }}><br /></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-agree"><strong>Strongly Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="agree"><strong>Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="disagree"><strong>Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Strongly Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                                            <label htmlFor="neither"><strong>Neither Agree nor Disagree</strong></label>
                                            <div style={{ textAlign: 'center' }}><br /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I feel in control of telling this system what I want.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-1-1" name="control_q1" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-1-2" name="control_q1" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-1-3" name="control_q1" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-1-4" name="control_q1" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-1-5" name="control_q1" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I understood why the items were recommended to me.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-2-1" name="control_q2" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-2-2" name="control_q2" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-2-3" name="control_q2" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-2-4" name="control_q2" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="6-2-5" name="control_q2" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="fr-highlighted" colSpan={6} style={{ verticalAlign: 'middle' }}>
                                            <div style={{ textAlign: 'center' }}><strong><span className="section" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>Attitudes</span></strong></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fr-thick" style={{ width: '50%' }}><br /></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-agree"><strong>Strongly Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="agree"><strong>Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="disagree"><strong>Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Strongly Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                                            <label htmlFor="neither"><strong>Neither Agree nor Disagree</strong></label>
                                            <div style={{ textAlign: 'center' }}><br /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>Overall, I am satisfied with this system.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-1-1" name="attitudes_q1" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-1-2" name="attitudes_q1" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-1-3" name="attitudes_q1" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-1-4" name="attitudes_q1" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-1-5" name="attitudes_q1" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I am confident I will like the houses recommended to me.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-2-1" name="attitudes_q2" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-2-2" name="attitudes_q2" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-2-3" name="attitudes_q2" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-2-4" name="attitudes_q2" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-2-5" name="attitudes_q2" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>This system made me more confident about my selection/decision.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-3-1" name="attitudes_q3" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-3-2" name="attitudes_q3" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-3-3" name="attitudes_q3" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-3-4" name="attitudes_q3" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-3-5" name="attitudes_q3" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>The recommended houses made me confused about my choice.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-4-1" name="attitudes_q4" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-4-2" name="attitudes_q4" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-4-3" name="attitudes_q4" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-4-4" name="attitudes_q4" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-4-5" name="attitudes_q4" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>This system can be trusted.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-5-1" name="attitudes_q5" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-5-2" name="attitudes_q5" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-5-3" name="attitudes_q5" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-5-4" name="attitudes_q5" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="7-5-5" name="attitudes_q5" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className="fr-highlighted" colSpan={6} style={{ verticalAlign: 'middle' }}>
                                            <div style={{ textAlign: 'center' }}><strong><span className="section" style={{ fontFamily: 'Verdana, Geneva, sans-serif' }}>Behavioral Intentions</span></strong></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="fr-thick" style={{ width: '50%' }}><br /></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-agree"><strong>Strongly Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="agree"><strong>Agree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="disagree"><strong>Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Strongly Disagree</strong></label></td>
                                        <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
                                            <label htmlFor="neither"><strong>Neither Agree nor Disagree</strong></label>
                                            <div style={{ textAlign: 'center' }}><br /></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I will use this system to find houses to rent.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-1-1" name="intentions_q1" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-1-2" name="intentions_q1" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-1-3" name="intentions_q1" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-1-4" name="intentions_q1" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-1-5" name="intentions_q1" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>If I had to move, I will use this system again.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-2-1" name="intentions_q2" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-2-2" name="intentions_q2" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-2-3" name="intentions_q2" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-2-4" name="intentions_q2" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-2-5" name="intentions_q2" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I will use this system rather than other systems.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-3-1" name="intentions_q3" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-3-2" name="intentions_q3" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-3-3" name="intentions_q3" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-3-4" name="intentions_q3" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-3-5" name="intentions_q3" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I will tell my friends about this system.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-4-1" name="intentions_q4" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-4-2" name="intentions_q4" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-4-3" name="intentions_q4" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-4-4" name="intentions_q4" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-4-5" name="intentions_q4" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I will recommend my friends to use this system.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-5-1" name="intentions_q5" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-5-2" name="intentions_q5" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-5-3" name="intentions_q5" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-5-4" name="intentions_q5" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-5-5" name="intentions_q5" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                    <tr>
                                        <td className="required" style={{ width: '50%' }}>I would rent the houses recommended, given the opportunity.</td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-6-1" name="intentions_q6" defaultValue={1} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-6-2" name="intentions_q6" defaultValue={2} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-6-3" name="intentions_q6" defaultValue={3} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-6-4" name="intentions_q6" defaultValue={4} required onChange={this.handleOptionChange} /><br /></td>
                                        <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="8-6-5" name="intentions_q6" defaultValue={5} required onChange={this.handleOptionChange} /><br /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <label style={{ fontSize: '14px' }}>Any Additional Comments?</label><br />
                            <input className="addedFeedback" type="textarea" name="addedFeedback" />
                            <br /><hr />
                            <button type="submit" className="pageclip-form__submit" onSubmit={(e) => this.navigate(e)} style={{ padding: '5px', margin: '0 auto 20px auto' }}>
                                <span style={{ color: '#FFFFFF' }}>Submit Response</span>
                            </button>
                        </form>
                    </div>
                </div>
        );
    }


}

ResQue.contextType = WorkerIdContext;

export default ResQue;