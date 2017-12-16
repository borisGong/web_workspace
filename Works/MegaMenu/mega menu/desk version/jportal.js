function appsInitMegaMenu(data) {
    if (typeof (data) !== 'undefined') {
        $("#apps-homeMenu").attr("onclick", "location.href='" + data.HomeMenu.Link + "'");
        $("#apps-homeMenu").attr("title", data.HomeMenu.Tip);
        $("#apps-homeMenu").append("<div class='apps-homeMenu-icon'><div>");
        var megaMenu = $('#apps-megaMenu-ul');
        var topmenusWidth = 0;
        var maxWidth = 890;
        for (var i = 0; i < data.Menus.length; i++) {
            var topmenu = $("<li class='apps-topMenu'><div>" + data.Menus[i].Name + "</div></li>");
            if (data.Menus[i].Link != undefined) {
                topmenu.attr("link", data.Menus[i].Link);
                topmenu.click(function () {
                    window.open($(this).attr("link"), "_blank");
                });
            }
            megaMenu.append(topmenu);
            topmenusWidth += topmenu.outerWidth();
            if (topmenusWidth > 890) {
                topmenu.remove();
                break;
            }
            createSubMenus_Lv1(topmenu, data.Menus[i].Menus);
            if (navigator.userAgent.indexOf("Tablet PC") == -1) {
                topmenu.mouseenter(function (e) {
                    $(this).find(".apps-subMenus-lv1").css("display", "");
                });
                topmenu.mouseleave(function (e) {
                    $(this).find(".apps-subMenus-lv1").css("display", "none");
                });
            } else {
                topmenu.on("click", function (e) {
                    $(this).parent().find(".apps-subMenus-lv1").css("display", "none");
                    if ($(this).find(".apps-subMenus-lv1").find(".apps-subMenu-lv1").length !== 0) {
                        $(this).find(".apps-subMenus-lv1").css("display", "");
                    };
                    e.stopPropagation();
                });
                $(document).click(function (e) {
                    if ($(e.target).closest("#apps-megaMenu-ul").length === 0) {
                        $("#apps-megaMenu-ul").find(".apps-subMenus-lv1").css("display", "none");
                        $("#apps-megaMenu-ul").find("li.apps-subMenus-lv1").css("background-image", "url(\"" + $(this).attr("icon") + "\")");
                        $("#apps-megaMenu-ul").find("li.apps-subMenus-lv1").find(".apps-subMenus-lv2").css("display", "none");
                        $("#apps-megaMenu-ul").find("li.apps-subMenus-lv1").find(".apps-subMenus-lv2-arrow1").css("display", "none");
                        $("#apps-megaMenu-ul").find("li.apps-subMenus-lv1").find(".apps-subMenu-icon-showmenus").css("display", "");
                    }
                });
            }
        }
    }
}
function createSubMenus_Lv1(parentMenu, menusInfo) {
    if (typeof (menusInfo) !== 'undefined' && menusInfo != null) {
        var submenus = $("<ul class='apps-subMenus-lv1' style='display: none;'></ul>");
        parentMenu.append(submenus);
        for (var i = 0; i < menusInfo.length; i++) {

            var normalIcon = menusInfo[i].NormalIcon;
            var hoverIcon = menusInfo[i].HoverIcon;

            var xNormalCoordinate;
            var yNormalCoordinate;
            var normalCoordinate = menusInfo[i].NormalIconCoordinate;
            if (typeof (normalCoordinate) != 'undefined' && normalCoordinate != null) {
                normalCoordinate = (normalCoordinate).split(",");
                if (normalCoordinate.length >= 2) {
                    xNormalCoordinate = normalCoordinate[0] + "px";
                    yNormalCoordinate = normalCoordinate[1] + "px";
                }
            }

            var xHoverIconCoordinate;
            var yHoverIconCoordinate;
            var hoverCoordinate = menusInfo[i].HoverIconCoordinate;
            if (typeof (hoverCoordinate) != 'undefined' && hoverCoordinate != null) {
                hoverCoordinate = (hoverCoordinate).split(",");
                if (hoverCoordinate.length >= 2) {
                    xHoverIconCoordinate = hoverCoordinate[0] + "px";
                    yHoverIconCoordinate = hoverCoordinate[1] + "px";
                }
            }

            //var submenu = $("<li class='apps-subMenu-lv1' style='background-image:url(\"" + icon + "\");' onclick=\"window.open('"+menusInfo[i].Link+"')\"></li>");
            var submenu = $("<li class='apps-subMenu-lv1'></li>");
            submenus.append(submenu);

            var menuIcon = $("<div class='apps-subMenu-icon' style='background-image: url(\"" + normalIcon + "\");background-repeat: no-repeat;background-position: " + xNormalCoordinate + " " + yNormalCoordinate + ";'></div>");
            submenu.append(menuIcon);
            var menuInfo = $("<div class='apps-subMenu-info'></div>");
            submenu.append(menuInfo);


            if (typeof (menusInfo[i].Menus) !== 'undefined' && menusInfo[i].Menus != null) {
                submenu.append($("<div class='apps-subMenu-icon-showmenus'></div>"));
            }

            var infoTitle = $("<div class='apps-subMenu-title'>"
                + menusInfo[i].Name + "</div>");
            menuInfo.append(infoTitle);


            if (menusInfo[i].Link != undefined) {
                submenu.attr("link", menusInfo[i].Link);
                if (menusInfo[i].OpenInNewTab != undefined && menusInfo[i].OpenInNewTab) {
                    submenu.click(function (e) {
                        var submenutemp = $(this);
                        setTimeout(function (e) {
                            window.open(submenutemp.attr("link"), "_blank");
                            e.stopPropagation();
                        }, 1000);
                    });
                }
                else {
                    submenu.click(function () {
                        var submenutemp = $(this);
                        setTimeout(function (e) {
                            window.location.href = submenutemp.attr("link");
                        }, 1000);
                    });
                }
            }

            menuIcon.attr("normalicon", normalIcon)
					.attr("hoverIcon", hoverIcon)
					.attr("xNormalCoordinate", xNormalCoordinate)
					.attr("yNormalCoordinate", yNormalCoordinate)
					.attr("xHoverIconCoordinate", xHoverIconCoordinate)
					.attr("yHoverIconCoordinate", yHoverIconCoordinate);
            if (navigator.userAgent.indexOf("Tablet PC") == -1) {
                submenu.mouseenter(function () {
                    var tmenu = $(this);
                    setTimeout(function () {
                        tmenu.addClass("apps-subMenu-lv1-mouseenter").find(".apps-subMenu-icon").css("background-image", "url(" + tmenu.find(".apps-subMenu-icon").attr("hoverIcon") + ")")
																								.css("background-repeat", "no-repeat")
																								.css("background-position", "" + tmenu.find(".apps-subMenu-icon").attr("xHoverIconCoordinate") + " " + tmenu.find(".apps-subMenu-icon").attr("yHoverIconCoordinate"));
                        tmenu.find(".apps-subMenus-lv2").css("display", "");
                        tmenu.find(".apps-subMenus-lv2-arrow1").css("display", "");
                        tmenu.find(".apps-subMenu-icon-showmenus").css("display", "none");
                    }, 200);
                });
                submenu.mouseleave(function () {
                    var tmenu = $(this);
                    setTimeout(function () {
                        tmenu.removeClass("apps-subMenu-lv1-mouseenter").find(".apps-subMenu-icon").css("background-image", "url(" + tmenu.find(".apps-subMenu-icon").attr("normalicon") + ")")
																							       .css("background-repeat", "no-repeat")
																							       .css("background-position", "" + tmenu.find(".apps-subMenu-icon").attr("xNormalCoordinate") + " " + tmenu.find(".apps-subMenu-icon").attr("yNormalCoordinate"));
                        tmenu.find(".apps-subMenus-lv2").css("display", "none");
                        tmenu.find(".apps-subMenus-lv2-arrow1").css("display", "none");
                        tmenu.find(".apps-subMenu-icon-showmenus").css("display", "");
                    }, 200);
                });
            } else {
                submenu.mouseenter(function (e) {
                    var tmenu = $(this);
                    setTimeout(function () {
                        if (!tmenu.hasClass("apps-subMenu-lv1-selected") && e.eventPhase != 3) {
                            tmenu.find(".apps-subMenu-icon").css("background-image", "url(" + tmenu.find(".apps-subMenu-icon").attr("hoverIcon") + ")")
															.css("background-repeat", "no-repeat")
															.css("background-position", "" + tmenu.find(".apps-subMenu-icon").attr("xHoverIconCoordinate") + " " + tmenu.find(".apps-subMenu-icon").attr("yHoverIconCoordinate"));
                            tmenu.addClass("apps-subMenu-lv1-selected");
                        }
                    }, 200);

                });
                submenu.mouseleave(function () {
                    var tmenu = $(this);
                    setTimeout(function () {
                        tmenu.find(".apps-subMenu-icon").css("background-image", "url(" + tmenu.find(".apps-subMenu-icon").attr("normalicon") + ")")
													    .css("background-repeat", "no-repeat")
													    .css("background-position", "" + tmenu.find(".apps-subMenu-icon").attr("xNormalCoordinate") + " " + tmenu.find(".apps-subMenu-icon").attr("yNormalCoordinate"));
                        tmenu.removeClass("apps-subMenu-lv1-selected");
                    }, 200);
                });
                submenu.on("click", function (e) {
                    var tmenu = $(this);
                    tmenu.addClass("apps-subMenu-lv1-selected").find(".apps-subMenu-icon").css("background-image", "url(" + tmenu.find(".apps-subMenu-icon").attr("hoverIcon") + ")")
																						  .css("background-repeat", "no-repeat")
																						  .css("background-position", "" + tmenu.find(".apps-subMenu-icon").attr("xHoverIconCoordinate") + " " + tmenu.find(".apps-subMenu-icon").attr("yHoverIconCoordinate"));
                    tmenu.find(".apps-subMenus-lv2").css("display", "");
                    tmenu.find(".apps-subMenus-lv2-arrow1").css("display", "");
                    tmenu.find(".apps-subMenu-icon-showmenus").css("display", "none");
                    if (tmenu.find(".apps-subMenus-lv2").length === 0) {
                        setTimeout(function () {
                            tmenu.find(".apps-subMenu-icon").css("background-image", "url(" + tmenu.find(".apps-subMenu-icon").attr("normalicon") + ")")
															.css("background-repeat", "no-repeat")
															.css("background-position", "" + tmenu.find(".apps-subMenu-icon").attr("xNormalCoordinate") + " " + tmenu.find(".apps-subMenu-icon").attr("yNormalCoordinate"));
                            tmenu.removeClass("apps-subMenu-lv1-selected");
                        }, 1000);
                    } else {
                        setTimeout(function () {
                            tmenu.removeClass("apps-subMenu-lv1-selected").find(".apps-subMenu-icon").css("background-image", "url(" + tmenu.find(".apps-subMenu-icon").attr("normalicon") + ")")
																									 .css("background-repeat", "no-repeat")
																									 .css("background-position", "" + tmenu.find(".apps-subMenu-icon").attr("xNormalCoordinate") + " " + tmenu.find(".apps-subMenu-icon").attr("yNormalCoordinate"));
                            tmenu.find(".apps-subMenus-lv2").css("display", "none");
                            tmenu.find(".apps-subMenu-icon-showmenus").css("display", "");
                        }, 3000);
                    }
                    e.stopPropagation();
                });
            }
            $(submenu.parents()[0]).click(function (e) {
                $(e.target).find("li.apps-subMenu-lv1").each(function () {
                    if ($(this).find(".apps-subMenu-lv2").length == 0) {
                        setTimeout(function () {
                            submenu.removeClass("apps-subMenu-lv1-selected").find(".apps-subMenu-icon").css("background-image", "url(" + tmenu.find(".apps-subMenu-icon").attr("normalicon") + ")")
																								       .css("background-repeat", "no-repeat")
																								       .css("background-position", "" + tmenu.find(".apps-subMenu-icon").attr("xNormalCoordinate") + " " + tmenu.find(".apps-subMenu-icon").attr("yNormalCoordinate"));
                            submenu.find(".apps-subMenus-lv2").css("display", "none");
                            submenu.find(".apps-subMenus-lv2-arrow1").css("display", "none");
                            submenu.find(".apps-subMenu-icon-showmenus").css("display", "");
                        }, 200);
                    }
                });
            });
            createSubMenus_Lv2(submenu, menusInfo[i].Menus, i);
        }
    }
}
function createSubMenus_Lv2(parentMenu, menusInfo, order) {
    if (typeof (menusInfo) !== 'undefined' && menusInfo != null) {
        parentMenu.append("<div class='apps-subMenus-lv2-arrow1'></div>")
				  .find(".apps-subMenus-lv2-arrow1").css("display", "none");
        var submenus = $("<ul class='apps-subMenus-lv2' style='width:245px ; top:0px; display: none;'></ul>");
        for (var i = 0; i < menusInfo.length; i++) {
            var submenu;
            if (menusInfo[i].OpenInNewTab != undefined && menusInfo[i].OpenInNewTab) {
                submenu = $("<li class='apps-subMenu-lv2'><a target='_blank' href='" + menusInfo[i].Link + "' >" + menusInfo[i].Name + "</a></li>");
                submenu.click(function (e) {
                    e.stopPropagation();
                });
            }
            else {
                submenu = $("<li class='apps-subMenu-lv2'><a href='" + menusInfo[i].Link + "' >" + menusInfo[i].Name + "</a></li>");
            }

            submenu.mouseenter(function () {
                $(this).find(".apps-subMenus-lv3").css("display", "");
            });
            submenu.mouseleave(function () {
                $(this).find(".apps-subMenus-lv3").css("display", "none");
            });
            createSubMenus_Lv3(submenu, menusInfo[i].Menus);
            submenus.append(submenu);
        }
        parentMenu.append(submenus);
    }
}
function createSubMenus_Lv3(parentMenu, menusInfo) {
    if (typeof (menusInfo) !== 'undefined' && menusInfo != null) {
        var submenus = $("<ul class='apps-subMenus-lv3' style='display: none;'></ul>");
        for (var i = 0; i < menusInfo.length; i++) {
            var submenu = $("<li class='apps-subMenu-lv3'><a href='" + menusInfo[i].Link + "' >" + menusInfo[i].Name + "</a></li>");
            submenus.append(submenu);
        }
        parentMenu.append(submenus);
    }
}
//end Init Mega Menu
