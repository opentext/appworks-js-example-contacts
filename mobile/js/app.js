/**
 * Find multiple contacts in the devices contacts database with a filter applied
 */
function findContact() {
  var contacts = new Appworks.AWContacts(
    function (contacts) {
      var output = 'Found ' + contacts.length + ' contacts.';
      for(var i=0; i<contacts.length; i++) {
        output += "<hr class='contact-separator' />";
        output += contactObjectToString(contacts[i]);
      }
      out(output);
    },
    function (contactError) {
      out(contactError);
    }
  );

  // find all contacts with the filter value in any name field
  var options = new ContactFindOptions();
  options.filter = document.getElementById("filter").value;
  options.multiple = true;
  //options.desiredFields = [navigator.contacts.fieldType.id];
  options.hasPhoneNumber = true;
  var fields = [
    navigator.contacts.fieldType.name
    , navigator.contacts.fieldType.displayName
    , navigator.contacts.fieldType.phoneNumbers
    , navigator.contacts.fieldType.photos
  ];

  contacts.find(fields, options);
}

/**
 * Select a contact from the devices native contacts screen
 */
function pickContact() {
  var contacts = new Appworks.AWContacts(
    function (contact) {
      var output = "";
      if(contact == null) {
        output += "No contact found";
      } else {
        output += contactObjectToString(contact);
      }
      out(output);
    },
    function (contactError) {
      out(contactError);
    }
  );

  contacts.pickContact();
}

/*
 * Take a contact object and transform it into a string to suit out apps needs.
 * Here were are extracting a few specific properties and applying some formatting.
 */
function contactObjectToString(contact) {
  var output = "<div class='contact'>";

    // Use a photo in <img> tags if available
    if(contact.photos != null) {
      output += "<img class='contact-photo' src='" + contact.photos[0].value + "' />";
    }

    output += "<div class='contact-info'>";

      // Use name.formatted as the display name
      output += contact.name.formatted;

      // Show the first phone number if phone numbers are available
      if(contact.phoneNumbers != null) {
        output += "<br/>" + contact.phoneNumbers[0].value;
      } else {
        output += "<br/>No phone number";
      }

    output += "</div>";

  output += "</div>";

  return output;
}

/**
 * Create a contact in your device contacts database
 */
function createContact() {
  var contacts = new Appworks.AWContacts();

  // Gather properties from your form
  var name = document.getElementById("contact-name").value;
  var number = document.getElementById("contact-number").value;

  // Create a new contacts object
  var contact = new Contact();

  // Set properties of your new contact object
  // This is the same type of object you receive when using findContact or pickContact
  
  // displayName is the simple version of the name object.
  // You can also use "name" which is an array with "familyName" and "givenName" used to created "formatted"
  contact.displayName = name;

  // phoneNumbers is an array, so here we set the name against "mobile"
  contact.phoneNumbers = [{"value":number, "type":"mobile"}];

  // Save it to the device contacts database
  contact.save();

  out("Contact created");
}

/********************
** Utility methods **
********************/
function out(message) {
  var el = document.getElementById("result");
  el.innerHTML = message;
}

function toggleCreateElements() {
  var el = document.getElementById("contacts-create-elements-wrapper");
  el.style.display = (el.style.display != "block") ? "block" : "none";
}
