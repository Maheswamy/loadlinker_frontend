// import { Grid, TextField, Button, Typography, Box } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   startGetEnquiryCalculation,
//   deleteCalculate,
//   startAddEnquiry,
// } from "../../../redux/action/enquiryAction";
// import { isEmpty } from "lodash";

// import AddressForm from "./EnquiryForm/AddressForm";
// import EnquiryApproval from "./EnquiryForm/EnquiryApproval";
// import LoadInfoForm from "./EnquiryForm/LoadInfoForm";
// import EnquiryCalculation from "./EnquiryForm/EnquiryCalculation";

// const AddEnquiryForm = () => {
//   const [pickaddress, setPickAddress] = useState("");
//   const [pickarea, setPickArea] = useState("");
//   const [pickdistrict, setPickDistrict] = useState("");
//   const [pickcountry, setPickCountry] = useState("");
//   const [pickpin, setPickPin] = useState("");
//   const [pickstate, setPickState] = useState("");
//   const [dropaddress, setDropAddress] = useState("");
//   const [droparea, setDropArea] = useState("");
//   const [dropdistrict, setDropDistrict] = useState("");
//   const [dropcountry, setDropCountry] = useState("");
//   const [droppin, setDropPin] = useState("");
//   const [dropstate, setDropState] = useState("");
//   const [loadWeight, setLoadWeight] = useState("");
//   const [loadType, setLoadType] = useState("");

//   const [formError, setFormError] = useState({});
//   const errors = {};

//   const [pickOffAddress, setPickOffAddress] = useState({});
//   const [dropAddress, setDropAddresss] = useState({});

//   const dispatch = useDispatch();
//   const calculatedEnquiry = useSelector(
//     (state) => state.enquiry.enquiryCalculation
//   );
//   const coordinates = useSelector((state) => state.enquiry.newCoordinates);

//   useEffect(() => {
//     return () => {
//       dispatch(deleteCalculate());
//     };
//   }, []);

//   const runValidation = () => {
//     if (loadWeight.trim().length <= 0) {
//       errors.loadWeight = "load weight should more zero";
//     }
//     if (loadType.trim().length == 0) {
//       errors.loadType = "load type is required";
//     }
//     if (pickaddress.trim().length == 0) {
//       errors.pickaddress = "address is required";
//     }
//     if (pickarea.trim().length == 0) {
//       errors.pickarea = "area is required";
//     }
//     if (pickdistrict.trim().length == 0) {
//       errors.pickdistrict = "district is required";
//     }
//     if (pickcountry.trim().length == 0) {
//       errors.pickcountry = "country is required";
//     }
//     if (pickpin.trim().length == 0) {
//       errors.pickpin = "pincode is required";
//     }
//     if (pickstate.trim().length == 0) {
//       errors.pickstate = "state is required";
//     }

//     if (dropaddress.trim().length == 0) {
//       errors.dropaddress = "address is required";
//     }
//     if (droparea.trim().length == 0) {
//       errors.droparea = "area is required";
//     }
//     if (dropdistrict.trim().length == 0) {
//       errors.dropdistrict = "district is required";
//     }
//     if (dropcountry.trim().length == 0) {
//       errors.dropcountry = "country is required";
//     }
//     if (droppin.trim().length == 0) {
//       errors.droppin = "pincode is required";
//     }
//     if (dropstate.trim().length == 0) {
//       errors.dropstate = "state is required";
//     }

//     setFormError(errors);
//     return isEmpty(errors);
//   };

//   const getPickUpAddress = (address) => {
//     console.log(address);
//     setPickOffAddress(address);
//   };
//   const getDropOffAddress = (address) => {
//     console.log(address);
//     setDropAddresss(address);
//   };
//   const formData = () => {
//     return {
//       loadType,
//       loadWeight: Number(loadWeight),
//       pickUpLocation: {
//         address: pickaddress,
//         area: pickarea,
//         district: pickdistrict,
//         state: pickstate,
//         country: pickcountry,
//         pin: pickpin,
//         lat: coordinates?.source.lat ? coordinates?.source.lat : null,
//         lng: coordinates?.source.lng ? coordinates?.source.lng : null,
//       },
//       dropUpLocation: {
//         address: dropaddress,
//         area: droparea,
//         district: dropdistrict,
//         state: dropstate,
//         pin: droppin,
//         country: dropcountry,
//         lat: coordinates?.distination.lat ? coordinates?.distination.lat : null,
//         lng: coordinates?.distination.lng ? coordinates?.distination.lng : null,
//       },
//       // dateOfPickUp: new Date(startDate).toISOString().split("T")[0],
//       // dateOfUnload: new Date(endDate).toISOString().split("T")[0],
//     };
//   };
//   const handleAddEnquiry = (e) => {
//     e.preventDefault();
//     const validationResult = runValidation();

//     if (validationResult) {
//       setFormError({});
//       console.log(formData());
//       dispatch(startGetEnquiryCalculation(formData()));
//     }
//   };

//   const handleSubmitEnquiry = (e) => {
//     e.preventDefault();
//     console.log(formData());
//     dispatch(startAddEnquiry(formData()));
//   };

//   return (
//     <Grid component={"form"} container spacing={2}>
//       <LoadInfoForm/>
//       <AddressForm name={"Pick-Up"} sendAddress={getPickUpAddress} />
//       <AddressForm name={"Drop-Off"} sendAddress={getDropOffAddress} />
//       <EnquiryCalculation/>
//       {!isEmpty(calculatedEnquiry) && <EnquiryApproval />}
//     </Grid>
//   );
// };

// export default AddEnquiryForm;
