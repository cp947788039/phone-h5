new function (){
   	var _self = this;
   	var _win = 0;
    _self.width = 750;
    _self.fontSize = 100;
    _self.fun = function(){
    	_win = document.getElementsByTagName("html")[0].offsetWidth;
    	if(_win <= 750){
	    	_self.widthProportion = function(){
		   	var p = _win/_self.width;
		   		return p<0.427?0.427:p;
		   	};
		    _self.changePage = function(){
		       document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px!important");
		    }
		    _self.changePage();
	    }
    }
    _self.fun();
    window.addEventListener("resize",function(){
    	_self.fun();
    },false);
};