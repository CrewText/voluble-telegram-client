

// export interface TdUpdate {
//     '@type': updates
//     [key: string]: any
// }

export interface ITdObject {
    '@type': string,
    '@extra'?: number,
    [key: string]: any
}

export interface TdError extends ITdObject {
    '@type': 'error'
    code: number,
    message: string
}

export interface TdOk extends ITdObject {
    '@type': "ok"
}

export interface TdUpdate extends ITdObject {
    '@type': "updateAuthorizationState" | "updateBasicGroup" | "updateBasicGroupFullInfo" | "updateCall" | "updateChatDefaultDisableNotification" | "updateChatDraftMessage" | "updateChatIsMarkedAsUnread" | "updateChatIsPinned" | "updateChatIsSponsored" | "updateChatLastMessage" | "updateChatNotificationSettings" | "updateChatOrder" | "updateChatPhoto" | "updateChatReadInbox" | "updateChatReadOutbox" | "updateChatReplyMarkup" | "updateChatTitle" | "updateChatUnreadMentionCount" | "updateConnectionState" | "updateDeleteMessages" | "updateFavoriteStickers" | "updateFile" | "updateFileGenerationStart" | "updateFileGenerationStop" | "updateInstalledStickerSets" | "updateLanguagePackStrings" | "updateMessageContent" | "updateMessageContentOpened" | "updateMessageEdited" | "updateMessageMentionRead" | "updateMessageSendAcknowledged" | "updateMessageSendFailed" | "updateMessageSendSucceeded" | "updateMessageViews" | "updateNewCallbackQuery" | "updateNewChat" | "updateNewChosenInlineResult" | "updateNewCustomEvent" | "updateNewCustomQuery" | "updateNewInlineCallbackQuery" | "updateNewInlineQuery" | "updateNewMessage" | "updateNewPreCheckoutQuery" | "updateNewShippingQuery" | "updateOption" | "updateRecentStickers" | "updateSavedAnimations" | "updateScopeNotificationSettings" | "updateSecretChat" | "updateServiceNotification" | "updateSupergroup" | "updateSupergroupFullInfo" | "updateTermsOfService" | "updateTrendingStickerSets" | "updateUnreadChatCount" | "updateUnreadMessageCount" | "updateUser" | "updateUserChatAction" | "updateUserFullInfo" | "updateUserPrivacySettingRules" | "updateUserStatus"
}

export interface TdUpdateAuthorizationState extends TdUpdate {
    authorization_state: TdAuthorizationState
}

export interface TdAuthorizationState extends ITdObject {
    '@type': "authorizationStateWaitTdlibParameters" | "authorizationStateWaitEncryptionKey" | "authorizationStateWaitPhoneNumber" | "authorizationStateWaitCode" | "authorizationStateWaitPassword" | "authorizationStateReady"
}

export interface TdUpdateBasicGroup extends TdUpdate { }
export interface TdUpdateBasicGroupFullInfo extends TdUpdate { }
export interface TdUpdateCall extends TdUpdate { }
export interface TdUpdateChatDefaultDisableNotification extends TdUpdate { }
export interface TdUpdateChatDraftMessage extends TdUpdate { }
export interface TdUpdateChatIsMarkedAsUnread extends TdUpdate { }
export interface TdUpdateChatIsPinned extends TdUpdate { }
export interface TdUpdateChatIsSponsored extends TdUpdate { }
export interface TdUpdateChatLastMessage extends TdUpdate { }
export interface TdUpdateChatNotificationSettings extends TdUpdate { }
export interface TdUpdateChatOrder extends TdUpdate { }
export interface TdUpdateChatPhoto extends TdUpdate { }
export interface TdUpdateChatReadInbox extends TdUpdate { }
export interface TdUpdateChatReadOutbox extends TdUpdate { }
export interface TdUpdateChatReplyMarkup extends TdUpdate { }
export interface TdUpdateChatTitle extends TdUpdate { }
export interface TdUpdateChatUnreadMentionCount extends TdUpdate { }
export interface TdUpdateConnectionState extends TdUpdate { }
export interface TdUpdateDeleteMessages extends TdUpdate { }
export interface TdUpdateFavoriteStickers extends TdUpdate { }
export interface TdUpdateFile extends TdUpdate { }
export interface TdUpdateFileGenerationStart extends TdUpdate { }
export interface TdUpdateFileGenerationStop extends TdUpdate { }
export interface TdUpdateInstalledStickerSets extends TdUpdate { }
export interface TdUpdateLanguagePackStrings extends TdUpdate { }
export interface TdUpdateMessageContent extends TdUpdate { }
export interface TdUpdateMessageContentOpened extends TdUpdate { }
export interface TdUpdateMessageEdited extends TdUpdate { }
export interface TdUpdateMessageMentionRead extends TdUpdate { }
export interface TdUpdateMessageSendAcknowledged extends TdUpdate { }
export interface TdUpdateMessageSendFailed extends TdUpdate { }
export interface TdUpdateMessageSendSucceeded extends TdUpdate { }
export interface TdUpdateMessageViews extends TdUpdate { }
export interface TdUpdateNewCallbackQuery extends TdUpdate { }
export interface TdUpdateNewChat extends TdUpdate { }
export interface TdUpdateNewChosenInlineResult extends TdUpdate { }
export interface TdUpdateNewCustomEvent extends TdUpdate { }
export interface TdUpdateNewCustomQuery extends TdUpdate { }
export interface TdUpdateNewInlineCallbackQuery extends TdUpdate { }
export interface TdUpdateNewInlineQuery extends TdUpdate { }
export interface TdUpdateNewMessage extends TdUpdate { }
export interface TdUpdateNewPreCheckoutQuery extends TdUpdate { }
export interface TdUpdateNewShippingQuery extends TdUpdate { }
export interface TdUpdateOption extends TdUpdate {
    "@type": "updateOption"
    name: string,
    value: TdOptionValue
}

export interface TdOptionValue extends ITdObject {
    "@type": "optionValueInteger" | "optionValueString" | "optionValueBoolean" | "optionValueEmpty"
    value: number | string | boolean | null
}
export interface TdUpdateRecentStickers extends TdUpdate { }
export interface TdUpdateSavedAnimations extends TdUpdate { }
export interface TdUpdateScopeNotificationSettings extends TdUpdate { }
export interface TdUpdateSecretChat extends TdUpdate { }
export interface TdUpdateServiceNotification extends TdUpdate { }
export interface TdUpdateSupergroup extends TdUpdate { }
export interface TdUpdateSupergroupFullInfo extends TdUpdate { }
export interface TdUpdateTermsOfService extends TdUpdate { }
export interface TdUpdateTrendingStickerSets extends TdUpdate { }
export interface TdUpdateUnreadChatCount extends TdUpdate { }
export interface TdUpdateUnreadMessageCount extends TdUpdate { }
export interface TdUpdateUser extends TdUpdate { }
export interface TdUpdateUserChatAction extends TdUpdate { }
export interface TdUpdateUserFullInfo extends TdUpdate { }
export interface TdUpdateUserPrivacySettingRules extends TdUpdate { }
export interface TdUpdateUserStatus extends TdUpdate { }

export interface TdQuery extends ITdObject {
    '@type': "acceptCall" | "acceptTermsOfService" | "addChatMember" | "addChatMembers" | "addFavoriteSticker" | "addLocalMessage" | "addNetworkStatistics" | "addProxy" | "addRecentlyFoundChat" | "addRecentSticker" | "addSavedAnimation" | "addStickerToSet" | "answerCallbackQuery" | "answerCustomQuery" | "answerInlineQuery" | "answerPreCheckoutQuery" | "answerShippingQuery" | "blockUser" | "cancelDownloadFile" | "cancelUploadFile" | "changeChatReportSpamState" | "changeImportedContacts" | "changePhoneNumber" | "changeStickerSet" | "checkAuthenticationBotToken" | "checkAuthenticationCode" | "checkAuthenticationPassword" | "checkChangePhoneNumberCode" | "checkChatInviteLink" | "checkChatUsername" | "checkDatabaseEncryptionKey" | "checkEmailAddressVerificationCode" | "checkPhoneNumberConfirmationCode" | "checkPhoneNumberVerificationCode" | "cleanFileName" | "clearAllDraftMessages" | "clearImportedContacts" | "clearRecentlyFoundChats" | "clearRecentStickers" | "close" | "closeChat" | "closeSecretChat" | "createBasicGroupChat" | "createCall" | "createNewBasicGroupChat" | "createNewSecretChat" | "createNewStickerSet" | "createNewSupergroupChat" | "createPrivateChat" | "createSecretChat" | "createSupergroupChat" | "createTemporaryPassword" | "deleteAccount" | "deleteChatHistory" | "deleteChatMessagesFromUser" | "deleteChatReplyMarkup" | "deleteFile" | "deleteLanguagePack" | "deleteMessages" | "deletePassportElement" | "deleteProfilePhoto" | "deleteSavedCredentials" | "deleteSavedOrderInfo" | "deleteSupergroup" | "destroy" | "disableProxy" | "discardCall" | "disconnectAllWebsites" | "disconnectWebsite" | "downloadFile" | "editCustomLanguagePackInfo" | "editInlineMessageCaption" | "editInlineMessageLiveLocation" | "editInlineMessageMedia" | "editInlineMessageReplyMarkup" | "editInlineMessageText" | "editMessageCaption" | "editMessageLiveLocation" | "editMessageMedia" | "editMessageReplyMarkup" | "editMessageText" | "editProxy" | "enableProxy" | "finishFileGeneration" | "forwardMessages" | "generateChatInviteLink" | "getAccountTtl" | "getActiveLiveLocationMessages" | "getActiveSessions" | "getAllPassportElements" | "getArchivedStickerSets" | "getAttachedStickerSets" | "getAuthorizationState" | "getBasicGroup" | "getBasicGroupFullInfo" | "getBlockedUsers" | "getCallbackQueryAnswer" | "getChat" | "getChatAdministrators" | "getChatEventLog" | "getChatHistory" | "getChatMember" | "getChatMessageByDate" | "getChatMessageCount" | "getChatPinnedMessage" | "getChatReportSpamState" | "getChats" | "getConnectedWebsites" | "getContacts" | "getCountryCode" | "getCreatedPublicChats" | "getDeepLinkInfo" | "getFavoriteStickers" | "getFile" | "getFileExtension" | "getFileMimeType" | "getGameHighScores" | "getGroupsInCommon" | "getImportedContactCount" | "getInlineGameHighScores" | "getInlineQueryResults" | "getInstalledStickerSets" | "getInviteText" | "getLanguagePackString" | "getLanguagePackStrings" | "getLocalizationTargetInfo" | "getMapThumbnailFile" | "getMe" | "getMessage" | "getMessages" | "getNetworkStatistics" | "getOption" | "getPassportAuthorizationForm" | "getPassportElement" | "getPasswordState" | "getPaymentForm" | "getPaymentReceipt" | "getPreferredCountryLanguage" | "getProxies" | "getProxyLink" | "getPublicMessageLink" | "getRecentInlineBots" | "getRecentlyVisitedTMeUrls" | "getRecentStickers" | "getRecoveryEmailAddress" | "getRemoteFile" | "getRepliedMessage" | "getSavedAnimations" | "getSavedOrderInfo" | "getScopeNotificationSettings" | "getSecretChat" | "getStickerEmojis" | "getStickers" | "getStickerSet" | "getStorageStatistics" | "getStorageStatisticsFast" | "getSupergroup" | "getSupergroupFullInfo" | "getSupergroupMembers" | "getSupportUser" | "getTemporaryPasswordState" | "getTextEntities" | "getTopChats" | "getTrendingStickerSets" | "getUser" | "getUserFullInfo" | "getUserPrivacySettingRules" | "getUserProfilePhotos" | "getWallpapers" | "getWebPageInstantView" | "getWebPagePreview" | "importContacts" | "joinChat" | "joinChatByInviteLink" | "leaveChat" | "logOut" | "openChat" | "openMessageContent" | "optimizeStorage" | "parseTextEntities" | "pingProxy" | "pinSupergroupMessage" | "processDcUpdate" | "readAllChatMentions" | "recoverAuthenticationPassword" | "recoverPassword" | "registerDevice" | "removeContacts" | "removeFavoriteSticker" | "removeProxy" | "removeRecentHashtag" | "removeRecentlyFoundChat" | "removeRecentSticker" | "removeSavedAnimation" | "removeStickerFromSet" | "removeTopChat" | "reorderInstalledStickerSets" | "reportChat" | "reportSupergroupSpam" | "requestAuthenticationPasswordRecovery" | "requestPasswordRecovery" | "resendAuthenticationCode" | "resendChangePhoneNumberCode" | "resendEmailAddressVerificationCode" | "resendPhoneNumberConfirmationCode" | "resendPhoneNumberVerificationCode" | "resetAllNotificationSettings" | "resetNetworkStatistics" | "searchCallMessages" | "searchChatMembers" | "searchChatMessages" | "searchChatRecentLocationMessages" | "searchChats" | "searchChatsOnServer" | "searchContacts" | "searchHashtags" | "searchInstalledStickerSets" | "searchMessages" | "searchPublicChat" | "searchPublicChats" | "searchSecretMessages" | "searchStickers" | "searchStickerSet" | "searchStickerSets" | "sendBotStartMessage" | "sendCallDebugInformation" | "sendCallRating" | "sendChatAction" | "sendChatScreenshotTakenNotification" | "sendChatSetTtlMessage" | "sendCustomRequest" | "sendEmailAddressVerificationCode" | "sendInlineQueryResultMessage" | "sendMessage" | "sendMessageAlbum" | "sendPassportAuthorizationForm" | "sendPaymentForm" | "sendPhoneNumberConfirmationCode" | "sendPhoneNumberVerificationCode" | "setAccountTtl" | "setAlarm" | "setAuthenticationPhoneNumber" | "setBio" | "setBotUpdatesStatus" | "setChatClientData" | "setChatDraftMessage" | "setChatMemberStatus" | "setChatNotificationSettings" | "setChatPhoto" | "setChatTitle" | "setCustomLanguagePack" | "setCustomLanguagePackString" | "setDatabaseEncryptionKey" | "setFileGenerationProgress" | "setGameScore" | "setInlineGameScore" | "setName" | "setNetworkType" | "setOption" | "setPassportElement" | "setPassportElementErrors" | "setPassword" | "setPinnedChats" | "setProfilePhoto" | "setRecoveryEmailAddress" | "setScopeNotificationSettings" | "setStickerPositionInSet" | "setSupergroupDescription" | "setSupergroupStickerSet" | "setSupergroupUsername" | "setTdlibParameters" | "setUsername" | "setUserPrivacySettingRules" | "terminateAllOtherSessions" | "terminateSession" | "testCallBytes" | "testCallEmpty" | "testCallString" | "testCallVectorInt" | "testCallVectorIntObject" | "testCallVectorString" | "testCallVectorStringObject" | "testGetDifference" | "testNetwork" | "testSquareInt" | "testUseError" | "testUseUpdate" | "toggleBasicGroupAdministrators" | "toggleChatDefaultDisableNotification" | "toggleChatIsMarkedAsUnread" | "toggleChatIsPinned" | "toggleSupergroupInvites" | "toggleSupergroupIsAllHistoryAvailable" | "toggleSupergroupSignMessages" | "unblockUser" | "unpinSupergroupMessage" | "upgradeBasicGroupChatToSupergroupChat" | "uploadFile" | "uploadStickerFile" | "validateOrderInfo" | "viewMessages" | "viewTrendingStickerSets"
}

export interface TdQueryAcceptCall extends TdQuery { }