# AppWorks Example - AWContacts

## Contents
1. [About appworks.js](#about-appworksjs)
2. [About this example app](#about-this-example)
3. [Usage](#usage)
4. [Installation](#installation)

## About appworks.js

appworks.js is a javascript (TypeScript) library for building feature rich, hybrid enterprise apps. The OpenText AppWorks platform provides mobile and desktop clients that support apps that utilize appworks.js.

In a mobile environment the library provides access to on-device technology, and in the desktop environment some features of the underlying host OS (operating system) are exposed.

For more information, see the appworks.js repository: https://github.com/opentext/appworks-js

## About this example

The purpose of the AWContacts plugin is to access the contacts list stored on the current device and return a selected contact, you can also return multiple contacts and create contacts.

More information about this Cordova plugin can be found [here](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html)

## Usage

#### find

```javascript
find(fields: string[], options: any)
```

Retrieve multiple contacts based on filter

+ __fields__: An array of fields to be returned in the contact objects, a [List of which can be found here](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html#contact)
+ __options__: An object of options a [List of which can be found here](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-contacts/index.html#navigatorcontactsfind)

Examples
```javascript
// Create an instance of Appworks.AWContacts, supplying success and error functions
var contacts = new Appworks.AWContacts(
  // Success function - Will return an array of contact objects
  function (contacts) {
    var output = 'Found ' + contacts.length + ' contacts.';

    // Iterate over the contacts array
    for(var i=0; i<contacts.length; i++) {
      output += "Name: " + contacts[i].name.formatted;

      if(contact.phoneNumbers != null) {
        output += "\n Phone: " + contacts[i].phoneNumbers[0].value;
      }
    }

    alert(output);
  },
  // Error function
  function (contactError) {
    alert(contactError);
  }
);

// Find all contacts with the filter value in any name field
var options = new ContactFindOptions();
options.filter = document.getElementById("filter").value;

// Allow multiple results
options.multiple = true;

// Ensure user has phone number
options.hasPhoneNumber = true;

// Create an array of fields we want to be returned
var fields = [
  navigator.contacts.fieldType.name
  , navigator.contacts.fieldType.displayName
  , navigator.contacts.fieldType.phoneNumbers
  , navigator.contacts.fieldType.photos
  , navigator.contacts.fieldType.id
];

// Call the find() method with the fields and options variables.
contacts.find(fields, options);
```

#### pickContact

```javascript
pickContact()
```

Open the native contact picker. Select a contact to retrieve the contact object.

Examples
```javascript
// Create an instance of Appworks.AWContacts, supplying success and error functions
var contacts = new Appworks.AWContacts(
  // Success function - will return a contact object
  function (contact) {
    var output = "";
    if(contact == null) {
      output += "No contact found";
    } else {
      output += "Name: " + contact.name.formatted;

      if(contact.phoneNumbers != null) {
        output += "\n Phone: " + contact.phoneNumbers[0].value;
      }
    }
    alert(output);
  },
  // Error function
  function (contactError) {
    alert(contactError);
  }
);

// Call the pickContact function to open the native contact picker
contacts.pickContact();
```

#### create / save

```javascript
Contact()
save()
```

Create a new contact object, fill in a few properties such as name and number, then save it to the device contacts database.

Examples
```javascript
// Create an instance of Appworks.AWContacts
var contacts = new Appworks.AWContacts();

// Gather properties from your form
var name = "Bob";
var number = "Smith";

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

alert("Contact created");
```

## Installation

This example app contains 3 important objects:
1. app.properties
2. icon.png
3. mobile.zip

#### app.properties
This files defines the app, with the following properties:
+ __displayName__: The display name of the app
+ __description__: A description of the app
+ __version__: The version of the app, e.g. 0.0.1 or 3.4.5 etc
+ __type__: This can be either app or desktop, or both (app,desktop)
+ __awgPlatformVersion__: The target appworks platform, this should be 16
+ __isAvailableOffline__: Allow this app to be used offline, can be true or false

#### icon.png
An icon that represents the app. This will appear in the gateway and on the device. 48x48px is ideal.

#### mobile.zip

This is your web content, such as html, js, css, images and any other assets.
The only essential file in your mobile.zip is index.html, which will be loaded by the appworks webview. Any other files or structure is up to the developer.

##### index.html

When your app is downloaded and installed in an appworks client, the client will place appworks.js, cordova.js and the cordova plugins in the root of your app.

In your html file, please include the following tags before any other javascript tags:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="appworks.js"></script>
```

#### Zipping and Deploying
1. Zip up the web content into a file named mobile.zip
2. Zip up the following files:
  + app.properties
  + icon.png
  + mobile.zip
3. Name this file in the format:
  + AppName_Version.zip
  + e.g. MyGreatApp_0.0.1.zip
  + __The version number in the filename must match the version number in app.properties__
4. Install the app on the gateway
  + Go to your gateway in a browser
  + sign in
  + go to app installation tab
  + drag and drop MyGreatApp_0.0.1.zip into the box.
  + Once fully deployed, enable the app.
