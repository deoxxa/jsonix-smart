#!/usr/bin/env node

var fs = require("fs"),
    Jsonix = require("../");

var mappings = [
  require("./mappings/org_w3__2000__09_xmldsig").org_w3__2000__09_xmldsig,
  require("./mappings/org_w3__2001__04_xmlenc").org_w3__2001__04_xmlenc,
  require("./mappings/oasis_names_tc_saml__2_0_assertion").oasis_names_tc_saml__2_0_assertion,
  require("./mappings/oasis_names_tc_saml__2_0_metadata").oasis_names_tc_saml__2_0_metadata,
  require("./mappings/oasis_names_tc_saml__2_0_protocol").oasis_names_tc_saml__2_0_protocol,
];

var context = new Jsonix.SmartContext(mappings);

var AuthnRequest = context.getClass("urn:oasis:names:tc:SAML:2.0:protocol", "AuthnRequest"),
    Issuer = context.getClass("urn:oasis:names:tc:SAML:2.0:assertion", "Issuer"),
    LogoutRequest = context.getClass("urn:oasis:names:tc:SAML:2.0:protocol", "LogoutRequest"),
    NameID = context.getClass("urn:oasis:names:tc:SAML:2.0:assertion", "NameID"),
    NameIDPolicy = context.getClass("urn:oasis:names:tc:SAML:2.0:protocol", "NameIDPolicy");

var authnRequest = new AuthnRequest({
  id: "this is the id",
  version: "2.0",
  issuer: new Issuer("i am the issuer"),
  nameIDPolicy: new NameIDPolicy({allowCreate: true, format: "urn:oasis:names:tc:SAML:1.1:nameid-format:transient"}),
});

var logoutRequest = new LogoutRequest({
  id: "this is the id",
  version: "2.0",
  issuer: new Issuer("i am the issuer"),
  nameID: new NameID({value: "the name"}),
});

console.log(authnRequest.toDocument() + "");
console.log(logoutRequest.toDocument() + "");
