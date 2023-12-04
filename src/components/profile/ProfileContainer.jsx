import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileStatistics from "./ProfileStatistics";

const ProfileContainer = () => {
  return (
    <div>
      <ProfileStatistics />
      <ProfileInfo />
    </div>
  );
};

export default ProfileContainer;
