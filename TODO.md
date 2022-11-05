TODO:

- One time messages (send OneTimeMessageSendEvent with message id to EventBridge)
- Lambda for processing OneTimeMessageSendEvent events and deleting planned message
- Checking if message has been already sent by previous lambda call (minutes on the edge of the time interval)
- Http endpoint for authorization (get access token)
- Http endpoint for adding messages to db
- Http endpoint for fetching all the scheduled messages by email
- Support for other SMTP hosts (outlook, yahoo, proton)
