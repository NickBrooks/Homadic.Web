import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

class ProgressFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: {
                listing: "",
                rooms: "",
                amenities: "",
                publish: ""
            }
        }
    }

    setStepClasses(step) {
        switch (step) {
            case 'listing':
                this.setState({
                    classes: {
                        listing: "current-step",
                        rooms: "",
                        amenities: "",
                        publish: ""
                    }
                })
                break;
            case 'rooms':
                this.setState({
                    classes: {
                        listing: "visited-step",
                        rooms: "current-step",
                        amenities: "",
                        publish: ""
                    }
                })
                break;
            case 'amenities':
                this.setState({
                    classes: {
                        listing: "visited-step",
                        rooms: "visited-step",
                        amenities: "current-step",
                        publish: ""
                    }
                })
                break;
            case 'publish':
                this.setState({
                    classes: {
                        listing: "visited-step",
                        rooms: "visited-step",
                        amenities: "visited-step",
                        publish: "current-step"
                    }
                })
                break;
            default:
                this.setState({
                    classes: {
                        listing: "current-step",
                        rooms: "",
                        amenities: "",
                        publish: ""
                    }
                })
        }
    }

    componentWillMount() {
        this.setStepClasses(this.props.params.step);
    }

    componentWillReceiveProps(nextProps) {
        let { step } = this.props.params;
        const nextStep = nextProps.params.step;

        if (step != nextStep) {
            this.setStepClasses(nextStep);
        }
    }

    render() {
        let { classes } = this.state;

        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row progress-steps">
                        <div className={"col-md-3 " + classes.listing}>
                            <a href="#">Listing</a>
                            <span className="triangle"></span>
                        </div>
                        <div className={"col-md-3 " + classes.rooms}>
                            <span className="triangle-left"></span>
                            <a href="#">Rooms</a>
                            <span className="triangle"></span>
                        </div>
                        <div className={"col-md-3 " + classes.amenities}>
                            <span className="triangle-left"></span>
                            <a href="#">Amenities</a>
                            <span className="triangle"></span>
                        </div>
                        <div className={"col-md-3 " + classes.publish}>
                            <span className="triangle-left"></span>
                            <a href="#">Publish</a>
                            <span className="triangle"></span>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default ProgressFooter;

