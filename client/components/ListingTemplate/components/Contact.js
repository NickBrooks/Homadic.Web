import React from 'react';

class Contact extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { contact_details, social_details } = this.props;

        return (
            <div id="contact" className="row">
                {contact_details.website || contact_details.phone_number || contact_details.email ? <div className="col-md-6">
                    <div className="content-box">
                        <h3 className="fancy blue">Contact</h3>
                        <hr />
                        {contact_details.website ? <p><i className="fas fa-globe" /> <a href={contact_details.website} target="_blank">{contact_details.website}</a></p> : undefined}
                        {contact_details.phone_number ? <p><i className="fas fa-phone" /> {contact_details.phone_number}</p> : undefined}
                        {contact_details.email ? <p><i className="fas fa-envelope" /> <a href={'mailto' + contact_details.email} target="_blank">{contact_details.email}</a></p> : undefined}
                    </div>
                </div> : undefined}
                {social_details.instagram || social_details.twitter || social_details.facebook ? <div className="col-md-6">
                    <div className="content-box">
                        <h3 className="fancy blue">Social</h3>
                        <hr />
                        {social_details.facebook ? <p><i className="fab fa-facebook" /> <a href={social_details.facebook} target="_blank">{social_details.facebook}</a></p> : undefined}
                        {social_details.instagram ? <p><i className="fab fa-instagram" /> <a href={'https://www.instagram.com/' + social_details.instagram} target="_blank">{social_details.instagram}</a></p> : undefined}
                        {social_details.twitter ? <p><i className="fab fa-twitter" /> <a href={'https://www.twitter.com/' + social_details.twitter} target="_blank">{social_details.twitter}</a></p> : undefined}
                    </div>
                </div> : undefined}
            </div>
        )
    }
}

export default Contact;
