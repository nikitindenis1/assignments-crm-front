const signin_inputs = [
  {
    label: "EMAIL",
    property_name: "email",
    type: "email",
    empty_text: "REQUIRED_FIELD",
    validation_text: "INVALID_EMAIL",
    required:true
  },
  {
    label: "PASSWORD",
    property_name: "password",
    type: "password",
    empty_text: "REQUIRED_FIELD",
    validation_text: "",
    required:true
  },
];
export default signin_inputs;
