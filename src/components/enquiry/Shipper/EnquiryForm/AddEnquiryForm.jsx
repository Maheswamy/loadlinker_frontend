import React, { useEffect, useState } from "react";
import LoadInfoForm from "./LoadInfoForm";
import AddressForm from "./AddressForm";
import { Grid } from "@mui/material";
import EnquiryCalculation from "./EnquiryCalculation";
import EnquiryApproval from "./EnquiryApproval";
import { startGetEnquiryCalculation } from "../../../../redux/action/enquiryAction";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

const AddEnquiryForm = () => {
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

  useEffect(() => {
    if (!isEmpty(newCoordinates)) {
      const newFormData = { ...enquiryCalculation };

      if (
        !(enquiryCalculation.pickUpLocation.lat.toFixed(2) ===
          newCoordinates.source.lat.toFixed(2) &&
        enquiryCalculation.pickUpLocation.lng.toFixed(2) ===
          newCoordinates.source.lng.toFixed(2) &&
        enquiryCalculation.dropOffLocation.lat.toFixed(2) ===
          newCoordinates.distination.lat.toFixed(2) &&
        enquiryCalculation.dropOffLocation.lng.toFixed(2) ===
          newCoordinates.distination.lng.toFixed(2))
      ) {
        newFormData.pickUpLocation.lat = newCoordinates.source.lat;
        newFormData.pickUpLocation.lng = newCoordinates.source.lng;
        newFormData.dropOffLocation.lat = newCoordinates.distination.lat;
        newFormData.dropOffLocation.lng = newCoordinates.distination.lng;

        dispatch(startGetEnquiryCalculation(newFormData));
      }
    }
  }, [newCoordinates, enquiryCalculation]);
  return (
    <Grid component={"form"} container spacing={2}>
      <LoadInfoForm loadInfo={loadInfo} />
      <AddressForm name={"Pick-Up"} address={pickUp} />
      <AddressForm name={"Drop-Off"} address={dropOff} />
      <EnquiryCalculation handleCalculation={handleCalculation} />
      {!isEmpty(enquiryCalculation) && (
        <EnquiryApproval {...enquiryCalculation} />
      )}
    </Grid>
  );
};

export default AddEnquiryForm;
