# Google Event Management

This project aims to create a simple event management solution with Google Apps. It uses Google Sites, Forms, Spreadsheets and Apps Script to implement basic event management features as:

- Creating a registration form
- Send registration confirmation e-mails
- Creating an unregister form
- Send unregister confirmation e-mails
- Automatic event waiting list/queue handling where first person in queue will get registered when someone unregisters.
- Showing event booking status on a Google Sites page.
- Retrieve your queue position.

## Examples

Read the getting started guide to read more detailed instructions on how to setup your own event system.

Example spreadsheets with forms can be found on the following URLs. In order to use them, Save a copy for each.

- [Registreation Example](https://docs.google.com/spreadsheet/ccc?key=0ArnGaROyFoZMdERYRWRKQTVpS1pndkJzc041NVhNVXc)
- [Unregistration Example](https://docs.google.com/spreadsheet/ccc?key=0ArnGaROyFoZMdHREcVFYN3BLREdzNVJHbmdUMTBZZ0E)
- [Check Queue Position Example](https://docs.google.com/spreadsheet/ccc?key=0ArnGaROyFoZMdHdVM21OUE9PdVVPRW55d0Z2b213S0E)

Example google site can be found [here](https://sites.google.com/site/eventreg2012/). It cannot be copied. You have to set up your own for now.

## Repo

This repository contain the Apps Scripts that is used to send the correct e-mails for different scenarios.

## Getting Started

Copy google site (includes Scripts) (OPTIONAL)

- Create 3 pages and put one of the three forms in each page
- Go More -> Manage Site -> Apps Scripts -> Choose "Event Management"
- Go Tools -> Script Editor (it opens) -> Triggers -> Current script's trigger -> Add a new trigger
- Change regSpreadsheet id to the id of the Event Registration you created (copied from the original one)
- Run: showRegistrationDataOnSite, Events: Time-driven, Minutes-timer, Every minute (smallest possible as of today)

Copy spreadsheets (includes Forms and Scripts)
- Event Registration
- Event Unregistration
- Check Queue Position

### Creating an event

- Open the Event Registration spreadsheet
- Go to Configuration sheet
- Set Max Attendees, cell B1, to the max number of attendees that you're event can hold
- Change templates under sheet Templates - at the minimum change them to point to your Google Site
or remove the links if you didn't set one up.e

- Open the Event Unregistration spreadsheet
- Go to Configuration sheet
- Set the Registration Spreadsheet Id, cell B1, to the id of your Event Registration spreadsheet.

- Open the Check Queue Position spreadsheet
- Set the Registration Spreadsheet Id in code.

### Common for all 3 spreadsheets
- In the spreadsheet menu: choose Form -> Edit Form (OPTIONAL)
- Change the title (OPTIONAL)
- Under More Actions -> Edit Confirmation you can change what the user will see after the form is submitted (OPTIONAL)
- Go Tools -> Script Editor (it opens) -> Triggers -> Current script's triggers -> Add a new trigger
- Run: onFormSubmit Events: From spreadsheet -> On form submit
- You can also set notifications on error, if developing it's recommended to set it to "immediately" (OPTIONAL)
