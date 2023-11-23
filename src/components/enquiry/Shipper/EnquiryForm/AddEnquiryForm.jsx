import React, { useEffect, useState } from "react";
import LoadInfoForm from "./LoadInfoForm";
import AddressForm from "./AddressForm";
import { CircularProgress, Grid } from "@mui/material";
import EnquiryCalculation from "./EnquiryCalculation";
import EnquiryApproval from "./EnquiryApproval";
import {
  startGetEnquiryCalculation,
  startAddEnquiry,
} from "../../../../redux/action/enquiryAction";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const AddEnquiryForm = () => {
  const [isLoding, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/myenquiries", { state: "successfully enquiry added" });
  };
  const { enquiryCalculation, newCoordinates } = useSelector(
    (state) => state.enquiry
  );
  const dispatch = useDispatch();
  const [enquiryForm, setEnquiryForm] = useState({
    loadType: "",
    loadWeight: "",
    pickUpLocation: {},
    dropOffLocation: {},
  });

  const pickUp = (data) => {
    setEnquiryForm({
      ...enquiryForm,
      pickUpLocation: { ...data, lat: 0, lng: 0 },
    });
  };

  const dropOff = (data) => {
    setEnquiryForm({
      ...enquiryForm,
      dropOffLocation: { ...data, lat: 0, lng: 0 },
    });
  };

  const loadInfo = (loadinformation) => {
    setEnquiryForm({ ...enquiryForm, ...loadinformation });
  };

  const handleCalculation = () => {
    dispatch(startGetEnquiryCalculation(enquiryForm));
  };

  const handleEnquirySubmit = (dateOfPickUp, dateOfUnload) => {
    const newFormData = { ...enquiryCalculation };
    newFormData.paymentType = "advance";
    newFormData.dateOfPickUp = dateOfPickUp;
    newFormData.dateOfUnload = dateOfUnload;
    setIsLoading(true);
    dispatch(startAddEnquiry(newFormData, handleNavigate));
  };

  // auto api call for the when new drag of pin happens in Routing
  useEffect(() => {
    if (!isEmpty(newCoordinates)) {
      const newFormData = { ...enquiryCalculation };
      newFormData.pickUpLocation.lat = newCoordinates.source.lat;
      newFormData.pickUpLocation.lng = newCoordinates.source.lng;
      newFormData.dropOffLocation.lat = newCoordinates.distination.lat;
      newFormData.dropOffLocation.lng = newCoordinates.distination.lng;
      console.log(newFormData);
      dispatch(startGetEnquiryCalculation(newFormData));
    }
  }, [newCoordinates]);
  return (
    <>
      {isLoding ? (
        <CircularProgress />
      ) : (
        <Grid component={"form"} container spacing={2}>
          <LoadInfoForm loadInfo={loadInfo} />
          <AddressForm name={"Pick-Up"} address={pickUp} />
          <AddressForm name={"Drop-Off"} address={dropOff} />
          <EnquiryCalculation handleCalculation={handleCalculation} />
          {!isEmpty(enquiryCalculation) && (
            <EnquiryApproval
              {...enquiryCalculation}
              handleEnquirySubmit={handleEnquirySubmit}
            />
          )}
        </Grid>
      )}
    </>
  );
};

export default AddEnquiryForm;
