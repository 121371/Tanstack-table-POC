import AdditionalAddresses from "../AdditionalAddresses/AdditionalAddresses";
import AddRegistration from "../Registration/Registration";
import BankAccounts from "../BankAccounts/BankAccounts";
import NetworkRelationship from "../NetworkRelationship/NetworkRelationship";
import Ratings from "../Ratings/Ratings";

const ThirdPartyTabularSections = () => {
  return (
    <div>
      {/* Network Relationships Component */}
      <NetworkRelationship />

      {/* Additional Addresses Component */}
      <AdditionalAddresses />

      {/* Add Registration Component */}
      <AddRegistration />

      {/* Bank Accounts Component */}
      <BankAccounts />

      {/* Ratings Component */}
      <Ratings />
    </div>
  );
};

export default ThirdPartyTabularSections;
