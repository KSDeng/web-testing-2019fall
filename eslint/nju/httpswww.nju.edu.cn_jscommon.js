/**
 * 常用辅助脚本
 */

var alertPrefix;
var theDataGrid;
var curr_func;
var curr_callback = null;
var curr_selected;
var curr_actionUrl;
var dialogDiv;
var waitingBar;
var dialogFrame;
var dialogDiv1;
var dialogFrame1;
var theFrom, parentDialog, parentDataGrid;

var issubmited = false;

function initCommonJS() {
    alertPrefix = "<br>";
    actionDiv = $("<div></div>");
    actionContent = $("<div></div>");
    actionContent.appendTo(actionDiv);
    actionDiv.dialog({
        closed: true,
        title: "提示",
        width: 250,
        height: 130,
        modal: true,
        buttons: [{
            text: '确定',
            iconCls: 'icon-ok',
            handler: function() {
                $.post(curr_actionUrl, {}, function(result) {
                    if (result == "success") {
                        theDataGrid.datagrid("reload");
                        if (curr_callback != null) {
                            curr_callback(result);
                        }
                    } else {
                        alertMsg(result);
                    }
                });
                actionDiv.dialog("close");
            }
        }, {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function() {
                actionDiv.dialog("close");
            }
        }],
        onOpen: function() {
            $(this).dialog('move', {
                top: ($(window).height() - $(this).panel('panel').outerHeight()) / 2 + $(document).scrollTop()
            });
        }
    });
    dialogDiv = $('<div></div>');
    dialogFrame = $('<iframe id="dialogFrame" src="" frameborder="0" width="100%" height="100%" />');
    dialogFrame.appendTo(dialogDiv);
    dialogDiv.dialog({
        closed: true,
        resizable: true,
        modal: true,
        buttons: [{
            text: '确定',
            iconCls: 'icon-ok',
            handler: function() {
                //alert(issubmited);
                if (!issubmited) {
                    issubmited = true;
                    $("#dialogFrame")[0].contentWindow.submitForm(dialogDiv, theDataGrid, curr_callback);
                }
            }
        }, {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function() {
                dialogDiv.dialog("close");
            }
        }],
        onClose: function() {
            dialogFrame.attr('src', '');
        },
        onOpen: function() {
            $(this).dialog('move', {
                top: ($(window).height() - $(this).panel('panel').outerHeight()) / 2 + $(document).scrollTop()
            });
        }
    });
    dialogDiv1 = $("<div></div>");
    dialogFrame1 = $('<iframe id="openUrlFrame" name="openUrlFrame" src="" frameborder="0" width="100%" height="100%" />');
    dialogFrame1.appendTo(dialogDiv1);
    dialogDiv1.dialog({
        closed: true,
        resizable: true,
        modal: true,
        onClose: function() {
            dialogFrame1.attr('src', '');
        },
        onOpen: function() {
            $(this).dialog('move', {
                top: ($(window).height() - $(this).panel('panel').outerHeight()) / 2 + $(document).scrollTop()
            });
        }
    });
    waitingBar = $("<div></div>");
    $('<div style="padding: 0 20px;"><table width="100%" align="center" cellspacing="0" cellpadding="0" border="0"><tr><td height="16px"></td></tr><tr><td><span id=\'wb_tipMsg\'>程序处理中...</span></td></tr><tr><td height="8px"></td></tr><tr><td height="20px" class="waitingbar-image"></td></tr></table></div>').appendTo(waitingBar);
    waitingBar.window({
        title: '请稍等',
        width: 280,
        closed: true,
        minimizable: false,
        collapsible: false,
        maximizable: false,
        resizable: false,
        closable: false,
        modal: true,
        shadow: true,
        height: 110
    });
}

function openWaitingBar() {
    $("#wb_tipMsg").html('程序处理中...');
    waitingBar.window('open');
}
function openWaitingBar(tipMsg) {
    $("#wb_tipMsg").html(tipMsg);
    waitingBar.window('open');
}
function closeWaitingBar() {
    $("#wb_tipMsg").html('程序处理中...');
    waitingBar.window('close');
}
function changeWaitingBarProgress(progressMsg) {
    $("#wb_tipMsg").html(progressMsg);
}

function getSelectSomeAlert(actName, objName) {
    return alertPrefix + "请先选择将要" + actName + "的" + objName + "!";
}

function getSelectOneAlert(actName, objName) {
    return alertPrefix + "只能选择一个" + objName + "!";
}

function getConfirmAlert(actName, objName) {
    return alertPrefix + "确认" + actName + "选中的" + objName + "!";
}

function getConfirmAlert1(actName) {
    return alertPrefix + "确认" + actName + "!";
}

function checkSelectOneOpenUrl(gridName, url, width, height, actName, objName, callback) {
    width = verifyWidth(width);
    height = verifyHeight(height);

    issubmited = false;
    var rows = $(gridName).datagrid('getSelections');
    theDataGrid = $(gridName);
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (rows.length == 0) {
        $.messager.alert("提示", getSelectSomeAlert(actName, objName), "warning");
    } else {
        if (rows.length > 1) {
            $.messager.alert("提示", getSelectOneAlert(actName, objName), "warning");
        } else {
            var id = rows[0].id;
            if (url.indexOf("?") != -1) {
                url += "&id=" + id + "&t=" + Math.random();
            } else {
                url += "?id=" + id + "&t=" + Math.random();
            }
            dialogFrame.attr("src", url);
            dialogDiv.dialog({
                title: actName + objName,
                width: width,
                height: height,
                top: getScrollTop() + 10,
                modal: true
            });
            dialogDiv.dialog("open");
        }
    }
}

function checkSelectSomeOpenUrl(gridName, url, width, height, actName, objName, callback) {
    width = verifyWidth(width);
    height = verifyHeight(height);

    issubmited = false;
    var rows = $(gridName).datagrid('getSelections');
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    theDataGrid = $(gridName);
    if (rows.length == 0) {
        $.messager.alert(actName + "提示:", getSelectSomeAlert(actName, objName), "warning");

    } else {
        var ids = "";
        var arrId = [];
        for (i = 0; i < rows.length; i++) {
            arrId.push(rows[i].id);
        }
        ids = arrId.join(",");
        if (url.indexOf("?") != -1) {
            url += "&selectedIds=" + ids + "&t=" + Math.random();
        } else {
            url += "?selectedIds=" + ids + "&t=" + Math.random();
        }
        dialogFrame.attr("src", url);
        dialogDiv.dialog({
            title: actName + objName,
            width: width,
            height: height,
            top: getScrollTop() + 10,
            modal: true
        });
        dialogDiv.dialog("open");
    }
}

function checkOpenUrl(gridName, url, width, height, actName, objName, callback) {
    width = verifyWidth(width);
    height = verifyHeight(height);
    issubmited = false;
    theDataGrid = $(gridName);
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (url.indexOf("?") != -1) {
        url += "&t=" + Math.random();
    } else {
        url += "?t=" + Math.random();
    }
    dialogFrame.attr("src", url);
    dialogDiv.dialog({
        title: actName + objName,
        width: width,
        height: height,
        top: getScrollTop() + 10,
        modal: true
    });
    dialogDiv.dialog("open");
}

function openUrl(gridName, url, width, height, actName, objName, callback) {
    width = verifyWidth(width);
    height = verifyHeight(height);

    issubmited = false;
    theDataGrid = $(gridName);
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (url.indexOf("?") != -1) {
        url += "&t=" + Math.random();
    } else {
        url += "?t=" + Math.random();
    }
    dialogFrame1.attr("src", url);
    dialogDiv1.dialog({
        title: actName + objName,
        width: width,
        height: height,
        top: getScrollTop() + 10,
        modal: true
    });
    dialogDiv1.dialog("open");
}

function openUrlWithMaxWindow(gridName, url, actName, objName, callback) {
    var width = $(document.body).width() - 20;
    var height = $(document.body).height() - 20;
    openUrl(gridName, url, width, height, actName, objName, callback);
}

/**
 * public 关闭divDialog 模式窗口
 *     统一关闭方法,关闭openUrl()方法打开的divDialog 模式窗口
 */
function closeUrl() {
    dialogDiv1.dialog("close");
}

function checkSelectOneDoFunc(gridName, actName, objName, func, requireConfirm, callback) {
    var rows = $(gridName).datagrid('getSelections');
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (rows.length == 0) {
        $.messager.alert(actName + "提示:", getSelectSomeAlert(actName, objName), "warning");
    } else {
        if (rows.length > 1) {
            $.messager.alert(actName + "提示:", getSelectOneAlert(actName, objName), "warning");
        } else {
            var id = rows[0].id;
            curr_func = func;
            curr_selected = id;
            if (requireConfirm) {
                $.messager.confirm("确认", getConfirmAlert(actName, objName), function(r) {
                    if (r) {
                        curr_func(curr_selected);
                    }
                });
            } else {
                curr_func(curr_selected);
            }
        }
    }
}

function checkSelectOneDoAction(gridName, actName, objName, actionUrl, requireConfirm, callback) {
    var rows = $(gridName).datagrid('getSelections');
    theDataGrid = $(gridName);
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (rows.length == 0) {
        $.messager.alert(actName + "提示:", getSelectSomeAlert(actName, objName), "warning");
    } else {
        if (rows.length > 1) {
            $.messager.alert(actName + "提示:", getSelectOneAlert(actName, objName), "warning");
        } else {
            var id = rows[0].id;
            if (actionUrl.indexOf("?") != -1) {
                curr_actionUrl = actionUrl + "&id=" + id + "&t=" + Math.random();
            } else {
                curr_actionUrl = actionUrl + "?id=" + id + "&t=" + Math.random();
            }
            if (requireConfirm) {
                /*actionContent.html(getConfirmAlert(actName,objName));
                 actionDiv.dialog({top:getScrollTop()+50});
                 actionDiv.dialog("open");*/
                $.messager.confirm(actName + "确认", getConfirmAlert(actName, objName), function(r) {
                    if (r) {
                        //确认操作
                        doPostAction(curr_actionUrl, gridName, curr_callback);
                    }
                });
            } else {
                /*jzhou
                 *$.post(curr_actionUrl, {}, function(result) {
                 if (result == "success") {
                 $(gridName).datagrid("reload");
                 if (curr_callback != null){
                 curr_callback(result);
                 }
                 } else {
                 alertMsg(result);
                 }
                 });*/
                //不提醒 直接操作
                doPostAction(curr_actionUrl, gridName, curr_callback);
            }
        }
    }
}

function checkSelectSomeDoFunc(gridName, actName, objName, func, requireConfirm, callback) {
    var rows = $(gridName).datagrid('getSelections');
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (rows.length == 0) {
        $.messager.alert("提示", getSelectSomeAlert(actName, objName), "warning");
    } else {
        var ids = "";
        var arrId = [];
        for (i = 0; i < rows.length; i++) {
            arrId.push(rows[i].id);
        }
        ids = arrId.join(",");
        curr_func = func;
        curr_selected = ids;
        if (requireConfirm) {
            $.messager.confirm("确认", getConfirmAlert(actName, objName), function(r) {
                if (r) {
                    curr_func(curr_selected);
                }
            });
        } else {
            curr_func(curr_selected);
        }
    }
}

function checkSelectSomeDoAction(gridName, actName, objName, actionUrl, requireConfirm, callback) {
    theDataGrid = $(gridName);
    var rows = $(gridName).datagrid('getSelections');
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (rows.length == 0) {
        $.messager.alert("提示", getSelectSomeAlert(actName, objName), "warning");

    } else {
        var ids = "";
        var arrId = [];
        for (i = 0; i < rows.length; i++) {
            arrId.push(rows[i].id);
        }
        ids = arrId.join(",");
        if (actionUrl.indexOf("?") != -1) {
            curr_actionUrl = actionUrl + "&selectedIds=" + ids + "&t=" + Math.random();
        } else {
            curr_actionUrl = actionUrl + "?selectedIds=" + ids + "&t=" + Math.random();
        }
        if (requireConfirm) {
            $.messager.confirm("确认", getConfirmAlert(actName, objName), function(r) {
                if (r) {
                    openWaitingBar();
                    $.post(curr_actionUrl, {}, function(result) {
                        closeWaitingBar();
                        if (result == "success") {
                            $(gridName).datagrid("reload");
                            if (curr_callback != null) {
                                curr_callback(result);
                            }
                        } else {
                            alertMsg(result);
                        }
                    });
                }
            });
        } else {
            if (!window.parent.issubmited) {
                openWaitingBar();
                $.post(curr_actionUrl, {}, function(result) {
                    closeWaitingBar();
                    if (result == "success") {
                        window.parent.issubmited = true;
                        $(gridName).datagrid("reload");
                        if (curr_callback != null) {
                            curr_callback(result);
                        }
                    } else {
                        window.parent.issubmited = false;
                        alertMsg(result);
                    }
                });
            }
        }
    }
}
function setVal() {
    window.parent.issubmited = false;
}

function gridDoAction(gridName, actName, objName, actionUrl, requireConfirm, callback) {
    theDataGrid = $(gridName);
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (actionUrl.indexOf("?") != -1) {
        curr_actionUrl = actionUrl + "&t=" + Math.random();
    } else {
        curr_actionUrl = actionUrl + "?t=" + Math.random();
    }
    if (requireConfirm) {
        $.messager.confirm("确认", getConfirmAlert(actName, objName), function(r) {
            if (r) {
                $.post(curr_actionUrl, {}, function(result) {
                    if (result == "success") {
                        $(gridName).datagrid("reload");
                        if (curr_callback != null) {
                            curr_callback(result);
                        }
                    } else {
                        alertMsg(result);
                    }
                });
            }
        });
    } else {
        $.post(curr_actionUrl, {}, function(result) {
            if (result == "success") {
                $(gridName).datagrid("reload");
                if (curr_callback != null) {
                    curr_callback(result);
                }
            } else {
                alertMsg(result);
            }
        });
    }
}

function checkDoFunc(actName, func, requireConfirm, callback) {
    curr_func = func;
    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (requireConfirm) {
        $.messager.confirm("确认", getConfirmAlert1(actName), function(r) {
            if (r) {
                curr_func();
            }
        });
    } else {
        curr_func();
    }
}

function getScrollTop() {
    return $(parent.window.parent.window.parent.window.parent.document).scrollTop();
}

$(document).ready(function() {
    initCommonJS();
    if ($("#fm")[0]) {
        initForm("#fm");
    }
});

function initForm(fm) {
    theForm = $(fm);
    theForm.form({
        onSubmit: function() {
            var validateStr = theForm.attr('validate');
            var result = true;
            if (validateStr) {
                result = eval(validateStr);
            }
            if (!result) {
                if (window.parent) {
                    window.parent.issubmited = false;
                }
                return false;
            }
            if (!$(this).form("validate")) {
                if (window.parent) {
                    window.parent.issubmited = false;
                }
                return false;
            }
            openWaitingBar();
            return true;
        },
        success: function(result) {
            closeWaitingBar();
            if (jQuery.trim(result) != "success") {
                alertMsg(result);

            } else {
                if (parentDataGrid != null) {
                    parentDataGrid.datagrid("reload");
                }
                if (curr_callback != null) {
                    curr_callback(result);
                }
                try {
                    parentDialog.dialog("close");
                } catch (e) {
                    try {
                        parentDialog.close();
                    } catch (e) {
                    }
                }
            }
            if (window.parent) {
                window.parent.issubmited = false;
            }

        },
        error: function() {
            closeWaitingBar();
            alertMsg(alertPrefix + "保存表单失败!");
            issubmited = false;
        }
    });
}

function submitForm(theDialog, theDataGrid, callback) {
    parentDialog = theDialog;
    parentDataGrid = theDataGrid;
    curr_callback = callback;
    theForm.submit();
}

/**
 * public 操作验证
 *    验证执行操作的Url
 * @param actName 操作名称
 * @param objName 操作对象名称
 * @param actionUrl 操作提交地址
 * @param requireConfirm 是否确认 true or false
 * @param nextFun 执行成功后调用的函数
 */
function checkDoAction(actName, objName, actionUrl, requireConfirm, nextFun) {
    if (requireConfirm) {
        $.messager.confirm(actName + "确认", getConfirmAlert(actName, objName), function(r) {
            if (r) {
                openWaitingBar();
                $.ajax({
                    type: "POST",
                    url: actionUrl,
                    success: function(result) {
                        closeWaitingBar();
                        if (result == "success") {
                            var msg = "{'title':'提示','msg':'" + actName + objName + "成功!','icon':'info','fn':'" + nextFun + "'}";
                            alertMsg(msg);
                        } else {
                            alertMsg(result);
                        }
                    },
                    error: function() {
                        closeWaitingBar();
                        alertMsg(alertPrefix + "请求" + actName + objName + "失败!");
                    }
                });
            }
        });
    } else {
        openWaitingBar();
        $.ajax({
            type: "POST",
            url: actionUrl,
            success: function(result) {
                closeWaitingBar();
                if (result == "success") {
                    var msg = "{'title':'提示','msg':'" + actName + objName + "成功!','icon':'info','fn':'" + nextFun + "'}";
                    alertMsg(msg);
                } else {
                    alertMsg(result);
                }
            },
            error: function() {
                closeWaitingBar();
                alertMsg(alertPrefix + "请求" + actName + objName + "失败!");
            }
        });
    }
}

/**
 * public 提交验证
 *     提交操作前,提醒是否操作 requireConfirm = true则提醒,否则不提醒
 *     nextFun 操作成功后执行的函数
 * @param actName 操作名称
 * @param objName 操作对象名称
 * @param formName 表单名
 * @param requireConfirm 是否确认 true,false
 * @param nextFun 操作成功后执行的函数
 */
function checkSubmitForm(actName, objName, formName, requireConfirm, nextFun) {
    $(formName).form({
        onSubmit: function() {
            if ($(this).form("validate")) {
                openWaitingBar();
                return true;
            } else {
                return false;
            }
        },
        success: function(result) {
            closeWaitingBar();
            if (jQuery.trim(result) != "success") {
                alertMsg(result);
            } else {
                var msg = "{'title':'提示','msg':'" + actName + objName + "成功!','icon':'info','fn':'" + nextFun + "'}";
                alertMsg(msg);
            }
        }
    });

    if (requireConfirm) {
        $.messager.confirm('确认', alertPrefix + "确认" + actName + "选中的" + objName + "!", function(r) {
            if (r) {
                $(formName).submit();
            }
        });
    } else {
        $(formName).submit();
    }
}

/**
 * private Ajax提交操作
 * @param actionUrl 提交Url地址
 * @param  gridName 刷新DataGrid的Id
 * @param curr_callback 回调函数
 */
function doPostAction(actionUrl, gridName, curr_callback) {
    $.post(actionUrl, {}, function(result) {
        if (result == "success") {
            $(gridName).datagrid("reload");
            if (curr_callback != null) {
                curr_callback(result);
            }
        } else {
            alertMsg(result);
        }
    });
}

/**
 * public $.messager.alert确定提示框
 * jsonOrStrResult :{'title':'错误提示','msg':'错误消息','icon':'question','fn':''} 或 错误消息
 *           title : The title text to be showed on header panel
 *             msg : The message text to be showed
 *            icon : The icon image to be showed. Available value are: error,question,info,warning
 *              fn : The callback function triggered when window closed
 * @param jsonOrStrResult json值或字符串
 */
function alertMsg(jsonOrStrResult) {
    try {
        var jsonResult = eval("[" + jsonOrStrResult + "]");
        var fn = function() {
            if (jsonResult[0].fn != undefined) {
                eval(jsonResult[0].fn);
            }
        }
        $.messager.alert(jsonResult[0].title, alertPrefix + jsonResult[0].msg, jsonResult[0].icon, fn);
    } catch (ex) {
        $.messager.alert("提示:", jsonOrStrResult, "error");
    }
}

/**
 * private 验证进度条是否处于打开状态
 */
var progressBarIsOpen = false;
/**
 * public 默认打开进度条
 *   打开进度条
 *     openMsgProgress("open");
 *   关闭进度条
 *     openMsgProgress("close");
 * @param args : close|open 默认open
 * @param modal : 定义窗口是不是模态窗口 extend panel
 * @param title : 显示标题 extend panel
 * @param msg : 上传消息 extend message
 * @param text : 进度条显示文字的模板  {value}% extend progressbar
 * @param interval : 每次刷新间隔 毫秒 默认 300毫秒
 */
function openProgressBar(args, modal, title, msg, text, interval) {
    if (typeof args == "string" && args == "close") {
        if (progressBarIsOpen) {
            progressBarIsOpen = false;
        } else {
            return;
        }
    }
    if (progressBarIsOpen && typeof args == "string" && args == "open") {
        progressBarIsOpen = false;
        alert("出错:脚本多次open调用,请检查!");
        return;
    }
    if (typeof modal != "boolean" || modal == "") {
        modal = true;
    }
    var _1e = $.extend({
        title: title,
        msg: msg,
        text: text,
        interval: interval
    }, args || {});
    if (typeof args == "string" && args == "close") {
        var win = $("body>div.messager-window>div.messager-body");
        if (win.length) {
            if (win[0].timer) {
                clearInterval(win[0].timer);
            }
            win.window("close");
        }
        return;
    }
    var _21 = "<div class=\"messager-progress\"><div class=\"messager-p-bar\"></div><div class=\"messager-p-msg\"></div></div>";
    var win = openProgressBar_b(_1e.title, _21, null, modal);
    if (_1e.msg != "") {
        win.find("div.messager-p-msg").html(_1e.msg);
    }
    var bar = win.find("div.messager-p-bar");
    bar.progressbar({
        text: _1e.text
    });
    win.window({
        closable: false
    });
    if (_1e.interval == null) {
        _1e.interval = 300;
    }
    if (_1e.interval) {
        win[0].timer = setInterval(function() {
            var v = bar.progressbar("getValue");
            v += Math.floor(Math.random() * 10);
            if (v > 100) {
                v = 0;
            }
            bar.progressbar("setValue", v);
        }, _1e.interval);
    }
}

/**
 * private 创建进度条函数
 * @param _c : 进度条标题
 * @param _d : 进度条div
 * @param _e : 是否可以取消 true,false
 * @param _g : 是否为模式窗口
 */
function openProgressBar_b(_c, _d, _e, _g) {
    progressBarIsOpen = true;
    var _f = $("<div class=\"messager-body\"></div>").appendTo("body");
    _f.append(_d);
    _f.window({
        title: _c,
        noheader: (_c ? false : true),
        width: 300,
        height: "auto",
        modal: _g,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        draggable: false,
        onClose: function() {
            setTimeout(function() {
                _f.window("destroy");
            }, 1000);
        }
    });
    _f.window("window").addClass("messager-window");
    _f.children("div.messager-button").children("a:first").focus();
    return _f;
}

/**
 * public 打开一个空divDialog 模式窗口
 *    只能选择一个选项
 * @param gridName 当前页面DataGrid的Id
 * @param url 要打开的url地址
 * @param width 窗口宽度
 * @param height 窗口高度
 * @param actName 操作名称
 * @param objName 对象名称
 */
function checkSelectOneOpenWindow(gridName, url, width, height, actName, objName) {
    width = verifyWidth(width);
    height = verifyHeight(height);

    issubmited = false;
    var rows = $(gridName).datagrid('getSelections');
    theDataGrid = $(gridName);
    if (rows.length == 0) {
        $.messager.alert("提示:", getSelectSomeAlert(actName, objName), "warning");
    } else {
        if (rows.length > 1) {
            $.messager.alert("提示:", getSelectOneAlert(actName, objName), "warning");
        } else {
            var id = rows[0].id;
            if (url.indexOf("?") != -1) {
                url += "&id=" + id + "&t=" + Math.random();
            } else {
                url += "?id=" + id + "&t=" + Math.random();
            }
            dialogFrame1.attr("src", url);
            dialogDiv1.dialog({
                title: actName + objName,
                width: width,
                height: height,
                modal: true
            });
            dialogDiv1.dialog("open");
        }
    }
}

/**
 * public 打开一个空divDialog 模式窗口
 *    只能选择一个选项
 * @param gridName 当前页面DataGrid的Id
 * @param url 要打开的url地址
 * @param width 窗口宽度
 * @param height 窗口高度
 * @param actName 操作名称
 * @param objName 对象名称
 */
function checkSelectSomeOpenWindow(gridName, url, width, height, actName, objName) {
    width = verifyWidth(width);
    height = verifyHeight(height);

    issubmited = false;
    var rows = $(gridName).datagrid('getSelections');
    theDataGrid = $(gridName);
    if (rows.length == 0) {
        $.messager.alert("提示:", getSelectSomeAlert(actName, objName), "warning");
    } else {
        var ids = "";
        var arrId = [];
        for (i = 0; i < rows.length; i++) {
            arrId.push(rows[i].id);
        }
        ids = arrId.join(",");
        if (url.indexOf("?") != -1) {
            url += "&selectedIds=" + ids + "&t=" + Math.random();
        } else {
            url += "?selectedIds=" + ids + "&t=" + Math.random();
        }
        dialogFrame1.attr("src", url);
        dialogDiv1.dialog({
            title: actName + objName,
            width: width,
            height: height,
            modal: true
        });
        dialogDiv1.dialog("open");
    }
}

function checkSelectOneOpenMaxWindow(gridName, url, actName, objName) {
    var width = $(document.body).width() - 20;
    var height = $(document.body).height() - 20;
    checkSelectOneOpenWindow(gridName, url, width, height, actName, objName);
}

function openFullScreen(url, title) {
    var width = (screen.availWidth - 10) + "px";
    var height = (screen.availHeight - 50) + "px";
    var leftm = 0;
    var topm = 0;

    var args = "toolbar=0,location=0,maximize=1,directories=0,status=0,menubar=0,scrollbars=0, resizable=1,left=" + leftm + ",top=" + topm + ", width=" + width + ", height=" + height;
    var w = window.open(url, title, args);
    if (!w) {
        $.messager.alert("发现弹出窗口被阻止，请更改浏览器设置，以便正常使用本功能!");
        return;
    }
}

function openWindow(url, width, height, actName, objName, callback) {
    width = verifyWidth(width);
    height = verifyHeight(height);

    if (callback) {
        curr_callback = callback;
    } else {
        curr_callback = null;
    }
    if (url.indexOf("?") != -1) {
        url += "&t=" + Math.random();
    } else {
        url += "?t=" + Math.random();
    }
    dialogFrame1.attr("src", url);
    dialogDiv1.dialog({
        title: actName + objName,
        width: width,
        height: height,
        top: getScrollTop() + 10
    });
    dialogDiv1.dialog("open");
}

function openMaxWindow(url, actName, objName, callback) {
    var width = $(document.body).width() - 20;
    var height = $(document.body).height() - 20;
    openWindow(url, width, height, actName, objName, callback);
}

function verifyWidth(width) {
    var maxWidth = $(document.body).width() - 20;
    if (width > maxWidth) {
        return maxWidth;
    } else {
        return width;
    }
}

function verifyHeight(height) {
    var maxHeight = $(document).height() - 20;
    if (height > maxHeight) {
        return maxHeight;
    } else {
        return height;
    }
}
