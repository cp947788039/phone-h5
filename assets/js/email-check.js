$(function() {
    function EmailCheck(opts) {
        this.el = opts.el;
        this.curClass = opts.curClass;
    }
    EmailCheck.prototype = {
        _emailFun: function(_email, _index, _obj) {
            var format = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            e = this;
            if (!_email.match(format)) {
                e._addFun(_index, _obj);
                return false;
            } else {
                e._removeFun(_index, _obj);
                return true;
            }
        },
        _telFun: function(_tel, _index, _obj) {
            var format = /^[0-9]*$/,
            e = this;
            if (!_tel.match(format)) {
                e._addFun(_index, _obj);
                return false;
            } else {
                e._removeFun(_index, _obj);
                return true;
            }
        },
        _addFun: function(_index, _obj) {
            var e = this;
            _obj.eq(_index).addClass(e.curClass);
            _obj.eq(_index).val('Input is wrong, please input again!');
        },
        _removeFun: function(_index, _obj) {
            var e = this;
            _obj.eq(_index).removeClass(e.curClass);
        },
        _checkFun: function(_index, _obj) {
            var e = this;
            if (_obj.eq(_index).attr('name') == 'email') {
                var _email = _obj.eq(_index).val();
                e._emailFun(_email, _index, _obj);
            }
            if (_obj.eq(_index).attr('name') == 'telephone') {
                var _tel = _obj.eq(_index).val();
                e._telFun(_tel, _index, _obj);
            }
        },
        _submitFun: function(_obj, _valArr, _prevArr) {
            var e = this,
            _valArr = [],
            _prevArr = [];
            _obj.on('click',function(){
                var _value = $(this).val();
                if(_value == 'Input is wrong, please input again!'){
                    $(this).val('').removeClass(e.curClass);
                }
            });
            _obj.parent().parent().next().on('click',function(event) {
                _obj.each(function(_index) {
                    var _value = $(this).val();
                    _valArr.push(_value);
                    if (_value == '' ||  _value == 'Input is wrong, please input again!') {
                        e._addFun(_index, _obj);
                    } else {
                        e._checkFun(_index, _obj);
                        _value = $(this).val();
                        _valArr.push(_value);
                    }
                });
                for (var i = 0; i < _valArr.length; i++) {
                    if (_valArr[i] == '' || _valArr[i] == 'Input is wrong, please input again!') {
                        _valArr = [];
                        return false;
                    }
                };
                _obj.parents('form').submit();
            });
        },
        _init: function() {
            var e = this,
            valArr1 = [],
            prevArr1 = [];
            e._submitFun(e.el, valArr1, prevArr1);
        }
    };
    new EmailCheck({
        el: $('.contact-form .input-style'),
        curClass: 'color-style'
    })._init();
    function Letter(opts){
        this.el = opts.el;
        this.curClass = opts.curClass;
        this.flag = false;
    }
    Letter.prototype = {
        _emailFun: function(_email,_obj) {
            var format = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                e = this;
            if (!_email.match(format)) {
                e._addFun(_obj);
                e.flag = false;
            } else {
                e._removeFun(_obj);
                e.flag = true;
            }
        },
        _addFun: function(_obj) {
            var e = this;
            _obj.addClass(e.curClass);
            _obj.val('Email Input error, please input again!');
        },
        _removeFun: function(_obj) {
            var e = this;
            _obj.removeClass(e.curClass);
        },
        _submitFun: function(){
            var e = this;
            e.el.unbind().on('click',function(){
                var _value = $(this).val();
                if(_value == 'Email Input error, please input again!'){
                    $(this).val('');
                    $(this).removeClass(e.curClass);
                }
            });
            e.el.parent().parent().next().unbind().on('click',function(){
                var _obj = $(this).prev().children().children(),
                    _value = _obj.val();
                if (_value == 'Enter your email' || _value == 'Email Input error, please input again!') {

                    e._addFun(_obj);
                } else {
                    e._emailFun(_value,_obj);
                }
                if(e.flag){
                    e._spreadPopuUpAjaxSubmit();
                    $(this).parents('#SpreadfrmSample').submit();
                    $('.flow-layer-box').hide();
                }
            });
        },
        _spreadPopuUpAjaxSubmit: function(){
            var e = this,
                dataPara = e._spreadGetFormJson();
            $.ajax({
                async: false,
                url: 'http://subscriber.rspread.com/SubscribeFormAsyn.aspx',
                type: 'get',
                dataType: "jsonp",
                data: dataPara,
                jsonp: "callbackparam",
                jsonpCallback: "success_jsonpCallback",
                success: e._spreadPopuUpAjaxCallback
            });
        },
        _spreadGetFormJson: function(){
            var paraJson = {};
            var a = $("#SpreadfrmSample").contents().find("input").serialize();
            return a;
        },
        _layerBox: function(){
            var e = this;
            var _href = window.location.href;
            var hideFun = function(_obj){
                _obj.on('click',function(){
                    $(this).parents('.flow-layer-box').fadeOut();
                });
            }
            if(_href.indexOf('iii') < 0){
                $('.flow-layer-box').show();
            }
            hideFun($('.flow-layer-box > em'));
            hideFun($('.flow-layer-wrap .close-btn'));
        },
        _init: function() {
            var e = this;
            e. _submitFun();
            e._layerBox();
        }
    }
    new Letter({
        el: $('.letter-style'),
        curClass: 'color-style'
    })._init();
});