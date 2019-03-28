// export import { ITdObject } from './tsApiObject';

// export class ITdError extends ITdObject {
//     code: number
//     message: string

//     constructor(code: number, message: string) {
//         super('error')
//         this.code = code
//         this.message = message
//     }
// }

// export class TdOk extends ITdObject {
//     constructor() {
//         super('ok')
//     }
// }


// /* QUERIES */
// export class TdQuery extends ITdObject {
//     '@type': "acceptCall" | "acceptTermsOfService" | "addChatMember" | "addChatMembers" | "addFavoriteSticker" | "addLocalMessage" | "addNetworkStatistics" | "addProxy" | "addRecentlyFoundChat" | "addRecentSticker" | "addSavedAnimation" | "addStickerToSet" | "answerCallbackQuery" | "answerCustomQuery" | "answerInlineQuery" | "answerPreCheckoutQuery" | "answerShippingQuery" | "blockUser" | "cancelDownloadFile" | "cancelUploadFile" | "changeChatReportSpamState" | "changeImportedContacts" | "changePhoneNumber" | "changeStickerSet" | "checkAuthenticationBotToken" | "checkAuthenticationCode" | "checkAuthenticationPassword" | "checkChangePhoneNumberCode" | "checkChatInviteLink" | "checkChatUsername" | "checkDatabaseEncryptionKey" | "checkEmailAddressVerificationCode" | "checkPhoneNumberConfirmationCode" | "checkPhoneNumberVerificationCode" | "cleanFileName" | "clearAllDraftMessages" | "clearImportedContacts" | "clearRecentlyFoundChats" | "clearRecentStickers" | "close" | "closeChat" | "closeSecretChat" | "createBasicGroupChat" | "createCall" | "createNewBasicGroupChat" | "createNewSecretChat" | "createNewStickerSet" | "createNewSupergroupChat" | "createPrivateChat" | "createSecretChat" | "createSupergroupChat" | "createTemporaryPassword" | "deleteAccount" | "deleteChatHistory" | "deleteChatMessagesFromUser" | "deleteChatReplyMarkup" | "deleteFile" | "deleteLanguagePack" | "deleteMessages" | "deletePassportElement" | "deleteProfilePhoto" | "deleteSavedCredentials" | "deleteSavedOrderInfo" | "deleteSupergroup" | "destroy" | "disableProxy" | "discardCall" | "disconnectAllWebsites" | "disconnectWebsite" | "downloadFile" | "editCustomLanguagePackInfo" | "editInlineMessageCaption" | "editInlineMessageLiveLocation" | "editInlineMessageMedia" | "editInlineMessageReplyMarkup" | "editInlineMessageText" | "editMessageCaption" | "editMessageLiveLocation" | "editMessageMedia" | "editMessageReplyMarkup" | "editMessageText" | "editProxy" | "enableProxy" | "finishFileGeneration" | "forwardMessages" | "generateChatInviteLink" | "getAccountTtl" | "getActiveLiveLocationMessages" | "getActiveSessions" | "getAllPassportElements" | "getArchivedStickerSets" | "getAttachedStickerSets" | "getAuthorizationState" | "getBasicGroup" | "getBasicGroupFullInfo" | "getBlockedUsers" | "getCallbackQueryAnswer" | "getChat" | "getChatAdministrators" | "getChatEventLog" | "getChatHistory" | "getChatMember" | "getChatMessageByDate" | "getChatMessageCount" | "getChatPinnedMessage" | "getChatReportSpamState" | "getChats" | "getConnectedWebsites" | "getContacts" | "getCountryCode" | "getCreatedPublicChats" | "getDeepLinkInfo" | "getFavoriteStickers" | "getFile" | "getFileExtension" | "getFileMimeType" | "getGameHighScores" | "getGroupsInCommon" | "getImportedContactCount" | "getInlineGameHighScores" | "getInlineQueryResults" | "getInstalledStickerSets" | "getInviteText" | "getLanguagePackString" | "getLanguagePackStrings" | "getLocalizationTargetInfo" | "getMapThumbnailFile" | "getMe" | "getMessage" | "getMessages" | "getNetworkStatistics" | "getOption" | "getPassportAuthorizationForm" | "getPassportElement" | "getPasswordState" | "getPaymentForm" | "getPaymentReceipt" | "getPreferredCountryLanguage" | "getProxies" | "getProxyLink" | "getPublicMessageLink" | "getRecentInlineBots" | "getRecentlyVisitedTMeUrls" | "getRecentStickers" | "getRecoveryEmailAddress" | "getRemoteFile" | "getRepliedMessage" | "getSavedAnimations" | "getSavedOrderInfo" | "getScopeNotificationSettings" | "getSecretChat" | "getStickerEmojis" | "getStickers" | "getStickerSet" | "getStorageStatistics" | "getStorageStatisticsFast" | "getSupergroup" | "getSupergroupFullInfo" | "getSupergroupMembers" | "getSupportUser" | "getTemporaryPasswordState" | "getTextEntities" | "getTopChats" | "getTrendingStickerSets" | "getUser" | "getUserFullInfo" | "getUserPrivacySettingRules" | "getUserProfilePhotos" | "getWallpapers" | "getWebPageInstantView" | "getWebPagePreview" | "importContacts" | "joinChat" | "joinChatByInviteLink" | "leaveChat" | "logOut" | "openChat" | "openMessageContent" | "optimizeStorage" | "parseTextEntities" | "pingProxy" | "pinSupergroupMessage" | "processDcUpdate" | "readAllChatMentions" | "recoverAuthenticationPassword" | "recoverPassword" | "registerDevice" | "removeContacts" | "removeFavoriteSticker" | "removeProxy" | "removeRecentHashtag" | "removeRecentlyFoundChat" | "removeRecentSticker" | "removeSavedAnimation" | "removeStickerFromSet" | "removeTopChat" | "reorderInstalledStickerSets" | "reportChat" | "reportSupergroupSpam" | "requestAuthenticationPasswordRecovery" | "requestPasswordRecovery" | "resendAuthenticationCode" | "resendChangePhoneNumberCode" | "resendEmailAddressVerificationCode" | "resendPhoneNumberConfirmationCode" | "resendPhoneNumberVerificationCode" | "resetAllNotificationSettings" | "resetNetworkStatistics" | "searchCallMessages" | "searchChatMembers" | "searchChatMessages" | "searchChatRecentLocationMessages" | "searchChats" | "searchChatsOnServer" | "searchContacts" | "searchHashtags" | "searchInstalledStickerSets" | "searchMessages" | "searchPublicChat" | "searchPublicChats" | "searchSecretMessages" | "searchStickers" | "searchStickerSet" | "searchStickerSets" | "sendBotStartMessage" | "sendCallDebugInformation" | "sendCallRating" | "sendChatAction" | "sendChatScreenshotTakenNotification" | "sendChatSetTtlMessage" | "sendCustomRequest" | "sendEmailAddressVerificationCode" | "sendInlineQueryResultMessage" | "sendMessage" | "sendMessageAlbum" | "sendPassportAuthorizationForm" | "sendPaymentForm" | "sendPhoneNumberConfirmationCode" | "sendPhoneNumberVerificationCode" | "setAccountTtl" | "setAlarm" | "setAuthenticationPhoneNumber" | "setBio" | "setBotUpdatesStatus" | "setChatClientData" | "setChatDraftMessage" | "setChatMemberStatus" | "setChatNotificationSettings" | "setChatPhoto" | "setChatTitle" | "setCustomLanguagePack" | "setCustomLanguagePackString" | "setDatabaseEncryptionKey" | "setFileGenerationProgress" | "setGameScore" | "setInlineGameScore" | "setName" | "setNetworkType" | "setOption" | "setPassportElement" | "setPassportElementErrors" | "setPassword" | "setPinnedChats" | "setProfilePhoto" | "setRecoveryEmailAddress" | "setScopeNotificationSettings" | "setStickerPositionInSet" | "setSupergroupDescription" | "setSupergroupStickerSet" | "setSupergroupUsername" | "setTdlibParameters" | "setUsername" | "setUserPrivacySettingRules" | "terminateAllOtherSessions" | "terminateSession" | "testCallBytes" | "testCallEmpty" | "testCallString" | "testCallVectorInt" | "testCallVectorIntObject" | "testCallVectorString" | "testCallVectorStringObject" | "testGetDifference" | "testNetwork" | "testSquareInt" | "testUseError" | "testUseUpdate" | "toggleBasicGroupAdministrators" | "toggleChatDefaultDisableNotification" | "toggleChatIsMarkedAsUnread" | "toggleChatIsPinned" | "toggleSupergroupInvites" | "toggleSupergroupIsAllHistoryAvailable" | "toggleSupergroupSignMessages" | "unblockUser" | "unpinSupergroupMessage" | "upgradeBasicGroupChatToSupergroupChat" | "uploadFile" | "uploadStickerFile" | "validateOrderInfo" | "viewMessages" | "viewTrendingStickerSets"
// }
// export class TdQueryAcceptCall extends TdQuery { }
// export class TdQueryAcceptTermsOfService extends TdQuery { }
// export class TdQueryAddChatMember extends TdQuery { }
// export class TdQueryAddChatMembers extends TdQuery { }
// export class TdQueryAddFavoriteSticker extends TdQuery { }
// export class TdQueryAddLocalMessage extends TdQuery { }
// export class TdQueryAddNetworkStatistics extends TdQuery { }
// export class TdQueryAddProxy extends TdQuery { }
// export class TdQueryAddRecentlyFoundChat extends TdQuery { }
// export class TdQueryAddRecentSticker extends TdQuery { }
// export class TdQueryAddSavedAnimation extends TdQuery { }
// export class TdQueryAddStickerToSet extends TdQuery { }
// export class TdQueryAnswerCallbackQuery extends TdQuery { }
// export class TdQueryAnswerCustomQuery extends TdQuery { }
// export class TdQueryAnswerInlineQuery extends TdQuery { }
// export class TdQueryAnswerPreCheckoutQuery extends TdQuery { }
// export class TdQueryAnswerShippingQuery extends TdQuery { }
// export class TdQueryBlockUser extends TdQuery { }
// export class TdQueryCancelDownloadFile extends TdQuery { }
// export class TdQueryCancelUploadFile extends TdQuery { }
// export class TdQueryChangeChatReportSpamState extends TdQuery { }
// export class TdQueryChangeImportedContacts extends TdQuery { }
// export class TdQueryChangePhoneNumber extends TdQuery { }
// export class TdQueryChangeStickerSet extends TdQuery { }
// export class TdQueryCheckAuthenticationBotToken extends TdQuery { }
// export class TdQueryCheckAuthenticationCode extends TdQuery {
//     '@type': 'checkAuthenticationCode',
//     first_name: string,
//     last_name: string
// }
// export class TdQueryCheckAuthenticationPassword extends TdQuery { }
// export class TdQueryCheckChangePhoneNumberCode extends TdQuery { }
// export class TdQueryCheckChatInviteLink extends TdQuery { }
// export class TdQueryCheckChatUsername extends TdQuery { }
// export class TdQueryCheckDatabaseEncryptionKey extends TdQuery {
//     '@type': "checkDatabaseEncryptionKey",
//     encryption_key: string
// }
// export class TdQueryCheckEmailAddressVerificationCode extends TdQuery { }
// export class TdQueryCheckPhoneNumberConfirmationCode extends TdQuery { }
// export class TdQueryCheckPhoneNumberVerificationCode extends TdQuery { }
// export class TdQueryCleanFileName extends TdQuery { }
// export class TdQueryClearAllDraftMessages extends TdQuery { }
// export class TdQueryClearImportedContacts extends TdQuery { }
// export class TdQueryClearRecentlyFoundChats extends TdQuery { }
// export class TdQueryClearRecentStickers extends TdQuery { }
// export class TdQueryClose extends TdQuery { }
// export class TdQueryCloseChat extends TdQuery { }
// export class TdQueryCloseSecretChat extends TdQuery { }
// export class TdQueryCreateBasicGroupChat extends TdQuery { }
// export class TdQueryCreateCall extends TdQuery { }
// export class TdQueryCreateNewBasicGroupChat extends TdQuery { }
// export class TdQueryCreateNewSecretChat extends TdQuery { }
// export class TdQueryCreateNewStickerSet extends TdQuery { }
// export class TdQueryCreateNewSupergroupChat extends TdQuery { }
// export class TdQueryCreatePrivateChat extends TdQuery { }
// export class TdQueryCreateSecretChat extends TdQuery { }
// export class TdQueryCreateSupergroupChat extends TdQuery { }
// export class TdQueryCreateTemporaryPassword extends TdQuery { }
// export class TdQueryDeleteAccount extends TdQuery { }
// export class TdQueryDeleteChatHistory extends TdQuery { }
// export class TdQueryDeleteChatMessagesFromUser extends TdQuery { }
// export class TdQueryDeleteChatReplyMarkup extends TdQuery { }
// export class TdQueryDeleteFile extends TdQuery { }
// export class TdQueryDeleteLanguagePack extends TdQuery { }
// export class TdQueryDeleteMessages extends TdQuery { }
// export class TdQueryDeletePassportElement extends TdQuery { }
// export class TdQueryDeleteProfilePhoto extends TdQuery { }
// export class TdQueryDeleteSavedCredentials extends TdQuery { }
// export class TdQueryDeleteSavedOrderInfo extends TdQuery { }
// export class TdQueryDeleteSupergroup extends TdQuery { }
// export class TdQueryDestroy extends TdQuery { }
// export class TdQueryDisableProxy extends TdQuery { }
// export class TdQueryDiscardCall extends TdQuery { }
// export class TdQueryDisconnectAllWebsites extends TdQuery { }
// export class TdQueryDisconnectWebsite extends TdQuery { }
// export class TdQueryDownloadFile extends TdQuery { }
// export class TdQueryEditCustomLanguagePackInfo extends TdQuery { }
// export class TdQueryEditInlineMessageCaption extends TdQuery { }
// export class TdQueryEditInlineMessageLiveLocation extends TdQuery { }
// export class TdQueryEditInlineMessageMedia extends TdQuery { }
// export class TdQueryEditInlineMessageReplyMarkup extends TdQuery { }
// export class TdQueryEditInlineMessageText extends TdQuery { }
// export class TdQueryEditMessageCaption extends TdQuery { }
// export class TdQueryEditMessageLiveLocation extends TdQuery { }
// export class TdQueryEditMessageMedia extends TdQuery { }
// export class TdQueryEditMessageReplyMarkup extends TdQuery { }
// export class TdQueryEditMessageText extends TdQuery { }
// export class TdQueryEditProxy extends TdQuery { }
// export class TdQueryEnableProxy extends TdQuery { }
// export class TdQueryFinishFileGeneration extends TdQuery { }
// export class TdQueryForwardMessages extends TdQuery { }
// export class TdQueryGenerateChatInviteLink extends TdQuery { }
// export class TdQueryGetAccountTtl extends TdQuery { }
// export class TdQueryGetActiveLiveLocationMessages extends TdQuery { }
// export class TdQueryGetActiveSessions extends TdQuery { }
// export class TdQueryGetAllPassportElements extends TdQuery { }
// export class TdQueryGetArchivedStickerSets extends TdQuery { }
// export class TdQueryGetAttachedStickerSets extends TdQuery { }
// export class TdQueryGetAuthorizationState extends TdQuery { }
// export class TdQueryGetBasicGroup extends TdQuery { }
// export class TdQueryGetBasicGroupFullInfo extends TdQuery { }
// export class TdQueryGetBlockedUsers extends TdQuery { }
// export class TdQueryGetCallbackQueryAnswer extends TdQuery { }
// export class TdQueryGetChat extends TdQuery { }
// export class TdQueryGetChatAdministrators extends TdQuery { }
// export class TdQueryGetChatEventLog extends TdQuery { }
// export class TdQueryGetChatHistory extends TdQuery { }
// export class TdQueryGetChatMember extends TdQuery { }
// export class TdQueryGetChatMessageByDate extends TdQuery { }
// export class TdQueryGetChatMessageCount extends TdQuery { }
// export class TdQueryGetChatPinnedMessage extends TdQuery { }
// export class TdQueryGetChatReportSpamState extends TdQuery { }
// export class TdQueryGetChats extends TdQuery {
//     '@type': "getChats"
//     offset_order: number
//     offset_chat_id: number
// }
// export class TdQueryGetConnectedWebsites extends TdQuery { }
// export class TdQueryGetContacts extends TdQuery { }
// export class TdQueryGetCountryCode extends TdQuery { }
// export class TdQueryGetCreatedPublicChats extends TdQuery { }
// export class TdQueryGetDeepLinkInfo extends TdQuery { }
// export class TdQueryGetFavoriteStickers extends TdQuery { }
// export class TdQueryGetFile extends TdQuery { }
// export class TdQueryGetFileExtension extends TdQuery { }
// export class TdQueryGetFileMimeType extends TdQuery { }
// export class TdQueryGetGameHighScores extends TdQuery { }
// export class TdQueryGetGroupsInCommon extends TdQuery { }
// export class TdQueryGetImportedContactCount extends TdQuery { }
// export class TdQueryGetInlineGameHighScores extends TdQuery { }
// export class TdQueryGetInlineQueryResults extends TdQuery { }
// export class TdQueryGetInstalledStickerSets extends TdQuery { }
// export class TdQueryGetInviteText extends TdQuery { }
// export class TdQueryGetLanguagePackString extends TdQuery { }
// export class TdQueryGetLanguagePackStrings extends TdQuery { }
// export class TdQueryGetLocalizationTargetInfo extends TdQuery { }
// export class TdQueryGetMapThumbnailFile extends TdQuery { }
// export class TdQueryGetMe extends TdQuery { }
// export class TdQueryGetMessage extends TdQuery { }
// export class TdQueryGetMessages extends TdQuery { }
// export class TdQueryGetNetworkStatistics extends TdQuery { }
// export class TdQueryGetOption extends TdQuery { }
// export class TdQueryGetPassportAuthorizationForm extends TdQuery { }
// export class TdQueryGetPassportElement extends TdQuery { }
// export class TdQueryGetPasswordState extends TdQuery { }
// export class TdQueryGetPaymentForm extends TdQuery { }
// export class TdQueryGetPaymentReceipt extends TdQuery { }
// export class TdQueryGetPreferredCountryLanguage extends TdQuery { }
// export class TdQueryGetProxies extends TdQuery { }
// export class TdQueryGetProxyLink extends TdQuery { }
// export class TdQueryGetPublicMessageLink extends TdQuery { }
// export class TdQueryGetRecentInlineBots extends TdQuery { }
// export class TdQueryGetRecentlyVisitedTMeUrls extends TdQuery { }
// export class TdQueryGetRecentStickers extends TdQuery { }
// export class TdQueryGetRecoveryEmailAddress extends TdQuery { }
// export class TdQueryGetRemoteFile extends TdQuery { }
// export class TdQueryGetRepliedMessage extends TdQuery { }
// export class TdQueryGetSavedAnimations extends TdQuery { }
// export class TdQueryGetSavedOrderInfo extends TdQuery { }
// export class TdQueryGetScopeNotificationSettings extends TdQuery { }
// export class TdQueryGetSecretChat extends TdQuery { }
// export class TdQueryGetStickerEmojis extends TdQuery { }
// export class TdQueryGetStickers extends TdQuery { }
// export class TdQueryGetStickerSet extends TdQuery { }
// export class TdQueryGetStorageStatistics extends TdQuery { }
// export class TdQueryGetStorageStatisticsFast extends TdQuery { }
// export class TdQueryGetSupergroup extends TdQuery { }
// export class TdQueryGetSupergroupFullInfo extends TdQuery { }
// export class TdQueryGetSupergroupMembers extends TdQuery { }
// export class TdQueryGetSupportUser extends TdQuery { }
// export class TdQueryGetTemporaryPasswordState extends TdQuery { }
// export class TdQueryGetTextEntities extends TdQuery { }
// export class TdQueryGetTopChats extends TdQuery { }
// export class TdQueryGetTrendingStickerSets extends TdQuery { }
// export class TdQueryGetUser extends TdQuery { }
// export class TdQueryGetUserFullInfo extends TdQuery { }
// export class TdQueryGetUserPrivacySettingRules extends TdQuery { }
// export class TdQueryGetUserProfilePhotos extends TdQuery { }
// export class TdQueryGetWallpapers extends TdQuery { }
// export class TdQueryGetWebPageInstantView extends TdQuery { }
// export class TdQueryGetWebPagePreview extends TdQuery { }
// export class TdQueryImportContacts extends TdQuery { }
// export class TdQueryJoinChat extends TdQuery { }
// export class TdQueryJoinChatByInviteLink extends TdQuery { }
// export class TdQueryLeaveChat extends TdQuery { }
// export class TdQueryLogOut extends TdQuery { }
// export class TdQueryOpenChat extends TdQuery { }
// export class TdQueryOpenMessageContent extends TdQuery { }
// export class TdQueryOptimizeStorage extends TdQuery { }
// export class TdQueryParseTextEntities extends TdQuery { }
// export class TdQueryPingProxy extends TdQuery { }
// export class TdQueryPinSupergroupMessage extends TdQuery { }
// export class TdQueryProcessDcUpdate extends TdQuery { }
// export class TdQueryReadAllChatMentions extends TdQuery { }
// export class TdQueryRecoverAuthenticationPassword extends TdQuery { }
// export class TdQueryRecoverPassword extends TdQuery { }
// export class TdQueryRegisterDevice extends TdQuery { }
// export class TdQueryRemoveContacts extends TdQuery { }
// export class TdQueryRemoveFavoriteSticker extends TdQuery { }
// export class TdQueryRemoveProxy extends TdQuery { }
// export class TdQueryRemoveRecentHashtag extends TdQuery { }
// export class TdQueryRemoveRecentlyFoundChat extends TdQuery { }
// export class TdQueryRemoveRecentSticker extends TdQuery { }
// export class TdQueryRemoveSavedAnimation extends TdQuery { }
// export class TdQueryRemoveStickerFromSet extends TdQuery { }
// export class TdQueryRemoveTopChat extends TdQuery { }
// export class TdQueryReorderInstalledStickerSets extends TdQuery { }
// export class TdQueryReportChat extends TdQuery { }
// export class TdQueryReportSupergroupSpam extends TdQuery { }
// export class TdQueryRequestAuthenticationPasswordRecovery extends TdQuery { }
// export class TdQueryRequestPasswordRecovery extends TdQuery { }
// export class TdQueryResendAuthenticationCode extends TdQuery { }
// export class TdQueryResendChangePhoneNumberCode extends TdQuery { }
// export class TdQueryResendEmailAddressVerificationCode extends TdQuery { }
// export class TdQueryResendPhoneNumberConfirmationCode extends TdQuery { }
// export class TdQueryResendPhoneNumberVerificationCode extends TdQuery { }
// export class TdQueryResetAllNotificationSettings extends TdQuery { }
// export class TdQueryResetNetworkStatistics extends TdQuery { }
// export class TdQuerySearchCallMessages extends TdQuery { }
// export class TdQuerySearchChatMembers extends TdQuery { }
// export class TdQuerySearchChatMessages extends TdQuery { }
// export class TdQuerySearchChatRecentLocationMessages extends TdQuery { }
// export class TdQuerySearchChats extends TdQuery { }
// export class TdQuerySearchChatsOnServer extends TdQuery { }
// export class TdQuerySearchContacts extends TdQuery { }
// export class TdQuerySearchHashtags extends TdQuery { }
// export class TdQuerySearchInstalledStickerSets extends TdQuery { }
// export class TdQuerySearchMessages extends TdQuery { }
// export class TdQuerySearchPublicChat extends TdQuery { }
// export class TdQuerySearchPublicChats extends TdQuery { }
// export class TdQuerySearchSecretMessages extends TdQuery { }
// export class TdQuerySearchStickers extends TdQuery { }
// export class TdQuerySearchStickerSet extends TdQuery { }
// export class TdQuerySearchStickerSets extends TdQuery { }
// export class TdQuerySendBotStartMessage extends TdQuery { }
// export class TdQuerySendCallDebugInformation extends TdQuery { }
// export class TdQuerySendCallRating extends TdQuery { }
// export class TdQuerySendChatAction extends TdQuery { }
// export class TdQuerySendChatScreenshotTakenNotification extends TdQuery { }
// export class TdQuerySendChatSetTtlMessage extends TdQuery { }
// export class TdQuerySendCustomRequest extends TdQuery { }
// export class TdQuerySendEmailAddressVerificationCode extends TdQuery { }
// export class TdQuerySendInlineQueryResultMessage extends TdQuery { }
// export class TdQuerySendMessage extends TdQuery { }
// export class TdQuerySendMessageAlbum extends TdQuery { }
// export class TdQuerySendPassportAuthorizationForm extends TdQuery { }
// export class TdQuerySendPaymentForm extends TdQuery { }
// export class TdQuerySendPhoneNumberConfirmationCode extends TdQuery { }
// export class TdQuerySendPhoneNumberVerificationCode extends TdQuery { }
// export class TdQuerySetAccountTtl extends TdQuery { }
// export class TdQuerySetAlarm extends TdQuery { }
// export class TdQuerySetAuthenticationPhoneNumber {
//     '@type': "setAuthenticationPhoneNumber"
//     "phone_number": String,
//     "allow_flash_call": boolean,
//     "is_current_phone_number": boolean
// }
// export class TdQuerySetBio extends TdQuery { }
// export class TdQuerySetBotUpdatesStatus extends TdQuery { }
// export class TdQuerySetChatClientData extends TdQuery { }
// export class TdQuerySetChatDraftMessage extends TdQuery { }
// export class TdQuerySetChatMemberStatus extends TdQuery { }
// export class TdQuerySetChatNotificationSettings extends TdQuery { }
// export class TdQuerySetChatPhoto extends TdQuery { }
// export class TdQuerySetChatTitle extends TdQuery { }
// export class TdQuerySetCustomLanguagePack extends TdQuery { }
// export class TdQuerySetCustomLanguagePackString extends TdQuery { }
// export class TdQuerySetDatabaseEncryptionKey extends TdQuery { }
// export class TdQuerySetFileGenerationProgress extends TdQuery { }
// export class TdQuerySetGameScore extends TdQuery { }
// export class TdQuerySetInlineGameScore extends TdQuery { }
// export class TdQuerySetName extends TdQuery { }
// export class TdQuerySetNetworkType extends TdQuery { }
// export class TdQuerySetOption extends TdQuery { }
// export class TdQuerySetPassportElement extends TdQuery { }
// export class TdQuerySetPassportElementErrors extends TdQuery { }
// export class TdQuerySetPassword extends TdQuery { }
// export class TdQuerySetPinnedChats extends TdQuery { }
// export class TdQuerySetProfilePhoto extends TdQuery { }
// export class TdQuerySetRecoveryEmailAddress extends TdQuery { }
// export class TdQuerySetScopeNotificationSettings extends TdQuery { }
// export class TdQuerySetStickerPositionInSet extends TdQuery { }
// export class TdQuerySetSupergroupDescription extends TdQuery { }
// export class TdQuerySetSupergroupStickerSet extends TdQuery { }
// export class TdQuerySetSupergroupUsername extends TdQuery { }
// export class TdQuerySetTdlibParameters extends TdQuery {
//     '@type': 'setTdlibParameters'
//     parameters: TdLibTdParameters
//     constructor(parameters: TdLibTdParameters) {
//         this.parameters = parameters
//     }
// }

// export class TdQuerySetUsername extends TdQuery { }
// export class TdQuerySetUserPrivacySettingRules extends TdQuery { }
// export class TdQueryTerminateAllOtherSessions extends TdQuery { }
// export class TdQueryTerminateSession extends TdQuery { }
// export class TdQueryTestCallBytes extends TdQuery { }
// export class TdQueryTestCallEmpty extends TdQuery { }
// export class TdQueryTestCallString extends TdQuery { }
// export class TdQueryTestCallVectorInt extends TdQuery { }
// export class TdQueryTestCallVectorIntObject extends TdQuery { }
// export class TdQueryTestCallVectorString extends TdQuery { }
// export class TdQueryTestCallVectorStringObject extends TdQuery { }
// export class TdQueryTestGetDifference extends TdQuery { }
// export class TdQueryTestNetwork extends TdQuery { }
// export class TdQueryTestSquareInt extends TdQuery { }
// export class TdQueryTestUseError extends TdQuery { }
// export class TdQueryTestUseUpdate extends TdQuery { }
// export class TdQueryToggleBasicGroupAdministrators extends TdQuery { }
// export class TdQueryToggleChatDefaultDisableNotification extends TdQuery { }
// export class TdQueryToggleChatIsMarkedAsUnread extends TdQuery { }
// export class TdQueryToggleChatIsPinned extends TdQuery { }
// export class TdQueryToggleSupergroupInvites extends TdQuery { }
// export class TdQueryToggleSupergroupIsAllHistoryAvailable extends TdQuery { }
// export class TdQueryToggleSupergroupSignMessages extends TdQuery { }
// export class TdQueryUnblockUser extends TdQuery { }
// export class TdQueryUnpinSupergroupMessage extends TdQuery { }
// export class TdQueryUpgradeBasicGroupChatToSupergroupChat extends TdQuery { }
// export class TdQueryUploadFile extends TdQuery { }
// export class TdQueryUploadStickerFile extends TdQuery { }
// export class TdQueryValidateOrderInfo extends TdQuery { }
// export class TdQueryViewMessages extends TdQuery { }
// export class TdQueryViewTrendingStickerSets extends TdQuery { }

// interface TdOptionValue extends ITdObject {
//     "@type": "optionValueInteger" | "optionValueString" | "optionValueBoolean" | "optionValueEmpty"
//     value: number | string | boolean | null
// }

// interface TdLibTdParameters {
//     use_test_dc: boolean,
//     database_directory: string,
//     files_directory: string,
//     use_file_database: boolean,
//     use_chat_info_database: boolean,
//     use_message_database: boolean,
//     use_secret_chats: boolean,
//     api_id: number,
//     api_hash: string,
//     system_language_code: string,
//     device_model: string,
//     system_version: string,
//     application_version: string,
//     enable_storage_optimizer: boolean,
//     ignore_file_names: boolean,
// }