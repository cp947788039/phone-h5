$(function(){
    var _isPcFun = function(){
        var userAgentInfo = navigator.userAgent,
            Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"),
            flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false; break;
            }
        }
        return flag;
    }
    function phoneMenu(opts){
        this.el=opts.el;
        this.closeBtn=opts.closeBtn;
        this.nav=opts.nav;
        this.phoneSon = opts.phoneSon;
        this.sonNav = opts.sonNav;
        this.sonClose = opts.sonClose;
        this.curClass=opts.curClass;
    }
    phoneMenu.prototype={
        _phoneNavShow:function(){
            var e=this;
            e.el.on('click',function(){
                e.nav.addClass(e.curClass);
            });
            e.nav.children('i').on('click',function(){
                $(this).parent().removeClass(e.curClass);
            });
        },
        _tabFun: function(_obj) {
            var e = this,
                _url = location.href;
                console.log(_url)
            if(_url.indexOf('ii')>0){
                var _index = _url.split('=')[1];
                _obj.children().eq(0).find('li').eq(_index).addClass(e.curClass).siblings().removeClass(e.curClass);
                _obj.children().eq(1).children().eq(_index).show().siblings().hide();
                _obj.children().eq(0).find('li').on('click', function() {
                    var curIndex = $(this).index();
                    $(this).addClass(e.curClass).siblings().removeClass(e.curClass);
                    _obj.children().eq(1).children().eq(curIndex).show().siblings().hide();
                });
            }else{
                _obj.children().eq(0).find('li').eq(0).addClass(e.curClass);
                _obj.children().eq(1).children().eq(0).show();
                _obj.children().eq(0).find('li').on('click', function() {
                    var curIndex = $(this).index();
                    $(this).addClass(e.curClass).siblings().removeClass(e.curClass);
                    _obj.children().eq(1).children().eq(curIndex).show().siblings().hide();
                });
            }
            
        },
        _submit: function(_subBtn){
            _subBtn.on('click',function(){
                $(this).next().fadeIn();
                setTimeout(() => {
                    $(this).next().fadeOut();
                },1000);
            })
        },
        _init:function(){
            var e=this;
            e._phoneNavShow();
            e._tabFun($('.main-tab'));
            e._submit($('.submit-btn'));
        }
    }
    new phoneMenu({
        el:$('.menu-icon'),
        nav:$('.flow-menu-box'),
        curClass:'active'
    })._init();
    /*(function(){
        var $backToTopTxt = "", $backToTopEle = $('<div class="backToTop"></div>').appendTo($("body"))
            .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
                $("html, body").animate({ scrollTop: 0 }, 120);
        }), $backToTopFun = function() {
            var st = $(document).scrollTop(), winh = $(window).height();
            (st > 50)? $backToTopEle.show(): $backToTopEle.hide();   
        };
        $(window).bind("scroll", $backToTopFun);
        $(function() { $backToTopFun(); });
    })();*/
});