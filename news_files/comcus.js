$(function(){
	$(".search-submit").click(function(event){
		$(this).removeAttr("name");
		event.preventDefault();
		var val = $.trim($(".search-title").val());
		//if(val!==""){
			$(".wp-search").find("form").submit();
			$(".search-title").val('');
		//}else{
		//	alert("请输入关键词");
		//}
		//return false;
	});
	
	$("body,html").click(function(){
		$(".search-window").animate({"width":"34px"});
		$(".searchbtn").stop(true,true).fadeIn();
	});
	
	$(".searchbtn").click(function(){
		$(this).stop(true,true).fadeOut();
		$(".search-window").stop(true,true).animate({"width":"160px"});
		return false;
	});	
	
	$(".search-input").click(function(){
		return false;
	});	
	
	//实现锚点的带动画效果
	$(".wp-menu a").each(function(){
		$(this).click(function(){
			// if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var $target = $(this.hash);
				// $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
				$target = $target.length && $target;
				if ($target.length) {
				   var targetOffset = $target.offset().top ;
					$('html,body').animate({scrollTop: targetOffset},300);
				   return false;
			   }
		   //}
		});
	});	
	
	//onLoad="scrollTo(0,0)"
	setTimeout(function(){
		if( (/^#/gi).test(location.hash) ){
			var $target = $(location.hash);
			$target = $target.length && $target;
			if ($target.length) {
			   var targetOffset = $target.offset().top;
				$('html,body').animate({scrollTop: targetOffset},10);
		   }
		}
	},100);

	
	/*媒体链接*/
	$(".shares li").each(function(){
		$(this).children("a").hover(function(){
			$(this).parent().find(".con").stop(true,true).fadeIn();			
		},function(){
			$(this).parent().find(".con").stop(true,true).fadeOut();
		});
	});	
	
	window.onscroll = function(){
		var topScroll = getScrollTop();//滚动的距离，距离顶部的距离
		var bignav = document.getElementById('header');
		if (topScroll > 100){ 
$("#header").addClass('add');
			bignav.style.position = 'fixed';
			bignav.style.top = '0';
			bignav.style.zIndex = '1000000';
		} else {
$("#header").removeClass('add');
			bignav.style.position = 'static';
		}
	};
	function getScrollTop(){
		var scrollTop;
		if(typeof window.pageYOffset != 'undefined'){
			scrollTop = window.pageYOffset;
		}else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')        {
			scrollTop = document.documentElement.scrollTop;
		}else if(typeof document.body != 'undefined'){
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	}
	
});