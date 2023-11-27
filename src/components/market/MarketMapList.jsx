import { CircularProgress } from "@mui/material";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

const MarketMapList = () => {
  const marketList = useSelector((state) => state.market.marketList);
  console.log(marketList);
  return (
    <>
      <MapContainer
        doubleClickZoom={false}
        id="mapId"
        zoom={6}
        style={{ height: "400px", width: "100%" }}
        center={[20.5937, 78.9629]}
      >
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
        />

        {marketList?.length > 0 ? (
          <>
            {marketList?.map((ele) => (
              <Marker position={ele.coordinates.pickUpCoordinate} key={ele._id}>
                <Popup >
                  Pick-Up:{ele.pickUpLocation.district} drop-off:
                  {ele.dropOffLocation.district}
                  
                </Popup>
              </Marker>
            ))}
          </>
        ) : (
          <CircularProgress />
        )}
      </MapContainer>
    </>
  );
};

export default MarketMapList;
