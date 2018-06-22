import React from 'react';
import { Link } from 'react-router';
import Avatar from '../../../Components/Avatar/Avatar';

class IndexHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { authentication, profile } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8 px-4 py-3">
                        <h4><Link className="logo" to="/">{'{ Homadic }'}</Link></h4>
                    </div>
                    <div className="col-4 ml-auto px-4 py-3 d-flex justify-content-end">
                        {authentication.isLoggedIn ?
                            <div className="ml-3">
                                <Avatar size={40} profile={profile.data} />
                            </div> :
                            undefined
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default IndexHeader;