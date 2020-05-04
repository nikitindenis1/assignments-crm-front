const signup_inputs = [
  {
    label: "Name",
    property_name: "name",
    type: "text",
    empty_text: "Required field",
    validation_text: "",
    required:true
  },
  {
    label: "Email",
    property_name: "email",
    type: "email",
    empty_text: "Required field",
    validation_text: "Invalid email",
    required:true
  },
  {
    label: "Password",
    property_name: "password",
    type: "password",
    empty_text: "Required field",
    validation_text: "",
    required:true
  },
];
export default signup_inputs;
