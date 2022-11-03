TODO:

- Repeated messages (repeated by day, week, month, year)
- One time messages (send OneTimeMessageSendEvent with message id to EventBridge)
- Lambda for processing OneTimeMessageSendEvent events and deleting planned message
- Http endpoint for authorization (get access token)
- Http endpoint for adding messages to db
- Http endpoint for fetching all the scheduled messages by email
- Support for other SMTP hosts (outlook, yahoo, proton)
