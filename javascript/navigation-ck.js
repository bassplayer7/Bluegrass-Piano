/**
 * Created by jessemaxwell on 3/1/14.
 */var Navigation=function(){var e=this,t=$("nav.page-links"),n=$("#underline"),r=$(".destination"),i=[],s=$(".inner"),o=$("svg.menu-icon"),u={allow:!0,reallow:function(){u.allow=!0},delay:100};e.initUnderline=function(){var e=t.find("li:first-child").width(),r=t.find("li:first-child").position().left;n.width(e).css("left",r).css("display","block")};e.setupNavItems=function(){for(var e=0,n=r.length;e<n;e++)t.find("a")[e].hash.substr(1)===r[e].id&&i.push(Math.round(r.eq(e).position().top))};e.moveUnderline=function(){if(u.allow){var s=$(window).scrollTop()+t.height();for(var o=0,a=r.length;o<a;o++){if(s<i[1]){e.initUnderline();return}if(s>=i[i.length-1]){n.width(t.find("li").eq(i.length-1).width()).css("left",t.find("li").eq(i.length-1).position().left);return}if(s>=i[o]&&s<=i[o+1]){n.width(t.find("li").eq(o).width()).css("left",t.find("li").eq(o).position().left);return}}u.allow=!1;setTimeout(u.reallow,u.delay)}};e.smallNav=function(){o.on("click",function(){s.toggleClass("menu-open");e.controlNav();return!1});t.find("a").click(function(){s.removeClass("menu-open")});s.hammer().on("swiperight",e.handleSwipe);s.hammer().on("swipeleft",e.handleSwipe)};e.handleSwipe=function(t){if(t.type==="swiperight"){s.addClass("menu-open");e.controlNav()}else s.removeClass("menu-open");return!1};e.controlNav=function(){s.hasClass("menu-open")&&s.on("click",function(){s.removeClass("menu-open");$(this).off("click");return!1})};e.load=function(){if($(window).width()>=800){e.initUnderline();e.setupNavItems();$(window).on("resize",e.initUnderline);$(window).scroll(e.moveUnderline)}else e.smallNav()}},navigation=new Navigation;$(document).ready(navigation.load);