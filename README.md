# voluble-telegram-client
Telegram Client for [@calmcl1/voluble](https://github.com/calmcl1/voluble)

The logic being that this will run continuously, like a daemon and will accept message send requests on an interface like `https://(ip-address)/send` using the [voluble common](https://github.com/calmcl1/voluble-common) Message interface.

It will also run on a loop a message-receiving thread, which, on receipt of a Message, will parse the message and hand it over to the Voluble Telegram plugin for further processing.

```sequence
participant VolubleCore
participant TelegramPlugin
participant TelegramHost
Note over VolubleCore,TelegramHost: Voluble recieves incoming message on /endpoints/telegram

VolubleCore->TelegramPlugin: Calls TelegramPlugin.send_message(Message), hands off Message
TelegramPlugin->TelegramHost: Request to <IP of TelegramHost>/send
TelegramHost->TelegramPlugin: 200 OK
TelegramPlugin->VolubleCore: updateMessageState MSG_SENT

Note over VolubleCore,User: Message is sent by user via Telegram

participant User
TelegramHost->TelegramHost: Checks Telegram for new messages
User->TelegramHost: Sends message to Telegram
TelegramHost->TelegramPlugin: Calls <IP of Voluble>/endpoints/telegram, hands off Message
TelegramPlugin->TelegramPlugin: Determines Contact from Message details if possible
TelegramPlugin->VolubleCore: Hands off new Message to Voluble Core
```



