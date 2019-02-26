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
      value: properties[3]
    };
  }
  return input;
};

export default createInput;
