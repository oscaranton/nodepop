"use strict";

// isAPI request validation function
module.exports.isAPI = function (req) {
    return req.originalUrl.indexOf('/apiv') === 0;
  }