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

Example spreadsheets can be found here.
TODO Add links to examples

## Repo

This repository contain the Apps Scripts that is used to send the correct e-mails for different scenarios.

## Getting Started

Copy spreadsheets (includes Forms and Scripts)

### Creating an event

- Open the Event Registration spreadsheet
- Go to Configuration sheet
- Set Max Attendees, cell B1, to the max number of attendees that you're event can hold
- Change Unregistration Form URL to what yours is
- Change templates under sheet Templates (OPTIONAL)

- Open the Event Unregistration spreadsheet
- Go to Configuration sheet
- Set the Registration Spreadsheet Id, cell B1, to the id of your Event Registration spreadsheet. 

### Common for all 3 spreadsheets
- In the spreadsheet menu: choose Form -> Edit Form (OPTIONAL)
- Change the title (OPTIONAL)
- Under More Actions -> Edit Confirmation you can change what the user will see after the form is submitted (OPTIONAL)
- Go Tools -> Script Editor (it opens) -> Triggers -> Current script's triggers -> Add a new trigger
- Run: onFormSubmit Events: From spreadsheet -> On form submit
- You can also set notifications on error, if developing it's recommended to set it to "immediately"                