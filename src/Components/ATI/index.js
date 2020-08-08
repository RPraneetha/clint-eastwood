import * as React from 'react';
import './index.css';

class ATI extends React.Component {

    currentTime = new Date().toLocaleDateString();
    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://s.pageclip.co/v1/pageclip.css" media="screen" />
                <div className="survey" style={{ margin: 'auto', width: '50%' }}>
                    <div className="header" style={{ margin: 'auto', textAlign: 'center', background: '#2196F3', height: '120px' }}>
                        <span style={{ display: 'inline-block', verticalAlign: 'middle', margin: 'auto' }}><h2 style={{ color: '#FFFFFF', fontSize: '18pt', fontFamily: 'sans-serif', verticalAlign: 'middle', display: 'inline-block' }}>How well are you acquainted with Web Interfaces?</h2></span>
                    </div>
                    <span>
                        <p>
                            This survey is used to understand how well you are acquainted with web interfaces. Some examples of web&nbsp; interfaces are housing websites. This survey is based on the ATI Scale which measures the user's affinity towards using certain technological systems.
            </p>
                    </span>
                    <form id="survey-form" action="https://send.pageclip.co/ssJ875Dr8gsBFokkWaOxD7zvXK70aOkU/ati-gui-task" className="pageclip-form" method="post">
                        <input type="hidden" id="workerId" className="workerId" name="workerId" defaultValue="default-id" />
                        <input type="hidden" id="startTime" className="startTime" name="startTime" defaultValue={this.currentTime} />
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th className="fr-highlighted" colSpan={6} style={{ verticalAlign: 'middle' }}>
                                        <div style={{ textAlign: 'center' }}><strong><span style={{ fontFamily: 'Verdana, Geneva, sans-serif', fontSize: '16px' }}>Please indicate the degree to which you agree/disagree with the following statements.</span></strong></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="fr-thick" style={{ width: '40%' }}><br /></td>
                                    <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-agree"><strong>Completely Disagree</strong></label></td>
                                    <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="agree"><strong>Largely Disagree</strong></label></td>
                                    <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="disagree"><strong>Slightly Disagree</strong></label></td>
                                    <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Slightly Agree</strong></label></td>
                                    <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="strongly-disagree"><strong>Largely Agree</strong></label></td>
                                    <td className="fr-thick" style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}><label htmlFor="neither"><strong>Completely Agree</strong></label></td>
                                </tr>
                                <tr>
                                    <td className="required" style={{ width: '40%', textAlign: 'justify' }}>I like to occupy myself in greater detail with web interfaces.</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-1" name="1-1" defaultValue={1} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-2" name="1-1" defaultValue={2} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-3" name="1-1" defaultValue={3} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-4" name="1-1" defaultValue={4} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-5" name="1-1" defaultValue={5} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-1-6" name="1-1" defaultValue={6} required /><br /></td>
                                </tr>
                                <tr>
                                    <td className="required" style={{ width: '40%', textAlign: 'justify' }}>I like testing the functions of new web interfaces.</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-1" name="1-2" defaultValue={1} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-2" name="1-2" defaultValue={2} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-3" name="1-2" defaultValue={3} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-4" name="1-2" defaultValue={4} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-5" name="1-2" defaultValue={5} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-2-6" name="1-2" defaultValue={6} required /><br /></td>
                                </tr>
                                <tr>
                                    <td className="required" style={{ width: '40%', textAlign: 'justify' }}>I predominantly deal with web interfaces because I have to.</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-1" name="1-3" defaultValue={1} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-2" name="1-3" defaultValue={2} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-3" name="1-3" defaultValue={3} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-4" name="1-3" defaultValue={4} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-5" name="1-3" defaultValue={5} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-3-6" name="1-3" defaultValue={6} required /><br /></td>
                                </tr>
                                <tr>
                                    <td className="required" style={{ width: '40%', textAlign: 'justify' }}>When I have a new web interface in front of me, I try it out intensively.</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-4-1" name="1-4" defaultValue={1} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-4-2" name="1-4" defaultValue={2} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-4-3" name="1-4" defaultValue={3} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-4-4" name="1-4" defaultValue={4} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-4-5" name="1-4" defaultValue={5} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-4-6" name="1-4" defaultValue={6} required /><br /></td>
                                </tr>
                                <tr>
                                    <td className="required" style={{ width: '40%', textAlign: 'justify' }}>I enjoy spending time becoming acquainted with a new web interface.</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-5-1" name="1-5" defaultValue={1} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-5-2" name="1-5" defaultValue={2} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-5-3" name="1-5" defaultValue={3} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-5-4" name="1-5" defaultValue={4} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-5-5" name="1-5" defaultValue={5} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-5-6" name="1-5" defaultValue={6} required /><br /></td>
                                </tr>
                                <tr>
                                    <td className="required" style={{ width: '40%', textAlign: 'justify' }}>It is enough for me that a web interface works; I don’t care how or why.</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-6-1" name="1-6" defaultValue={1} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-6-2" name="1-6" defaultValue={2} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-6-3" name="1-6" defaultValue={3} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-6-4" name="1-6" defaultValue={4} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-6-5" name="1-6" defaultValue={5} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-6-6" name="1-6" defaultValue={6} required /><br /></td>
                                </tr>
                                <tr>
                                    <td className="required" style={{ width: '40%', textAlign: 'justify' }}>I try to understand how a web interface exactly works.</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-7-1" name="1-7" defaultValue={1} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-7-2" name="1-7" defaultValue={2} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-7-3" name="1-7" defaultValue={3} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-7-4" name="1-7" defaultValue={4} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-7-5" name="1-7" defaultValue={5} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-7-6" name="1-7" defaultValue={6} required /><br /></td>
                                </tr>
                                <tr>
                                    <td className="required" style={{ width: '40%', textAlign: 'justify' }}>It is enough for me to know the basic functions of a web interface.</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-8-1" name="1-8" defaultValue={1} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-8-2" name="1-8" defaultValue={2} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-8-3" name="1-8" defaultValue={3} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-8-4" name="1-8" defaultValue={4} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-8-5" name="1-8" defaultValue={5} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-8-6" name="1-8" defaultValue={6} required /><br /></td>
                                </tr>
                                <tr>
                                    <td className="required" style={{ width: '40%', textAlign: 'justify' }}>I try to make full use of the capabilities of a web interface.</td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-9-1" name="1-9" defaultValue={1} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-9-2" name="1-9" defaultValue={2} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-9-3" name="1-9" defaultValue={3} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-9-4" name="1-9" defaultValue={4} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-9-5" name="1-9" defaultValue={5} required /><br /></td>
                                    <td style={{ width: '10%', textAlign: 'center' }}><input type="radio" id="1-9-6" name="1-9" defaultValue={6} required /><br /></td>
                                </tr>
                            </tbody>
                        </table>
                        <br /><hr />
                        <label style={{ fontSize: '14px' }}>Any Comments Before We Start?</label><br />
                        <input className="addedFeedback" type="textarea" name="addedFeedback" />
                        <br /><hr />
                        <button type="submit" className="pageclip-form__submit" style={{ background: '#2196F3', width: '20%', padding: '10px', margin: '0 auto', display: 'block' }}>
                            <span style={{ color: '#FFFFFF' }}>Submit Response</span>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default ATI;