$(function(){
	var ndMore = $("section.more");
	var ndMoreImage = $("section.more img");
	var currentData = document['shakeQuery'];
	var ndResult = $('section.result');
	var ndToTop = $("#backtotop");
	var ndDocument = $(document);
	var ndWindow = $(window);
	
	var isDisplay = false;
	$(window).resize(onresize);
	onresize(); //启动时自动调用一遍

	function onresize(){
		var wWidth = ndWindow.width();
		if ( wWidth >= 1100) {
			ndToTop.css('left', 960 + 10 + (wWidth - 960) / 2 + 'px');
		} else {
			ndToTop.css('left',  (wWidth - 50) + 'px');
		}
	}

	ndWindow.bind('scroll', function(){
		if (ndWindow.scrollTop() > 300) {
			!isDisplay && ndToTop.fadeIn(2000);
			isDisplay = true;
		} else {
			if (!isDisplay) return;
			isDisplay = false;
			ndToTop.fadeOut(1000);
		}
	});

	ndToTop.click(function(){
		ndWindow.scrollTop(0);
	});
	var isLoading = false;
	ndMore.length && ndMore.click(function(e) {
		if (isLoading) return;
		isLoading = true;
		ndMoreImage.fadeIn(500);
		var args = ['grep_filter=', encodeURIComponent(currentData['grep_filter']), '&query_type=', currentData['query_type'],
							'&start=' , currentData['end'], '&cs=' , (currentData['cs'] - 0) + currentData['count']/*30*/].join('');
		$.receiveJSON('/query', args, function(res) {
			ndMoreImage.fadeOut(500);
			isLoading = false;
			if (res.status) {
				setResult(res.data);
			} else {
				alert(res.msg);
			}
		});
	});
	function setResult(info) {
		currentData = info;
		data = info.data;
		if (info.complete) {
			alert("没有更多数据了");
			ndMore.fadeOut(300);
			return;
		}
		if (!info.complete && data.length == 0) {
			ndMore.click(); //再次请求
			return;
		}
		var list = [];
		var i = 0;
		var resultTmpl = new Xtemplate('result-template');
		for(i =0 ; i < data.length; i++) {
			list.push(["<li><span class='yui3-u-1-8 word'>", data[i]['word'], "</span><span class='yui3-u-1-6 py'>", 
					data[i]['std_py'], "</span><span class='yui3-u-2-3'>",  data[i]['definition'], "</span></li>"].join(''));
		}
		resultTmpl.setVar({'range': [info.cs, '-', (info.cs - 0) + (info.count - 1)].join(''), 
			'list': list.join('\n')});
		ndResult.append($(resultTmpl.getText()))
	}
});
