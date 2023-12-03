import React, { useEffect, useState } from "react";
import LoadInfoForm from "./LoadInfoForm";
import AddressForm from "./AddressForm";
import { Grid } from "@mui/material";
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
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [dateErrors, setDateErrors] = useState({});
  const errors = {
    dropOffLocation: {},
    pickUpLocation: {},
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    // if (error) {
    //   return setIsLoading(false);
    // }
    navigate("/myenquiries", { state: "successfully enquiry added" });
  };
  const { enquiryCalculation, newCoordinates, serverErrors } = useSelector(
    (state) => state.enquiry
  );
  const dispatch = useDispatch();
  const initialState = {
    loadType: "",
    loadWeight: "",
    pickUpLocation: {
      state: "",
      country: "",
      pin: "",
      area: "",
      district: "",
      address: "",
    },
    dropOffLocation: {
      state: "",
      country: "",
      pin: "",
      area: "",
      district: "",
      address: "",
    },
  };
  const [enquiryForm, setEnquiryForm] = useState(initialState);

  const runValidation = () => {
    if (enquiryForm.loadType.trim().length === 0) {
      errors.loadType = "Please add Load Material";
    }

    if (enquiryForm?.loadWeight.trim().length === 0) {
      errors.loadWeight = "Please add Load Weight";
    } else if (Number(enquiryForm?.loadWeight) <= 0) {
      errors.loadWeight = "Load Weight should be more zero";
    } else if (Number(enquiryForm?.loadWeight) > 49000) {
      errors.loadWeight =
        "maximum load capacity of vehicle in website is 49000kg's";
    }

    if (enquiryForm?.pickUpLocation.pin.length === 0) {
      errors.pickUpLocation.pin = "pincode is required";
    }

    if (enquiryForm?.dropOffLocation.pin.length === 0) {
      errors.dropOffLocation.pin = "pincode is required";
    }

    if (enquiryForm?.pickUpLocation?.state.trim().length === 0) {
      errors.pickUpLocation.state = "state is required";
    }

    if (enquiryForm?.dropOffLocation.state.trim().length === 0) {
      errors.dropOffLocation.state = "state is required";
    }

    if (enquiryForm?.pickUpLocation.country.trim().length === 0) {
      errors.pickUpLocation.country = "country is required";
    }

    if (enquiryForm?.dropOffLocation.country.trim().length === 0) {
      errors.dropOffLocation.country = "country is required";
    }

    if (enquiryForm?.pickUpLocation.area.trim().length === 0) {
      errors.pickUpLocation.area = "area is required";
    }

    if (enquiryForm?.dropOffLocation.area.trim().length === 0) {
      errors.dropOffLocation.area = "area is required";
    }
    if (enquiryForm?.pickUpLocation.district.trim().length === 0) {
      errors.pickUpLocation.district = "district is required";
    }

    if (enquiryForm?.dropOffLocation.district.trim().length === 0) {
      errors.dropOffLocation.district = "district is required";
    }

    if (enquiryForm?.pickUpLocation.address.trim().length === 0) {
      errors.pickUpLocation.address = "address is required";
    }

    if (enquiryForm?.dropOffLocation.address.trim().length === 0) {
      errors.dropOffLocation.address = "address is required";
    }

    setFormErrors(errors);
    const result = [];
    for (const key in errors) {
      if (isEmpty(errors[key])) {
        console.log(errors[key]);
      } else {
        result.push(true);
      }
    }
    return result.length === 0;
  };

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

  const SpinnerHandler = (value) => {
    setIsLoading(value);
  };
  const handleCalculation = () => {
    if (runValidation()) {
      setIsLoading(true);
      setFormErrors(initialState);
      dispatch(startGetEnquiryCalculation(enquiryForm, SpinnerHandler));
    }
  };

  const handleEnquirySubmit = (dateOfPickUp, dateOfUnload) => {
    // const newFormData = { ...enquiryCalculation };

    if (new Date(dateOfPickUp) <= new Date(dateOfUnload)) {
      enquiryCalculation.dateOfPickUp = new Date(
        dateOfPickUp
      ).toLocaleDateString();
      enquiryCalculation.dateOfUnload = new Date(
        dateOfUnload
      ).toLocaleDateString();
      setIsLoading(true);

      //
      dispatch(
        startAddEnquiry(enquiryCalculation, handleNavigate, SpinnerHandler)
      );
    } else {
      setIsLoading(false);
      setDateErrors({
        dateOfPickUp: "unload date should be greater than pickup date",
        dateOfUnload: "unload date should be greater than pickup date",
      });
    }
  };

  // auto api call for the when new drag of pin happens in Routing
  useEffect(() => {
    if (!isEmpty(newCoordinates)) {
      const newFormData = {
        ...enquiryCalculation,
        pickUpLocation: {
          ...enquiryCalculation.pickUpLocation,
          lat: newCoordinates.source.lat,
          lng: newCoordinates.source.lng,
        },
        dropOffLocation: {
          ...enquiryCalculation.dropOffLocation,
          lat: newCoordinates.distination.lat,
          lng: newCoordinates.distination.lng,
        },
      };
      dispatch(startGetEnquiryCalculation(newFormData, SpinnerHandler));
    }
  }, [newCoordinates]);
  return (
    <>
      <Grid component={"form"} container spacing={2}>
        <LoadInfoForm
          loadInfo={loadInfo}
          formErrors={formErrors}
          serverErrors={serverErrors}
          state={enquiryCalculation}
        />
        <AddressForm
          name={"Pick-Up"}
          address={pickUp}
          formErrors={formErrors.pickUpLocation}
          serverErrors={serverErrors.pickUpLocation}
          state={enquiryCalculation.pickUpLocation}
        />
        <AddressForm
          name={"Drop-Off"}
          address={dropOff}
          formErrors={formErrors.dropOffLocation}
          serverErrors={serverErrors.dropOffLocation}
          state={enquiryCalculation.dropOffLocation}
        />

        <EnquiryCalculation
          handleCalculation={handleCalculation}
          spinner={isLoading}
        />
        {!isEmpty(enquiryCalculation) && (
          <EnquiryApproval
            {...enquiryCalculation}
            handleEnquirySubmit={handleEnquirySubmit}
            dateErrors={dateErrors}
            serverErrors={serverErrors}
            state={enquiryCalculation}
            spinner={isLoading}
          />
        )}
      </Grid>
    </>
  );
};

export default AddEnquiryForm;
