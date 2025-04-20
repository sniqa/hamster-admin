import fastify from "fastify";
import jwt from "@fastify/jwt";

const myCustomMessages = {
  badRequestErrorMessage: "Format is Authorization: Bearer [token]",
  badCookieRequestErrorMessage: "Cookie could not be parsed in request",
  noAuthorizationInHeaderMessage:
    "No Authorization was found in request.headers",
  noAuthorizationInCookieMessage:
    "No Authorization was found in request.cookies",
  authorizationTokenExpiredMessage: "Authorization token expired",
  authorizationTokenUntrusted: "Untrusted authorization token",
  authorizationTokenUnsigned: "Unsigned authorization token",
  // for the below message you can pass a sync function that must return a string as shown or a string
  authorizationTokenInvalid: (err: Error) => {
    return `Authorization token is invalid: ${err.message}`;
  },
};

fastify.register(jwt, {
  secret: "supersecret",
  messages: myCustomMessages,
});
