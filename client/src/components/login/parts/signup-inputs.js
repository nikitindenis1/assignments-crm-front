const signup_inputs = [
  {
    label: "NAME",
    property_name: "name",
    type: "text",
    empty_text: "REQUIRED_FIELD",
    validation_text: "",
    required:true
  },
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
export default signup_inputs;
