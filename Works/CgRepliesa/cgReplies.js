/**
 * Created by administrator on 20/07/2016.
 */
$$page("cc.cg", {
    _cgDto: [],
    _cgSwitch: {
        isEdit: true,
        isDel: true,
        isLike: true,
        isReply: true,
        isPortrait: true,
    },
    _create: function () {
        this._bindEvent();
    },
    _bindEvent: function () {
        var self = this;
        bindClickEvent(self._replyHandle, ".cc-gc-btn-reply");
        bindClickEvent(self._postHandle, ".cc-gc-btn-post");
        bindClickEvent(self._delHandle, ".cc-gc-btn-del");
        function bindClickEvent(handle, $target) {
            $("body").on({
                click: function (e) {
                    if ($.isFunction(handle))handle(e, self);
                }
            }, $target);
        }
    },
    _delHandle: function (e) {
        var self = arguments[1], $target = $(e.target), replyId = $target.parent().data("replayId");
        $.ajax({
            type: "get",
            url: "",
            async: false,
            cache: false,
            data: {
                Id: replyId
            },
            success: function () {
                var reply = $("#" + replyId);
                var content = reply.children(".cc-gc-content").text("the reply is delete by user");
            }
        });
    },
    _postHandle: function (e) {
        var self = arguments[1], target = $(e.target),
            $editorPanel = target.parent().parent(),
            $editContent = target.parent().prev(),
            replyId = target.parent().attr("replyId"),
            creater = target.parent().attr("creater");
        $.ajax({
            type: "get",
            url: "",
            async: false,
            cache: false,
            data: {
                Id: replyId,
                Context: $editContent.text()
            },
            success: function () {
                var reply = $("#" + replyId), level = reply.attr("level");
                reply.find(".cc-gc-reply-level").remove();
                $editorPanel.hide();
                $editContent.empty();
                for (var i = 0; i < reflush.Replies.length; i++) {
                    reply.append(self._createRepies(reflush.Replies[i], (parseInt(level) + 1), creater));
                }
            }
        });
    },
    _replyHandle: function (e) {
        var self = arguments[1], $target = $(e.target), replyId = $target.parent().data("replayId"),
            creater = $target.parent().data("creater"),
            $level = $("#" + replyId), $edit = $level.children(".cc-gc-editor-panel");
        if ($edit.length == 0) {
            $edit = self._createReplyEditor(replyId, creater);
            $level.children(".cc-gc-content").after($edit);
        } else if ($edit.css("display") == "none") {
            $edit.show();
        } else {
            $edit.hide().children(".cc-gc-editor").empty();
        }
    },
    _createReplyCount: function (type, count) {
        return $('<div class="cc-gc-reply-count"><span style="margin-right: 10px">' + count + '</span>' + type + '</div>');
    },
    _createPanels: function () {
        var replies = this._cgDto, $cgPanel = $(".cc-gc-Panel"), $replyPanel,
            $pager = '<div class="cc-gc-page"></div>', $replies;
        for (var i = 0; i < replies.length; i++) {
            $replyPanel = $('<div class="cc-gc-reply-panel"></div>');
            $replies = this._createRepies(replies[i], 1);
            $cgPanel.append($replyPanel.append($replies).append($pager));
        }
    },
    _createRepies: function (reply, level, pCreater) {
        if (typeof reply == 'undefined')return;
        var $level = this._createReplyLevel(reply, level, pCreater);
        for (var i = 0; i < reply.Replies.length; i++) {
            $level.append(this._createRepies(reply.Replies[i], level + 1, reply.CreatedByStr));
        }
        return $level;
    },
    _createReplyLevel: function (reply, level, pCreater) {
        var $level, $header, $createInfo, $footer, $replyCount, $content;
        $level = $('<div class="cc-gc-reply-level cc-gc-reply-level' + level + '" level="' + level + '"></div>');
        $header = this._createHeader(reply.CreatedByStr, reply.Id);
        $content = $('<div class="cc-gc-content">' + reply.Content + '</div>');
        $level.append($header, $content).attr("id", reply.Id);
        if (level == 1) {
            $createInfo = this._createLvlCreaterInfor(reply.CreatedByStr, reply.CreateTimeStr);
            $replyCount = this._createReplyCount("replies", reply.ReplyTimes);
            $footer = this._createFooter(reply.ModifyByStr, reply.ModifyTimeStr);
            $level.append($footer, $replyCount);
        } else {
            $createInfo = this._createNolv1CreatorInfor(reply.CreatedByStr, reply.CreateTimeStr, pCreater);
        }
        $header.append($createInfo);
        return $level;
    },
    _createHeader: function (creater, replyId) {
        var $head = $('<div class="cc-gc-header"></div>'),
            $bar = $('<div class="cc-gc-toolBar"></div>'),btns = "";
        if (this._cgSwitch.isLike)
            btns += '<div class="cc-gc-btn-like"><span class="cc-gc-like-count">24</span><span>like</span></div>';
        if (this._cgSwitch.isReply)
            btns += '<div class="cc-gc-btn-reply"></div>';
        if (this._cgSwitch.isEdit)
            btns += '<div class="cc-gc-btn-edit"></div>';
        if (this._cgSwitch.isDel)
            btns += '<div class="cc-gc-btn-del"></div>';
        $bar.data("replayId", replyId);
        $bar.data("creater", creater);
        return $head.append($head.append($bar.append($(btns))));
    },
    _createLvlCreaterInfor: function (creater, createTime) {
        return $('<div class="cc-gc-creat-info"><div class="cc-gc-creater">' + creater + '</div>' +
            '<div class="cc-gc-createTime">&nbsp; added a post - ' + createTime + '</div>');
    },
    _createNolv1CreatorInfor: function (creater, createTime, pCreater) {
        return $('<div class="cc-gc-creat-info">' +
            '<div class="cc-gc-creater">' + creater + '</div><div>&nbsp;Reply to</div>' +
            '<div class="cc-gc-btn-parentReply">' + pCreater + '</div>' +
            '<div class="cc-gc-createTime"> &nbsp;-' + createTime + '</div></div>');
    },
    _createFooter: function (modifier, modifyTime) {
        return $('<div class="cc-gc-footer">' +
            '<div class="cc-gc-modifier-infor">' +
            '<div class="cc-gc-modifier">Last Modified by ' + modifier + '</div>' +
            '<div class="cc-gc-modifyTime">- ' + modifyTime + '</div>' +
            '</div></div>');
    },
    _createReplyEditor: function (replyId, creater) {
        return $('<div class="cc-gc-editor-panel" >' +
            '<div class="cc-gc-editor" contenteditable="true"></div>' +
            '<div class="cc-gc-row" replyId="' + replyId + '" creater="' + creater + '">' +
            '<div class="cc-gc-btn-post">Post a Topic</div>' +
            '</div></div>');
    },
    getReplies: function (data) {
        this._cgDto = data;
        this._createPanels();
    }
});