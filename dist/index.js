"use strict";

var _express = _interopRequireDefault(require("express"));

var _new = _interopRequireDefault(require("./new"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Testing imports
var app = (0, _express["default"])();
var PORT = 3000;
app.listen(PORT, function () {
  console.log("Listening on port ".concat(PORT, ".\nDEVNAME : ").concat(_new["default"]));
});