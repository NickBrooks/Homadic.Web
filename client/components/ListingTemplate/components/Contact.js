import React from 'react';
import FontAwesome from 'react-fontawesome';


class Contact extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { listing } = this.props;

        return (
            <div id="contact" className="row">
                {listing.website || listing.contact_details.phone_number || listing.contact_details.email ? <div className="col-md-6">
                    <div className="content-box">
                        <h2 className="fancy blue">Contact</h2>
                        {listing.website ? <p><FontAwesome name="globe" /> <a href={listing.website} target="_blank">{listing.website}</a></p> : undefined}
                        {listing.contact_details.phone_number ? <p><FontAwesome name="phone" /> {listing.contact_details.phone_number}</p> : undefined}
                        {listing.contact_details.email ? <p><FontAwesome name="envelope-square" /> <a href={'mailto' + listing.contact_details.email} target="_blank">{listing.contact_details.email}</a></p> : undefined}
                    </div>
                </div> : undefined}
                {listing.social_details.instagram || listing.social_details.twitter || listing.social_details.facebook ? <div className="col-md-6">
                    <div className="content-box">
                        <h2 className="fancy blue">Social</h2>
                        {listing.social_details.instagram ? <p><FontAwesome name="instagram" /> <a href={'https://www.instagram.com/' + listing.social_details.instagram} target="_blank">{listing.social_details.instagram}</a></p> : undefined}
                        {listing.social_details.twitter ? <p><FontAwesome name="twitter" /> <a href={'https://www.twitter.com/' + listing.social_details.twitter} target="_blank">{listing.social_details.twitter}</a></p> : undefined}
                        {listing.social_details.facebook ? <p><FontAwesome name="facebook" /> <a href={listing.social_details.facebook} target="_blank">{listing.social_details.facebook}</a></p> : undefined}
                    </div>
                </div> : undefined}
            </div>
        )
    }
}

export default Contact;