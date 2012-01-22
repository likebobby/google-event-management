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

- Open the spreadsheet Event Registration
- Go to sheet Configuration
- Set Max Attendees, cell B1, to the max number of attendees that you're event can hold
- Change Unregistration Form URL to what yours is
- Change templates under sheet Templates (OPTIONAL)
- In the spreadsheet menu: choose Form - Edit Form (OPTIONAL)
-- Change the title (OPTIONAL)
-- Under More Actions - Edit Confirmation you can change what the user will see after the form is submitted (OPTIONAL)
