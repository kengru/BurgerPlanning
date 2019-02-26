/**
 * Recieves properties in order: elementType, type, placeholder, value.
 * @param {array} properties
 */

const createInput = properties => {
  let input = null;
  if (properties[0] === "input") {
    input = {
      elementType: properties[0],
      elementConfig: {
        type: properties[1],
        placeholder: properties[2]
      },
      value: properties[3],
      validation: {
        required: properties[4],
        minLength: properties[5]
      },
      touched: false,
      valid: false
    };
  }
  return input;
};

export default createInput;
