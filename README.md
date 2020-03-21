#### final-project-ryan-dalton // SWDV665 

# Personal cloud-based photo journal app
## My Photo Journal
Created with Ionic v3 Framework

## Summary:

The idea is to create a journaling app that is easy to use that I would want for personal use for quickly compiling memorable events to later look back at with family.  Photos should be the focus of the journal, with small descriptions of text similar to comments or captions on images, along with a place and date.  It should be simple and quick to use, requiring no more than 5 minutes maximum to create a journal entry.  The journal entries can also double as stylized images with text that can be saved on a device and then shared on social media sites.  Additionally, journals should be backed up in a secure cloud setting to prevent loss of content upon device loss or destruction.

## Design Traits:
* Utilizes OOP with JSON objects for the user to create "Card" objects. A Card object contains 1-4 photos, a date, place, and optional user-generated long-format string (1-2 paragraphs describing what happened in the photos). 
* Users create their own journal by creating card objects representing journals entries individually
* CSS for card generation may be altered through user selection of a template to create a "scrapbook style effect"
* Users may go to a specific date to view journal entries for that day or browse through a list of entries

## Specific features in Scope of project:
* Cordova native plugin to allow Android/iOS use with photo directory access and keyboard usage
* Upload photos from device to the app for journal use
* Utilize the device's camera to take a picture while creating an entry
* Local device storage and cloud storage of journal entry objects utilizing Heroku (an early version of this will be present to demonstrate that it can be saved to cloud storage, user accounts to come later for longer-term storage and retrieval (see below).
* User can select options from available templates to alter CSS presentations of "card" objects.
* User inputs date, place and description fields of each card object.
* User selects a template to change CSS layout of and style of card
* Screenshot button to save the entire completed entry as an image to the device

## Future features:
(Note: these are features outside the scope of the project in just 8 weeks but ideas to pursue in the future)

* Input validation and security features to prevent XSS or other types of injection
* Additional templates features (user-created / downloadable etc)
* User accounts to set up cloud storage and journal mapping to users
* Video support in place of images for devices
* Sharing option to send journal cards and app invite links to others via text invite
* 3rd party integration with apps like Facebook and Instagram to publish a card online as a post
* Paste function - pull from specified social media to import post and generate card quickly
* Publish on AppStore with Minimal Advertisement/Monetization(?) with option for 1$ permanent disable
* "Book generation feature" - exports range of dates as iBook/Kindle book or equivalent
* Printable format - for use with printing companies to create user-created physical books
* Add geolocation API to auto-populate place field when taking a picture
* Collapsable list of journal entries
