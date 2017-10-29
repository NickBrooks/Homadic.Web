import React from 'react';
import FontAwesome from 'react-fontawesome';
import { bedrooms, bathrooms, kitchen, laundry, rentalLengths } from '../../../data';

class RentalRate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            checked: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let key = target.name;

        // check if int or string
        value = target.getAttribute('data-type') === 'int' ? parseFloat(value) : value;

        this.props.updateInputProp(key, value);
    }

    findRentalLength() {
        function isTheRentalLength(duration, rentalLength) {
            return duration == rentalLength.duration;
        }

        const i = rentalLengths.findIndex(isTheRentalLength.bind(null, this.props.rentalTerm.duration));
        return rentalLengths[i];
    }

    render() {
        let { currency, id, rentalTerm, roomId } = this.props;
        let { checked } = this.state;
        const rentalLength = this.findRentalLength();

        return (
            <div className="content-box">
                <div>
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" name={"rooms[" + roomId + "].rental_details[" + id + "]"} defaultChecked={rentalTerm.available} value={rentalTerm.available} onChange={this.handleChange} />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">{rentalLength.label}</span>
                    </label>
                </div>
                {checked ? <div className="row">
                    <div className="col-sm">
                        <label htmlFor="inputRate" className="col-form-label mr-2">Monthly rate</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">{currency}</div>
                            <input type="number" className="form-control mr-3" id="inputRate" required={checked} />
                            <div className="invalid-feedback">
                                The listing needs a name!
                        </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <label htmlFor="inputDeposit" className="col-form-label mr-2">Deposit</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon">{currency}</div>
                            <input type="number" className="form-control mr-3" id="inputDeposit" required={checked} />
                        </div>
                    </div>
                </div> : undefined}
            </div>
        )
    }
}

class Room extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSetExpandedRoom = this.handleSetExpandedRoom.bind(this);
        this.handleRemoveRoom = this.handleRemoveRoom.bind(this);
    }

    roomTitle() {
        let { room } = this.props;

        let serviced = "";
        switch (room.serviced) {
            case false:
                serviced = "";
                break;
            case true:
                serviced = ", serviced";
                break;
        }

        let bedroom = "";
        switch (room.bedrooms) {
            case 0:
                bedroom = "Studio";
                break;
            case 1:
                bedroom = "1 bedroom";
                break;
            case 2:
                bedroom = "2 bedroom";
                break;
            case 3:
                bedroom = "3 bedroom";
                break;
        }

        let bathroom = "";
        switch (room.bathrooms) {
            case 1:
                bathroom = "1 bathroom";
                break;
            case 2:
                bathroom = "2 bathroom";
                break;
            case 3:
                bathroom = "3 bathroom";
                break;
        }

        return bedroom + ", " + bathroom + serviced;
    }

    handleChange(e) {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let key = target.name;

        // check if int or string
        value = target.getAttribute('data-type') === 'int' ? parseFloat(value) : value;

        this.props.updateInputProp(key, value);
    }

    handleSetExpandedRoom(e) {
        e.preventDefault();
        let { room, setExpandedRoom } = this.props;

        setExpandedRoom(room.id);
    }

    handleRemoveRoom(e) {
        e.preventDefault();
        let { addListing, room, removeRoom, setExpandedRoom } = this.props;
        let { rooms } = addListing.listing;
        let { expandedRoom } = addListing.ui;

        // if it's the expanded room, we wanna set it to the one above
        if (addListing.ui.expandedRoom == room.id) {
            function isTheRoom(expandedRoom, room) {
                return expandedRoom == room.id;
            }

            const i = rooms.findIndex(isTheRoom.bind(null, expandedRoom));
            setExpandedRoom(rooms[i - 1].id);
        }

        removeRoom(room.id);
    }

    renderDetails() {
        let { addListing, id, room } = this.props;

        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name={"rooms[" + id + "].serviced"} defaultChecked={room.serviced} value={room.serviced} onChange={this.handleChange} />
                            <span className="custom-control-indicator"></span>
                            <span className="custom-control-description">Serviced <FontAwesome className="text-muted" name="user" /></span>
                        </label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="inputBedrooms" className="col-form-label">Bedrooms <FontAwesome className="text-muted" name="bed" /></label>
                        <select id="inputBedrooms" className="form-control" data-type="int" name={"rooms[" + id + "].bedrooms"} value={room.bedrooms} onChange={this.handleChange}>
                            {bedrooms.map((bedroom, i) => (<option key={i} value={bedroom.value}>{bedroom.name}</option>))}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputBathrooms" className="col-form-label">Bathrooms <FontAwesome className="text-muted" name="bath" /></label>
                        <select id="inputBathrooms" className="form-control" data-type="int" name={"rooms[" + id + "].bathrooms"} value={room.bathrooms} onChange={this.handleChange}>
                            {bathrooms.map((bathroom, i) => (<option key={i} value={bathroom.value}>{bathroom.name}</option>))}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputKitchen" className="col-form-label">Kitchen <FontAwesome className="text-muted" name="cutlery" /></label>
                        <select id="inputKitchen" className="form-control" name={"rooms[" + id + "].kitchen"} value={room.kitchen} onChange={this.handleChange}>
                            {kitchen.map((item, i) => (<option key={i} value={item.value}>{item.name}</option>))}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="inputLaundry" className="col-form-label">Laundry <FontAwesome className="text-muted" name="black-tie" /></label>
                        <select id="inputLaundry" className="form-control" name={"rooms[" + id + "].laundry"} value={room.laundry} onChange={this.handleChange}>
                            {laundry.map((item, i) => (<option key={i} value={item.value}>{item.name}</option>))}
                        </select>
                    </div>
                </div>
                <h5>Rates</h5>
                {room.rental_details.map((rentalTerm, i) => (<RentalRate key={i} rentalTerm={rentalTerm} id={i} roomId={id} currency={addListing.listing.currency} {...this.props} />))}
            </div>
        )
    }

    render() {
        let { addListing, id, room } = this.props;

        return (
            <div>
                <div className="content-header min-padding">
                    <div className="row">
                        <div className="col-auto mr-auto">
                            <h5>{this.roomTitle()}</h5>
                        </div>
                        <div className="col-auto">
                            <div className="btn-group">
                                {addListing.ui.expandedRoom != room.id ? <button type="button" onClick={this.handleSetExpandedRoom} className="btn btn-trans btn-sm"><FontAwesome name="caret-down" /></button> : undefined}
                                {addListing.listing.rooms.length > 1 ? <button type="button" onClick={this.handleRemoveRoom} className="btn btn-trans btn-sm"><FontAwesome name="close" /></button> : undefined}
                            </div>
                        </div>
                    </div>
                </div>
                {addListing.ui.expandedRoom == room.id ? this.renderDetails() : undefined}
            </div >
        )
    }
}

export default Room;