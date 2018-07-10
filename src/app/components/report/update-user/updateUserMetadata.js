import React from "react";
import "../../../html/assets/css/global.css";
import "../../../html/assets/css/style.css";
import "../../../html/assets/css/reset.css";
import { Footer } from "../../commons/footer";
import { SidebarClass } from "../../commons/sidebar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { request } from "https";
const urlForPropertyBetweenDates = "/DataCollection/report/properties/";
const urlForPropertyInformation = "/DataCollection/report/information/";
let citySelectId = "";
let v = "";
let vi = [];
let keys = [];
let values = [];
var noOfProperties = 0;
export class UpdateUserMetadata extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            dateFrom: "",
            dateFromDiv: "",
            dateTo: "",
            propertyData: { hotelAmenities: [], roomData: [], amenitiesData: [], additionalInformation: {} },
            dateToDiv: "",
            createDiv: "",
            errorDiv: "",
            userstate: "",
            // noOfProperties:0
        }

        this.handleChange = this.handleChange.bind(this);
        this.clearAllFields = this.clearAllFields.bind(this);
        this.populatePropertiesBetweenDates = this.populatePropertiesBetweenDates.bind(this);
        this.hideUnhideDiv = this.hideUnhideDiv.bind(this);
        this.onCheckboxSelected = this.onCheckboxSelected.bind(this);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
        this.getPropertyIdAndNames = this.getPropertyIdAndNames.bind(this);
        this.getPropertyInformation = this.getPropertyInformation.bind(this);
        this.getHotelAmenities = this.getHotelAmenities.bind(this);
        this.getRoomdata = this.getRoomdata.bind(this);
        this.getAmenitiesData = this.getAmenitiesData.bind(this);
        this.getAdditionalInfomation = this.getAdditionalInfomation.bind(this);

    }


    populatePropertiesBetweenDates() {

        console.log("in populatePropertiesBetweenDates");

        fetch(urlForPropertyBetweenDates + this.state.dateFrom + "/" + this.state.dateTo).then(function (response) {
            // alert("in response--"+response.json())
            return response.json();
        })

            .then(d => {
                console.log(d);
                this.clearAllFields()
                //console.log("then data::" + JSON.stringify(d))

                console.log("then data::" + d.propertyNameId);

                this.setState({
                    data: d.propertyNameId
                })
                console.log("data is :" + this.state.data);

            })
    }


    clearAllFields() {

        this.setState({
            dateFromDiv: "",
            dateToDiv: "",
            errorDiv: ""
        })
    }

    isNotEmptyFieldCheck(event) {
        event.preventDefault();

        this.setState({
            dateFromDiv: "",
            dateToDiv: "",
            errorDiv: ""
        })

        console.log("in notempty::" + this.state.dateFrom)

        if (this.state.dateFrom == null || this.state.dateFrom == '') {
            this.setState({
                dateFromDiv: "Please select a start date"
            })
            return false;
        }

        else if (this.state.dateTo == null || this.state.dateTo == '') {
            this.setState({
                dateToDiv: "Please select an end date"
            })
            return false;
        }
        return true;
    }

    handleChange(event) {
        console.log("in handlechange::" + event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onCheckboxSelected(event) {
        var checked = event.target.checked
        this.setState({
            [event.target.name]: checked
        })
    }

    hideUnhideDiv(event) {
        //document.getElementById('1').checked = true

        var value = event.target.value;
        var id = event.target.id;
        var checked = event.target.checked
        console.log("checked is::" + checked + "::value is::" + value + "::id is::" + id +
            "::noOfPropertis::" + noOfProperties);

        for (var i = 1; i < noOfProperties; i++) {
            console.log("in for loop ::i is::" + i + "::id is::" + id);
            if (i != id) {
                document.getElementById(i).checked = false
            }
        }

        var x = document.getElementById("divPropertyInfo");

        fetch(urlForPropertyInformation + value).then(function (response) {
            // alert("in response--"+response.json())
            return response.json();
        })

            .then(d => {
                console.log(d);

                //console.log("then data::" + JSON.stringify(d))

                console.log("then data::" + d.data);

                this.setState({
                    propertyData: d.data
                })
                console.log("data is :" + this.state.propertyData);

            })

        if (checked == true) {
            console.log("if hideunhide div");
            x.style.display = "block";
        } else {
            console.log("else hideunhide div");
            x.style.display = "none";
        }

    }

    getPropertyInformation() {
        console.log("in getPropertyInfomation");
        console.log("date is::" + this.state.propertyData.date);
        var rows = [];
        console.log("this.state.data len--" + this.state.propertyData.length)


        rows.push(
            <tr key="1">
                <td >{this.state.propertyData.date}</td>
                <td>{this.state.propertyData.cityName}</td>
                <td>{this.state.propertyData.noOfRooms}</td>
                <td>{this.state.propertyData.googleMapUrl}</td>
            </tr >
        );

        return rows;
    }

    getHotelAmenities() {
        console.log("in getHotelAmenities");

        var rows = [];
        var x = JSON.stringify(this.state.propertyData.hotelAmenities[0]);
        console.log(x);

        console.log("this.state.hotelAmenities--" + JSON.stringify(this.state.propertyData.hotelAmenities));

        for (var i = 0; i < this.state.propertyData.hotelAmenities.length; i++) {

            rows.push(
                <tr key={i}>
                    <td >{this.state.propertyData.hotelAmenities[i].amenity}</td>
                    <td>{this.state.propertyData.hotelAmenities[i].remarks}</td>
                </tr >
            );
        }

        return rows;
    }

    getRoomdata() {
        console.log("in getRoomData");
        var rows = [];
        var x = JSON.stringify(this.state.propertyData.roomData[0]);
        console.log(x);

        console.log("this.state.hotelAmenities--" + JSON.stringify(this.state.propertyData.roomData));

        for (var i = 0; i < this.state.propertyData.roomData.length; i++) {

            rows.push(
                <tr key={i}>
                    <td >{this.state.propertyData.roomData[i].room_number}</td>
                    <td>{this.state.propertyData.roomData[i].room_size}</td>
                    <td >{this.state.propertyData.roomData[i].room_type}</td>
                    <td>{this.state.propertyData.roomData[i].bed_type}</td>
                    <td >{this.state.propertyData.roomData[i].mattress_space}</td>
                    <td>{this.state.propertyData.roomData[i].occupancy}</td>
                    <td>{this.state.propertyData.roomData[i].balcony}</td>
                </tr >
            );
        }

        return rows;

    }

    getAmenitiesData() {
        console.log("in getAmenitiesData");
        var rows = [];
        var x = JSON.stringify(this.state.propertyData.amenitiesData[0]);
        console.log(x);

        console.log("this.state.hotelAmenities--" + JSON.stringify(this.state.propertyData.amenitiesData));

        for (var i = 0; i < this.state.propertyData.amenitiesData.length; i++) {

            rows.push(
                <tr key={i}>
                    <td >{this.state.propertyData.amenitiesData[i].room_type}</td>
                    <td>{this.state.propertyData.amenitiesData[i].water}</td>
                    <td >{this.state.propertyData.amenitiesData[i].locker}</td>
                    <td>{this.state.propertyData.amenitiesData[i].wardrobe}</td>
                    <td >{this.state.propertyData.amenitiesData[i].sofa_set}</td>
                    <td>{this.state.propertyData.amenitiesData[i].coffee_table}</td>
                    <td>{this.state.propertyData.amenitiesData[i].study_table}</td>

                    <td >{this.state.propertyData.amenitiesData[i].teliphone}</td>
                    <td>{this.state.propertyData.amenitiesData[i].bath_tub}</td>
                    <td >{this.state.propertyData.amenitiesData[i].balcony}</td>
                    <td>{this.state.propertyData.amenitiesData[i].mini_bar}</td>
                    <td >{this.state.propertyData.amenitiesData[i].air_conditioning}</td>
                    <td>{this.state.propertyData.amenitiesData[i].lcd_tv}</td>
                    <td>{this.state.propertyData.amenitiesData[i].tea_coffee}</td>

                    <td>{this.state.propertyData.amenitiesData[i].refrigerator}</td>
                    <td >{this.state.propertyData.amenitiesData[i].kitchenette}</td>
                    <td>{this.state.propertyData.amenitiesData[i].hair_dryer}</td>
                    <td>{this.state.propertyData.amenitiesData[i].free_toiletries}</td>
                </tr >
            );
        }

        return rows;

    }

    getAdditionalInfomation() {

        console.log("in getAdditionalInfomation");
        var rows = [];
        var x = JSON.stringify(this.state.propertyData.additionalInformation);

        rows.push(
            <tr key="1">
                <td >{this.state.propertyData.additionalInformation.smallMaleHKUniform}</td>
                <td>{this.state.propertyData.additionalInformation.smallMaleFOUniform}</td>
                <td >{this.state.propertyData.additionalInformation.smallFemaleHKUniform}</td>
                <td>{this.state.propertyData.additionalInformation.smallFemaleFOUniform}</td>
                <td >{this.state.propertyData.additionalInformation.mediumMaleHKUniform}</td>
                <td>{this.state.propertyData.additionalInformation.mediumMaleFOUniform}</td>
                <td>{this.state.propertyData.additionalInformation.mediumFemaleHKUniform}</td>
                <td>{this.state.propertyData.additionalInformation.mediumFemaleFOUniform}</td>
                <td >{this.state.propertyData.additionalInformation.largeMaleHKUniform}</td>
                <td>{this.state.propertyData.additionalInformation.largeMaleFOUniform}</td>
                <td >{this.state.propertyData.additionalInformation.largeFemaleHKUniform}</td>
                <td>{this.state.propertyData.additionalInformation.largeFemaleFOUniform}</td>

            </tr >
        );

        return rows;
    }



    getPropertyIdAndNames() {
        console.log("in get propertyNamesAndId");

        const property = [];
        var i = 1;
        for (var key in this.state.data) {
            if (this.state.data.hasOwnProperty(key)) {
                {
                    keys.push(key);
                    values.push(this.state.data[key])
                    //console.log("key is::" + key + "::value is::" + this.state.data[key]);
                    property.push(<li key={key}><input type="radio" key={key} id={i}
                        value={key} onChange={(e) => this.hideUnhideDiv(e)} />
                        {this.state.data[key]}</li>);
                    i++;
                    console.log("i is::"+i);
                }
            }
        }
        noOfProperties = i;

        /* property.push(<li key="1"><input type="radio" key="1" id="1"
         value="1" onChange={(e) => this.hideUnhideDiv(e)} />
         p1</li>);
         property.push(<li key="2"><input type="radio" key="2" id="2"
         value="2" onChange={(e) => this.hideUnhideDiv(e)} />
         p2</li>);
         property.push(<li key="3"><input type="radio" key="3" id="3"
         value="3" onChange={(e) => this.hideUnhideDiv(e)} />
         p2</li>);
         // this.setState({
           //  noOfProperties:3
         //})
         noOfProperties = 3;
 
         */

        return property;
    }

    onDropdownSelected(event) {

        var propState = event.target.value;
        console.log("propState is::" + propState);

        this.setState({
            [event.target.name]: propState
        })
    }


    render() {

        console.log("in get propertyNamesAndId");
        var d1 = this.state.data



        return (
            <div className="content">
                <div className="container clearfix">

                    <div className="main-content">
                        <div className="property-form">
                            <h1 className="page-title">Properties Report</h1>

                            <form>

                                <div className="form-wrap">
                                    <label className="form-title">Start Date</label>
                                    <input type="date" name="dateFrom" id="dateFromId" maxLength="100"
                                        value={this.state.dateFrom} onChange={this.onDropdownSelected} />
                                    <div className="error" id="dateFromDivId" data-value=
                                        {this.state.dateFromDiv}>{this.state.dateFromDiv}</div>
                                </div>

                                <div className="form-wrap">
                                    <label className="form-title">End Date</label>
                                    <input type="date" name="dateTo" id="dateToId" maxLength="100"
                                        value={this.state.dateTo} onChange={this.onDropdownSelected} />
                                    <div className="error" id="dateToDivId" data-value=
                                        {this.state.dateToDiv}>{this.state.dateToDiv}</div>
                                </div>
                                <br /><br />
                                <input type="submit" value="generate report" onClick={(event) => {
                                    if (this.isNotEmptyFieldCheck(event)) {
                                        this.populatePropertiesBetweenDates();
                                    }
                                }} />

                                <br />



                                <div id="divPropertyInfo" style={{ display: 'none' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th >Date</th>
                                                <th >City</th>
                                                <th >Number Of Rooms</th>
                                                <th >Google Map Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getPropertyInformation()}

                                        </tbody>
                                    </table>
                                    <br />

                                    <table>
                                        <thead>
                                            <tr>
                                                <th >Amenities</th>
                                                <th >Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getHotelAmenities()}

                                        </tbody>
                                    </table>
                                    <br />

                                    <table>
                                        <thead>
                                            <tr>
                                                <th >Room Number</th>
                                                <th >Room Size</th>
                                                <th >Room Type</th>
                                                <th >Bed Type</th>
                                                <th >Mattress Space</th>
                                                <th >Occupancy</th>
                                                <th >Balcony</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getRoomdata()}

                                        </tbody>
                                    </table>
                                    <br />

                                    <table>
                                        <thead>
                                            <tr>
                                                <th >Room Type</th>
                                                <th >Water</th>
                                                <th >Locker</th>
                                                <th >Wardrobe</th>
                                                <th >Sofa Set</th>
                                                <th >Coffee Table</th>
                                                <th >Study Table</th>

                                                <th >Telephone</th>
                                                <th >Bath Tub</th>
                                                <th >Balcony</th>
                                                <th >Mini Bar</th>
                                                <th >Air Conditioning</th>
                                                <th >Lcd Tv</th>
                                                <th >Tea Coffee</th>
                                                <th >Refrigerator</th>
                                                <th >Kitchenette</th>
                                                <th >Hair Dryer</th>
                                                <th >Free Toiletries</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getAmenitiesData()}

                                        </tbody>
                                    </table>
                                    <br />


                                    <table>
                                        <thead>
                                            <tr>
                                                <th >Small Male HouseKeeping Uniform</th>
                                                <th >Small Male FrontOffice Uniform</th>
                                                <th >Small Female HouseKeeping Uniform</th>
                                                <th >Small Female FrontOffice Uniform</th>
                                                <th >Medium Male HouseKeeping Uniform</th>
                                                <th >Medium Male FrontOffice Uniform</th>
                                                <th >Medium Female HouseKeeping Uniform</th>
                                                <th >Medium Female FrontOffice Uniform</th>

                                                <th >Large Male HouseKeeping Uniform</th>
                                                <th >Large Male FrontOffice Uniform</th>
                                                <th >Large Female HouseKeeping Uniform</th>
                                                <th >Large Female FrontOffice Uniform</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getAdditionalInfomation()}

                                        </tbody>
                                    </table>
                                    <br />

                                </div>

                                <div className="success" id="createDivId" value={this.state.createDiv}>
                                    {this.state.createDiv}</div>
                                <div className="error" id="errorDivId" value={this.state.errorDiv}>
                                    {this.state.errorDiv}</div>

                                <div className="form-wrap">
                                    <ul>
                                        {this.getPropertyIdAndNames()}
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
