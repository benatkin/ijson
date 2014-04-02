var special = ["⊤", "⊥", "∅", "+", "-", ";"];

function encode(val) {
  var result;

  if (Array.isArray(val)) {
    return val.map(encode);
  } else if (val !== null && typeof val == "object") {
    result = {};
    Object.keys(val).forEach(function(key) {
      result[key] = encode(val[key]);
    });
    return result;
  } else if (val === true) {
    return "⊤";
  } else if (val === false) {
    return "⊥";
  } else if (val === null) {
    return "∅";
  } else if (typeof val == "string" && val.length > 0) {
    if (special.indexOf(val[0]) != -1) {
      return "`" + val;
    } else {
      return val;
    }
  } else {
    return val;
  }
}

function decode(val) {
  var result;

  if (Array.isArray(val)) {
    return val.map(decode);
  } else if (val !== null && typeof val == "object") {
    result = {};
    Object.keys(val).forEach(function(key) {
      result[key] = decode(val[key]);
    });
    return result;
  } else if (typeof val != "string") {
    return val;
  } else if (val == "⊤" || val == "+") {
    return true;
  } else if (val == "⊥" || val == "-") {
    return false;
  } else if (val == "∅" || val == ";") {
    return null;
  } else if (val.length > 1 && val[0] == '`' && special.indexOf(val[1]) != -1) {
    return val[1];
  } else {
    return val;
  }
}

function prettify(val) {
  var result;

  if (Array.isArray(val)) {
    return val.map(decode);
  } else if (val !== null && typeof val == "object") {
    result = {};
    Object.keys(val).forEach(function(key) {
      result[key] = decode(val[key]);
    });
    return result;
  } else if (typeof val != "string") {
    return val;
  } else if (val == "+") {
    return "⊤";
  } else if (val == "-") {
    return "⊥";
  } else if (val == ";") {
    return "∅";
  } else {
    return val;
  }
}

exports.encode = encode;
exports.decode = decode;
exports.prettify = prettify;
