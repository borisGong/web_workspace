/*Covered by AvePoint copyright and license agreement*/
(function () {
    $$page("editor.controller", {
        _i18NSource: null,
        _content: "<p></p>",
        _changeHandle: null,
        _controller: function () {
            try {
                var self = this;

                self._vm.moduleId = self._commonService.getQueryParam('moduleId');
                self._i18NSource = {
                    numberWarnMsg: self._AveI18NService.getI18N("CC_Common_EnterNumber_Message"),
                    fileProgressSaveWarnMsg: self._AveI18NService.getI18N("CC_Common_Uploading_Message"),
                    cancelUploadWarn: self._AveI18NService.getI18N("CC_Common_StopUpload_Entry"),
                    noRelativedWiki: self._AveI18NService.getI18N("CC_Common_noWiki_Entry"),
                    searchWaterMark: self._AveI18NService.getI18N("CC_Common_SearchWikiName_Watermark_Entry"),
                }

                self._vm.editor = {
                    tools: [
                    "formatting",
                    "fontName",
                    "fontSize",
                    "bold",
                    "italic",
                    "underline",

                    "justifyLeft",
                    "justifyCenter",
                    "justifyRight",

                    "insertUnorderedList",
                    "insertOrderedList",
                    "indent",
                    "outdent",

                    //"createLink",
                    //"insertImage",
                    "createTable",
                    "addColumnLeft",
                    "addColumnRight",
                    "addRowAbove",
                    "addRowBelow",
                    "deleteRow",
                    "deleteColumn",

                    {
                        name: "InsertImageFile",
                        tooltip: self._AveI18NService.getI18N("CC_Common_InsertImage_Entry"),
                        exec: function (e) {
                            self._openImageWin();
                        }
                    },
                    {
                        name: "InsertAudioFile",
                        tooltip: self._AveI18NService.getI18N("CC_Common_InsertAudio_Entry"),
                        exec: function (e) {
                            self._openAuidoWin();
                        }
                    },
                    {
                        name: "InsertVideoFile",
                        tooltip: self._AveI18NService.getI18N("CC_Common_InsertVideo_Entry"),
                        exec: function (e) {
                            self._openVideoWin();
                        }
                    },
                    {
                        name: "InsertWebpage",
                        tooltip: self._AveI18NService.getI18N("CC_Common_InsertWebPage_Entry"),
                        exec: function (e) {
                            self._closeWebPageWin();
                            $("#epInsertPageWin").data("kendoWindow").center().open();
                        }
                    }
                    ],
                    stylesheets: [
                         $$.getFeatureUrl("CC", "/Content/common/editor.content.css")
                    ],
                    editorSelect: function (e) {
                        var eObj = e.sender.getSelection();
                        var editor = $("#ccEditor").data("kendoEditor");
                        var editorSelection = editor.getSelection();
                        var selectText = "";
                        if (editorSelection) {
                            //此处的两个双引号的格式是不同的，第一个是从editor中拷贝出来的格式，第二个是手写的格式
                            selectText = editorSelection.toString().replace("﻿", "");
                        }
                        if (selectText.trim() != "" && selectText.match(/^\[\[((?!\[\[)|(?!\]\]).)*\]\]$/)
                            && selectText.replace(/^\[\[/, "").replace(/\]\]$/, "").trim() != "") {
                            self._displayBack4LinkWiki(selectText);
                        } else {
                            if(eObj.focusNode && eObj.focusNode.parentNode) {
                                eObj = eObj.focusNode.parentNode;
                                if (eObj.className == "e-insertpage-link" && !eObj.getAttribute("onclick")) {
                                    eObj.setAttribute("onclick", "window.parent.$$page.editor_controller('showWebPage', this)");
                                    $$page.editor_controller("showWebPage", eObj);
                                }
                            }
                            try {
                                self._displayBack($(e.sender.selectedHtml()));
                            } catch (e) {
                                self._showPlayBackStyle(false, false, false, false);
                            }
                        }
                    },
                    serialization: { scripts: true },
                    pasteClearup: { none: true },
                    onChange: function () {
                        if (self._changeHandle != null && $.isFunction(self._changeHandle)) {
                            self._changeHandle(self._changeHandleParam);
                        }
                    },
                    content: self._content
                }
                if (self._commonService.getUrlPathName().indexOf('Wiki') > 0) {
                    self._vm.editor.tools.push(
                        {
                            name: "InserWiki",
                            tooltip: self._AveI18NService.getI18N("CC_Common_RelativeWiki_Entry"),
                            exec: function () {
                                self._openLinkWikiWin();
                            }
                        }
                    );
                }

                self._vm.imageType = {
                    local: 0,
                    web: 1,
                    checked: 0
                }
                self._vm.linkWikiType = {
                    defaultV: 0,
                    Alias: 1,
                    checked: 0
                }
                //upload file obj
                self._vm.imageFromLocalUpload = {
                    showUpload: true,
                    fileTypes: self._commonService.constant.IMAGE_FORMAT,
                    fileId: '',
                    hasInitialFile: false,
                    inProgress: false,
                    canDownload: false,
                    warn: self._i18NSource.fileProgressSaveWarnMsg,
                    showWarn: false,
                    width: "",
                    height: "",
                }

                self._vm.imageFromWebUpload = {
                    width: "",
                    height: "",
                    url: "http://",
                }

                self._vm.audioUpload = {
                    showUpload: true,
                    fileTypes: self._commonService.constant.AUDIO_FORMAT,
                    fileId: '',
                    hasInitialFile: false,
                    inProgress: false,
                    canDownload: false,
                    warn: self._i18NSource.fileProgressSaveWarnMsg,
                    width: 320,
                    height: 32,
                    fileName: '',
                }
                //这个字段目前放在外面，没有放在self._vm.audioUpload中，是因为不生效，具体原因不详，需要查找一下
                self._vm.audioShowWarn = false;
                self._vm.videoUpload = {
                    showUpload: true,
                    fileTypes: self._commonService.constant.VIDEO_FORMAT,
                    fileId: '',
                    hasInitialFile: false,
                    inProgress: false,
                    canDownload: false,
                    warn: self._i18NSource.fileProgressSaveWarnMsg,
                    showWarn: false,
                    width: "",
                    height: "",
                    init: true,
                }
                self._vm.normalSearchWaterMark = self._i18NSource.searchWaterMark;
                //这两个目前没有绑定到页面，所以需要放在service里面了
                self._vm.customVideoRule = self._EditorService.getVideoCustomSizeRule();
                self._vm.customImageRule = self._EditorService.getImageCustomSizeRule(0, 0);
                self._vm.customImageFromWebRule = self._EditorService.getImageCustomSizeRule(0, 0);

                //control input disable/able
                self._vm.videoCustomDisabled = true;
                self._vm.imageCustomFromLocalDisabled = true;
                self._vm.imageCustomFromWebDisabled = true;

                //control radio checked/unchecked
                self._vm.imageFromLocalSelecteRule = 0;
                self._vm.imageFromWebSelecteRule = 0;
                self._vm.videoSelecteRule = 0;

                self._vm.customMsg = self._i18NSource.numberWarnMsg;
                //這個需要重新命名
                self._vm.displayBack = {
                    type: {
                        image: 0,
                        audio: 1,
                        video: 2,
                        linkWiki:3,
                    },
                    info: null,
                }
                self._vm.wiki = {
                    //initSearcbox: false,
                    keyWord: "",
                    otherName:"",
                    linkSources: [],
                    noLinkSourcesWarn: self._i18NSource.noRelativedWiki,
                    showLinks: false,
                    initSearcbox: false,
                    showNoLinkSourcesWarn: false,
                    pager: {
                        pageIndex: 1,
                        pageSize: 5,
                        sizeItems:[5,10,20,50],
                    }
                }

            } catch (e) {
                $$.error(e);
            }
        },
        _initCallback: function () {
            try {
                var self = this;
                self._vm.insertImage = function () {
                    self._InsertImage();
                };
                self._vm.insertAudio = function () {
                    self._InsertAudio();
                };
                self._vm.insertVideo = function () {
                    self._InsertVideo();
                };
                self._vm.closeImageWin = function () {
                    if (self._vm.imageFromLocalUpload.inProgress) {
                        self._commonService.showConfirm('', self._AveI18NService.getI18N("CC_Common_StopUpload_Entry"), function () {
                            self._closeImageWin();
                        })
                    } else {
                        self._closeImageWin();
                    }
                };
                self._vm.closeAudioWin = function () {
                    if (self._vm.audioUpload.inProgress) {
                        self._commonService.showConfirm('', self._AveI18NService.getI18N("CC_Common_StopUpload_Entry"), function () {
                            self._closeAudioWin();
                        })
                    } else {
                        self._closeAudioWin();
                    }
                };
                self._vm.closeVideoWin = function () {
                    if (self._vm.videoUpload.inProgress) {
                        self._commonService.showConfirm('', self._AveI18NService.getI18N("CC_Common_StopUpload_Entry"), function () {
                            self._closeVideoWin();
                        })
                    } else {
                        self._closeVideoWin();
                    }
                };
                self._vm.insertWebPage = function () {
                    self._insertWebPage();
                };
                self._vm.saveImageCallback = function (fileId) {
                    self._vm.imageFromLocalUpload.fileId = fileId;
                    self._vm.imageFromLocalUpload.showWarn = false;
                    self._EditorService.getImageArea(fileId, function (originalSize) {
                        self._vm.customImageRule = self._EditorService.getImageCustomSizeRule(originalSize.Width, originalSize.Height);
                        self._EditorService.shiftImageFromLocalType(self);
                    });
                }
                self._vm.saveAudioCallback = function (fileId, fileName) {
                    self._vm.audioUpload.fileId = fileId;
                    self._vm.audioUpload.fileName = fileName;
                    self._vm.audioShowWarn = false;
                }
                self._vm.saveVideoCallback = function (fileId) {
                    self._vm.videoUpload.fileId = fileId;
                    self._vm.videoUpload.showWarn = false;
                    self._EditorService.shiftVideoType(self);
                }
                self._vm.shiftImageSizeRule = function () {
                    self._EditorService.shiftImageFromLocalType(self);
                }
                self._vm.shiftImageFromWebType = function () {
                    self._EditorService.shiftImageFromWebType(self);
                }
                self._vm.shiftVideoSizeRule = function () {
                    //切换radio的时候清空message
                    var jqValidation = $('.cc-ep-video-validation')[0];
                    $$.validation.Utils.clearValidation(jqValidation);
                    self._EditorService.shiftVideoType(self);
                }
                self._vm.customSizeChange = function (validateObject, validateField) {
                    //validateRule 应该作为参数传递进来的，但是不是为什么，getImageCustomSizeRule 修改之后，vm不生效
                    var validateRule = null;
                    if (validateObject == "imageFromLocalUpload" && validateField == "width") {
                        validateRule = self._vm.customImageRule.width;
                    } else if (validateObject == "imageFromLocalUpload" && validateField == "height") {
                        validateRule = self._vm.customImageRule.height;
                    } else if (validateObject == "videoUpload" && validateField == "width") {
                        validateRule = self._vm.customVideoRule.width;
                    } else if (validateObject == "videoUpload" && validateField == "height") {
                        validateRule = self._vm.customVideoRule.height;
                    } else if (validateObject == "imageFromWebUpload" && validateField == "width") {
                        validateRule = self._vm.customImageFromWebRule.width;
                    } else if (validateObject == "imageFromWebUpload" && validateField == "height") {
                        validateRule = self._vm.customImageFromWebRule.height;
                    }
                    return self._EditorService.validateCustomSize(self, validateRule, validateObject, validateField);
                }
                self._vm.editorValidate = function () {
                    var editorBody = self._getEditorBody();
                    if ($(".k-overlay").length > 0 || $(".k-tool-group").eq(0).find(".k-dropdown-wrap").hasClass("k-state-hover") || $(".k-ct-cell").closest(".k-ct-popup").css("display") != "none") {
                        return true;
                    }
                    if (editorBody.innerText.trim().length > 0 || $('img', editorBody).length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
                self._vm.imageUrlFromWebChange = function () {
                    $("<img/>", {
                        load: function () {
                            console.log("this url is image");
                            self._vm.customImageFromWebRule = self._EditorService.getImageCustomSizeRule(this.width, this.height);
                            self._EditorService.shiftImageFromWebType(self);
                        },
                        src: self._vm.imageFromWebUpload.url
                    });
                }
                self._vm.shiftWikiLink = function () {
                    self._setDisplayName();
                }
                self._vm.insertWikiLink = function () {
                    self._insertWikiLink();
                }
                self._vm.closeWikiLinkWin = function () {
                    self._closeWikiLinkWin();
                }
                self._vm.onSelectedPageChanged = function () {
                    self._getWikis4Smart();
                };
                self._vm.onSearching = function (a, b, args) {
                    self._vm.wiki.keyWord = args.newValue;
                    self._getWikis4Smart();
                };
                self._vm.onStopSearching = function () {
                    self._vm.wiki.keyWord = "";
                    self._getWikis4Smart();
                };
            } catch (e) {
                $$.error(e);
            }
        },
        _loaded: function () {
            try {
                var self = this;
                self._EditorService.getMaxFileSize(function (maxFileSize) {
                    self._vm.imageFromLocalUpload.maxFileSize = maxFileSize + "MB";
                    self._vm.audioUpload.maxFileSize = maxFileSize + "MB";
                    self._vm.videoUpload.maxFileSize = maxFileSize + "MB";
                })
            } catch (e) {
                $$.error(e);
            }
        },
        _setDisplayName:function(){
            var self = this;
            self._vm.wiki.otherName = self._vm.wiki.selectedWikiLink.Title;
            self._apply();
        },
        _getWikis4Smart: function () {
            var self = this;
            try {
                self._EditorService.getWikis4Smart(
                    {
                        KeyWord: encodeURIComponent(self._vm.wiki.keyWord).replace(/%C2%A0/g, '%20'),
                        PageSize: self._vm.wiki.pager.pageSize,
                        PageIndex: self._vm.wiki.pager.pageIndex - 1,
                    }, function (result) {
                        if (result && result.Total != 0) {
                            self._vm.wiki.showNoLinkSourcesWarn = false;
                            self._vm.wiki.showLinks = true;
                            self._vm.wiki.linkSources = result.Data;
                            self._vm.wiki.pager.pageIndex = result.PageIndex + 1 == 0 ? 1 : result.PageIndex + 1;
                            self._vm.wiki.pager.pageCount = result.PageCount;
                        } else {
                            self._vm.wiki.showNoLinkSourcesWarn = true;
                            self._vm.wiki.showLinks = false;
                        }
                    });
            } catch (e) {
                $$.error(e);
            }
        },
        _openImageWin: function () {
            var self = this, info = self._vm.displayBack.info, $img;
            if (info != null && info.type == self._vm.displayBack.type.image) {
                $img = self._getEditorElement("img[ave_fileId='" + info.fileId + "']");
                if (info.imageType == self._vm.imageType.local) {
                    self._vm.customImageRule = self._EditorService.getImageCustomSizeRule($img.attr("ave_originalWidth"), $img.attr("ave_originalHeight"));
                    self._setDisplayBackImageFromLocalInfo(info.choicedSize, info.width, info.height, info.fileId, info.imageUrl);
                }
                if (info.imageType == self._vm.imageType.web) {
                    self._vm.customImageFromWebRule = self._EditorService.getImageCustomSizeRule($img.attr("ave_originalWidth"), $img.attr("ave_originalHeight"));
                    self._setDisplayBackImageFromWebInfo(info.choicedSize, info.width, info.height, info.imageUrl);
                }
            }
            self._vm.imageFromLocalUpload.showUpload = true;
            $("#epInsertImageWin").data("kendoWindow").center().open();
        },
        _openAuidoWin: function () {
            var self = this, info = self._vm.displayBack.info;
            if (info != null && info.type == self._vm.displayBack.type.audio) {
                self._setDisplayBackAudioInfo(info.fileId);
            }
            self._vm.audioUpload.showUpload = true;
            $("#epInsertAudioWin").data("kendoWindow").center().open();
        },
        _openVideoWin: function () {
            var self = this, info = self._vm.displayBack.info;
            var jqValidation = $('.cc-ep-video-validation')[0];
            $$.validation.Utils.clearValidation(jqValidation);
            if (info != null && info.type == self._vm.displayBack.type.video) {
                self._setDisplayBackVideoInfo(info.choicedSize, info.width, info.height, info.fileId);
            }
            self._vm.videoUpload.showUpload = true;
            $("#epInsertVideoWin").data("kendoWindow").center().open();
        },
        _openLinkWikiWin: function () {
            var self = this,info = self._vm.displayBack.info;
            //self._vm.wiki.initSearcbox = true;
            self._vm.wiki.pager.pageIndex = 1;
            if (info != null && info.type == self._vm.displayBack.type.linkWiki) {
                var indexs = info.value.indexOf('|');
                if (indexs > 0) {
                    self._vm.linkWikiType.checked = self._vm.linkWikiType.Alias;
                    self._setDisplayBackLinkWikiInfo(info.value.split('|')[0].trim(), info.value.substring(indexs + 1, info.value.length));
                } else {
                    self._setDisplayBackLinkWikiInfo(info.value);
                }
            } else {
                self._getWikis4Smart();
            }
            $("#epInserWikiWin").data("kendoWindow").center().open();
        },
        _closeImageWin: function () {
            var self = this;
            self._vm.imageFromLocalUpload.width = "";
            self._vm.imageFromLocalUpload.height = "";
            self._vm.imageFromLocalUpload.fileId = "";
            self._vm.imageFromLocalUpload.showUpload = false;
            self._vm.imageFromLocalUpload.showWarn = false;
            self._vm.imageFromLocalUpload.hasInitialFile = false;
            self._vm.imageCustomFromLocalDisabled = true;
            self._vm.customImageRule.width = "";
            self._vm.customImageRule.height = "";
            self._vm.customImageFromWebRule.width = "";
            self._vm.customImageFromWebRule.height = "";
            self._vm.imageFromLocalSelecteRule = self._EditorService.getImageSizeType().original.key;
            self._vm.imageFromWebUpload.width = "",
            self._vm.imageFromWebUpload.height = "",
            self._vm.imageFromWebUpload.url = "http://",
            self._vm.imageCustomFromWebDisabled = true;
            self._vm.imageType.checked = self._vm.imageType.local;
            self._vm.imageFromWebSelecteRule = self._EditorService.getImageSizeType().original.key;
            //self._setBtnSelectedStatus($(".k-InsertImageFile"), false)
            $("#epInsertImageWin").data("kendoWindow").close();
            $("#ccEditor").data("kendoEditor").focus();
        },
        _closeAudioWin: function () {
            var self = this;
            self._vm.audioUpload.fileId = "";
            self._vm.audioUpload.fileName = "";
            self._vm.audioUpload.showUpload = false;
            self._vm.audioShowWarn = false;
            self._vm.audioUpload.hasInitialFile = false;
            //self._setBtnSelectedStatus($(".k-InsertAudioFile"), false);
            $("#epInsertAudioWin").data("kendoWindow").close();
            $("#ccEditor").data("kendoEditor").focus();
        },
        _closeVideoWin: function () {
            var self = this;
            self._vm.videoUpload.width = "";
            self._vm.videoUpload.height = "";
            self._vm.videoUpload.fileId = "";
            self._vm.videoUpload.videoName = "";
            self._vm.videoUpload.showWarn = false;
            self._vm.videoUpload.showUpload = false;
            self._vm.videoUpload.hasInitialFile = false;
            self._vm.videoCustomDisabled = true;
            self._vm.videoSelecteRule = self._EditorService.getVideoSizeType().large.key;
            //self._setBtnSelectedStatus($(".k-InsertVideoFile"), false)
            $("#epInsertVideoWin").data("kendoWindow").close();
            $("#ccEditor").data("kendoEditor").focus();
        },
        _closeWebPageWin: function () {
            $("#ccEditor").data("kendoEditor").focus();
            $("#epPageAddress").val("https://");
            $("#epPageText").val("");
            $("#epPageTip").val("");
            $("#epInsertPageWin").data("kendoWindow").close();
        },
        _closeWikiLinkWin: function () {
            var self = this;
            self._vm.linkWikiType.checked = self._vm.linkWikiType.defaultV;
            self._vm.wiki.keyWord = "";
            self._vm.wiki.otherName = "";
            //self._vm.wiki.initSearcbox = false;
            var searchBar = $('#cc-wikiLink-searchBox > input')[0];
            searchBar.value = "";
            $('#cc-wikiLink-searchBox .afui-icon-search').click();
            self._vm.wiki.showNoLinkSourcesWarn = false;
            self._vm.wiki.linkSources = [];
            self._vm.wiki.selectedWikiLink = null;
            self._vm.wiki.pager.pageIndex = 1;
            self._vm.wiki.pager.pageCount = 1;
            self._vm.wiki.pager.pageSize = 5;
            try {
                $("#ccEditor").data("kendoEditor").focus();
            } catch (e) {
                console.log('focus exception');
            }
            $("#epInserWikiWin").data("kendoWindow").close();
        },
        /*insert image audio video start*/
        _InsertImage: function () {
            var self = this, info = self._vm.displayBack.info, $oldImage;
            if (self._vm.imageType.checked == 0) {
                if (self._vm.imageFromLocalUpload.inProgress) {
                    self._vm.imageFromLocalUpload.showWarn = true;
                    return;
                }
                if (self._vm.imageFromLocalUpload.fileId != "" && $.isNumeric(self._vm.imageFromLocalUpload.width) && $.isNumeric(self._vm.imageFromLocalUpload.height)) {
                    if (info != null && info.type == self._vm.displayBack.type.image) {
                        $oldImage = self._getEditorElement("img[ave_fileId='" + info.fileId + "']");
                        $oldImage.replaceWith(self._createImageFromLocal());
                        self._vm.displayBack.info = null;
                    } else {
                        $("#ccEditor").data("kendoEditor").exec("inserthtml", { value: self._createImageFromLocal().prop("outerHTML") });
                    }
                }
            }
            if (self._vm.imageType.checked == 1) {
                if (self._vm.imageFromWebUpload.url != "" && $.isNumeric(self._vm.imageFromWebUpload.width) && $.isNumeric(self._vm.imageFromWebUpload.height)) {
                    if (info != null && info.type == self._vm.displayBack.type.image) {
                        $oldImage = self._getEditorElement("img[ave_fileId='" + info.fileId + "']");
                        $oldImage.replaceWith(self._createImageFromWeb());
                        self._vm.displayBack.info = null;
                    } else {
                        $("#ccEditor").data("kendoEditor").exec("inserthtml", { value: self._createImageFromWeb().prop("outerHTML") });
                    }
                }
            }
            self._closeImageWin();
        },
        _InsertAudio: function () {
            var self = this, info = self._vm.displayBack.info, $oldAudio;
            if (self._vm.audioUpload.inProgress) {
                self._vm.audioShowWarn = true;
                return;
            }
            if (self._vm.audioUpload.fileId != "") {
                if (info != null && info.type == self._vm.displayBack.type.audio) {
                    $oldAudio = $(self._getEditorElement("img[ave_fileId='" + info.fileId + "']"))
                    $oldAudio.replaceWith(self._createAudioPlaceHolder());
                    self._vm.displayBack.info = null;
                } else {
                    $("#ccEditor").data("kendoEditor").exec("inserthtml", { value: self._createAudioPlaceHolder().prop("outerHTML") });
                }
            }
            self._closeAudioWin();
        },
        _InsertVideo: function () {
            var self = this, info = self._vm.displayBack.info, $oldVideo;
            if (self._vm.videoUpload.inProgress) {
                self._vm.videoUpload.showWarn = true;
                return;
            }
            if (self._vm.videoUpload.fileId != "") {
                if (!$.isNumeric(self._vm.videoUpload.width) || !$.isNumeric(self._vm.videoUpload.height)) {
                    return;
                }
                if (info != null && info.type == self._vm.displayBack.type.video) {
                    $oldVideo = $(self._getEditorElement("img[ave_fileId='" + info.fileId + "']"));
                    $oldVideo.replaceWith(self._createVideoPlaceHolder());
                    self._vm.displayBack.info = null;
                } else {
                    if (self._vm.videoUpload.fileId != "") {
                        $("#ccEditor").data("kendoEditor").exec("inserthtml", { value: self._createVideoPlaceHolder().prop("outerHTML") });
                    }
                }
            }
            self._closeVideoWin();
        },
        _insertWebPage: function () {
            var self = this,
               editor = $("#ccEditor").data("kendoEditor"),
               $pagelink = $("<a class='e-insertpage-link'></a>"),
               address = $("#epPageAddress").val().trim(),
               tip = $("#epPageTip").val().trim(),
               text = $("#epPageText").val().trim();
            if (text.length > 0) {
                $pagelink.text($("#epPageText").val().trim()).attr("onclick", "window.parent.$$page.editor_controller('showWebPage', this)");
            } else {
                if (address.length > 0 && address != "https://" && address != "http") {
                    $pagelink.text(address).attr("onclick", "window.parent.$$page.editor_controller('showWebPage', this)");
                }
            }
            if (address.length > 0) {
                $pagelink.attr({
                    "ave_address": address,
                    "href": address
                });
            }
            if (tip.length > 0) {
                $pagelink.attr("title", tip);
            }
            editor.exec("inserthtml", { value: $pagelink.prop("outerHTML") });
            self._closeWebPageWin();
        },
        _insertWikiLink: function () {
            var self = this,linkValue,info = self._vm.displayBack.info,
                selectItem = self._vm.wiki.selectedWikiLink,
                otherName = self._vm.wiki.otherName;
            if (selectItem) {
                var editor = $("#ccEditor").data("kendoEditor");
                if (self._vm.linkWikiType.checked == self._vm.linkWikiType.Alias && otherName.trim() != "") {
                    linkValue = '[[' + selectItem.Title.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;") + '|' + otherName.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;") + ']]';
                }
                else {
                    linkValue = '[[' + selectItem.Title.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;") + ']]';
                }
                editor.exec("inserthtml", { value: linkValue });
            }
            self._closeWikiLinkWin();
        },
        _createImageFromLocal: function () {
            var self = this,
                //如果上傳的是非法圖片（修改後綴名的，但是文件不是image）是獲得不了width和height，這裡需要優化一下
                $newImage = $("<img class='cc-editor-img' />").attr({
                    "ave_fileId": self._vm.imageFromLocalUpload.fileId,
                    "ave_originalWidth": self._vm.customImageRule.width.defaultV,
                    "ave_originalHeight": self._vm.customImageRule.height.defaultV,
                    "ave_choicedSize": self._vm.imageFromLocalSelecteRule,
                    "ave_fileType": self._vm.displayBack.type.image,
                    "ave_type": self._vm.imageType.local,
                    "src": $$.getFeatureUrl("CC", "/LcmsCommon/ShowMedia/" + self._vm.imageFromLocalUpload.fileId)
                });
            return self._setImageSize($newImage, $("#epImageWidth").val().trim(), $("#epImageHeight").val().trim());
        },
        _createImageFromWeb: function () {
            var self = this, fileId = "webImage_" + $$.generateUUID();
            $newImage = $("<img class='cc-editor-web-img' />").attr({
                "ave_fileId": fileId,
                "ave_originalWidth": self._vm.customImageFromWebRule.width.defaultV,
                "ave_originalHeight": self._vm.customImageFromWebRule.height.defaultV,
                "ave_choicedSize": self._vm.imageFromWebSelecteRule,
                "ave_fileType": self._vm.displayBack.type.image,
                "ave_type": self._vm.imageType.web,
                "src": self._vm.imageFromWebUpload.url
            });
            return self._setImageSize($newImage, $("#epWebImageWidth").val().trim(), $("#epWebImageHeight").val().trim());
        },
        _createAudioPlaceHolder: function () {
            var self = this,
                $placeHolder = $("<img class='cc-ep-audio-placeHolder'/>").attr({
                    "ave_fileId": self._vm.audioUpload.fileId,
                    "src": $$.getFeatureUrl("CC", "/Image/editor/Audio.png"),
                    "ave_fileSrc": $$.getFeatureUrl("CC", "/LcmsCommon/ShowMedia/" + self._vm.audioUpload.fileId),
                    "ave_fileType": self._vm.displayBack.type.audio,
                    "ave_fileName": self._vm.audioUpload.fileName
                });
            return $placeHolder;;
        },
        _createVideoPlaceHolder: function () {
            var self = this,
               $placeHolder = $("<img class='cc-ep-video-placeHolder'/>").attr({
                   "ave_fileId": self._vm.videoUpload.fileId,
                   "src": $$.getFeatureUrl("CC", "/Image/editor/Video.png"),
                   "ave_fileSrc": $$.getFeatureUrl("CC", "/LcmsCommon/ShowMedia/" + self._vm.videoUpload.fileId),
                   "ave_choicedSize": self._vm.videoSelecteRule,
                   "ave_fileType": self._vm.displayBack.type.video
               });
            return self._setImageSize($placeHolder, $.trim(self._vm.videoUpload.width), $.trim(self._vm.videoUpload.height));
        },


        _setImageSize: function ($img, width, height) {
            if ($.isNumeric(width) && $.isNumeric(height)) {
                $img.prop({
                    "width": width,
                    "height": height
                })
            }
            return $img;
        },
        /*insert image audio video end*/

        /*display back start*/
        _displayBack: function ($node) {
            var self = this, fileType = $node.attr("ave_fileType"), isVideo, isImage, isAudio;
            if ($node.is('img') && typeof (fileType) != "undefined") {
                isImage = fileType == self._vm.displayBack.type.image;
                isAudio = fileType == self._vm.displayBack.type.audio;
                isVideo = fileType == self._vm.displayBack.type.video;
                self._showPlayBackStyle(isAudio, isImage, isVideo,false);
                self._recourdPlayBackInfo(isAudio, isImage, isVideo, $node);
            } else {
                self._showPlayBackStyle(false, false, false, false);
                self._recourdPlayBackInfo(false, false, false, false);
            }
        },
        _displayBack4LinkWiki: function (selectContent) {
            var self = this;
            self._showPlayBackStyle(false, false, false, true);
            self._recourdPlayBackInfo4LinkWiki(selectContent);

        },

        _showPlayBackStyle: function (isAudio, isImage, isVideo, isLinkWiki) {
            var self = this;
            self._setBtnSelectedStatus($(".k-InsertAudioFile"), isAudio)
                ._setBtnSelectedStatus($(".k-InsertImageFile"), isImage)
                ._setBtnSelectedStatus($(".k-InsertVideoFile"), isVideo)
                ._setBtnSelectedStatus($(".k-InserWiki"), isLinkWiki);
        },
        _recourdPlayBackInfo: function (isAudio, isImage, isVideo, $node) {
            var self = this;
            if (!isVideo && !isImage && !isAudio) {
                self._vm.displayBack.info = null;
                return;
            }
            self._vm.displayBack.info = {
                fileId: $node.attr("ave_fileId"),
                width: $node.prop("width"),
                height: $node.prop("height"),
                choicedSize: $node.attr("ave_choicedSize")
            }
            if (isVideo) {
                self._vm.displayBack.info.type = self._vm.displayBack.type.video;
            } else if (isImage) {
                self._vm.displayBack.info.type = self._vm.displayBack.type.image;
                self._vm.displayBack.info.imageType = $node.attr("ave_type");
                self._vm.displayBack.info.imageUrl = $node.attr("src");
            } else if (isAudio) {
                self._vm.displayBack.info.type = self._vm.displayBack.type.audio;
            }
        },
        _recourdPlayBackInfo4LinkWiki: function (selectContent) {
            var self = this;
            if (selectContent.trim() == "") {
                return;
            }
            self._vm.displayBack.info = {
                value:selectContent.replace(/^\[\[/, "").replace(/\]\]$/, "")
            }
            self._vm.displayBack.info.type = self._vm.displayBack.type.linkWiki;
        },

        _setDisplayBackImageFromLocalInfo: function (choicedSize, width, height, fileId) {
            var self = this;
            self._vm.imageFromLocalUpload.width = width;
            self._vm.imageFromLocalUpload.height = height;
            self._vm.imageCustomFromLocalDisabled = choicedSize != self._EditorService.getImageSizeType().custom;
            self._vm.imageFromLocalUpload.fileId = fileId;
            self._vm.imageFromLocalUpload.hasInitialFile = true;
            self._vm.imageFromLocalSelecteRule = parseInt(choicedSize);
            self._vm.imageType.checked = self._vm.imageType.local;
            return this;
        },
        _setDisplayBackImageFromWebInfo: function (choicedSize, width, height, url) {
            var self = this;
            self._vm.imageFromWebUpload.width = width;
            self._vm.imageFromWebUpload.height = height;
            self._vm.imageCustomFromWebDisabled = choicedSize != self._EditorService.getImageSizeType().custom;
            self._vm.imageFromWebUpload.url = url;
            self._vm.imageFromWebSelecteRule = choicedSize;
            self._vm.imageType.checked = self._vm.imageType.web;
            return this;
        },
        _setDisplayBackVideoInfo: function (choicedSize, width, height, fileId) {
            var self = this;
            self._vm.videoUpload.width = width;
            self._vm.videoUpload.height = height;
            self._vm.videoCustomDisabled = choicedSize != self._EditorService.getVideoSizeType().custom;
            self._vm.videoUpload.fileId = fileId;
            self._vm.videoUpload.hasInitialFile = true;
            self._vm.videoSelecteRule = choicedSize;
            return this;
        },
        _setDisplayBackAudioInfo: function (fileId) {
            var self = this;
            self._vm.audioUpload.fileId = fileId;
            self._vm.audioUpload.hasInitialFile = true;
        },
        _setDisplayBackLinkWikiInfo: function (keyword,displayName) {
            var self = this;
            if (displayName) {
                self._vm.wiki.otherName = displayName;
            }
            var searchBar = $('#cc-wikiLink-searchBox > input')[0];
            searchBar.value = keyword;
            $('#cc-wikiLink-searchBox .afui-icon-search').click();
            self._vm.normalSearchWaterMark = "";
            return this;
        },
        /*display back end*/

        /*editor extend Base API*/
        _getEditorElement: function (selector) {
            return $(this._getEditorBody()).find(selector);
        },
        _getEditorBody: function () {
            return $("#ccEditor").data("kendoEditor").body;
        },
        _setBtnSelectedStatus: function ($btn, status) {
            var $parent = $btn.closest(".k-tool").attr("aria-pressed", status);
            if (status) {
                $parent.addClass("k-state-selected");
            } else {
                $parent.removeClass("k-state-selected");
            }
            return this;
        },

        /*editor extend public Method*/
        showWebPage: function (e) {
            //改方法可以放在service里面
            var $t = $(e), url = $t.attr("ave_address");
            if (url) {
                if ((/^http?:\/\/.+$/i).test(url)) {
                    window.open(url);
                } else {
                    var $webpagePop = $("#webPagePopop");
                    if ($webpagePop.length == 0) {
                        $webpagePop = ($("<div id='webPagePopop'></div>")).appendTo($("body"));
                    }
                    else {
                        $webpagePop.data("kendoWindow").destroy();
                    }
                    $webpagePop.kendoWindow({
                        title: $t.text(),
                        content: url,
                        width: "1000px",
                        height: "650px",
                        actions: ["Maximize", "Close"],
                        iframe: true,
                        visible: false,
                        modal: true
                    });
                    $webpagePop.data("kendoWindow").center().open();
                }
            }
            return false;
        },
        getEditorFiles: function () {
            var self = this, editorFiles = new Array(), $editorBody = $(self._getEditorBody());
            $editorBody.find(".cc-ep-video-placeHolder").map(function (key, value) {
                editorFiles.push({ Type: 1, FileId: $(value).attr("ave_fileId") });
            });
            $editorBody.find(".cc-ep-audio-placeHolder").map(function (key, value) {
                editorFiles.push({ Type: 2, FileId: $(value).attr("ave_fileId") });
            });
            $editorBody.find(".cc-editor-img").map(function (key, value) {
                editorFiles.push({ Type: 3, FileId: $(value).attr("ave_fileId") });
            });
            return {
                Files: editorFiles,
                AccessToken: "",
                TargetId: "",
                ModuleId: self._commonService.getQueryParam("ModuleId")
            };
        },
        setEditorContent: function (content) {
            var self = this;
            self._content = content;
            if (this._vm) {
                this._vm.editor.content = content;
            }
        },
        getContent: function () {
            var self = this;
            return encodeURIComponent(self._vm.editor.content);
        },
        disabledEditor: function () {
            var self = this;
            self._commonService.disabledEditor("#ccEditor");
        },
        onContentChange: function (callBack, callBackParam) {
            var self = this;
            self._changeHandleParam = callBackParam;
            if ($.isFunction(callBack)) {
                self._changeHandle = callBack;
            }
        }
    });

    angular.module('app').controller('EditorController', $$page.editor_controller);

    $$page.editor_controller.$inject = ['$scope', 'EditorService', 'commonService', 'AveI18NService'];

})();