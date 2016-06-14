$(function(){
	var database=[];
	var makelist=function(){
		$('#divsonglist ul li ').empty();
		$.each(database,function(k,v){
		$('<li index="'+k+'" class="li"><strong class="music_name" title="'+v.title+'">'+v.title+'</strong>  <strong class="singer_name" title="'+v.artist+'">'+v.artist+'</strong> <strong class="play_time">'+v.duration+'</strong>  <div class="list_cp">  <strong class="btn_like" title="喜欢" name="" mid="004fQTu016b9W4"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong> <strong class="btn_fav" title="收藏到歌单"> <span>收藏</span> </strong>  <strong class="btn_del" title="从列表中删除"> <span>删除</span> </strong></li>').appendTo('#cc')
		$('#spansongnum1 span').text(database.length);
		})
	}
$.getJSON('./database.json').done(function(data){
	database=data;
	makelist();
})
/*界面变化*/

/*歌舞库*/
/*var musicku=[{name:"月亮代表我的心",src:"./musics/张国荣-月亮代表我的心.mp3",shichang:"00:04:06",laiyuan:"QQ音乐"},
{name:"时间煮雨",src:"./musics/郁可唯-时间煮雨.mp3",shichang:"00:04:07",laiyuan:"百度"},
{name:"小星星",src:"./musics/汪苏泷-小星星.mp3",shichang:"00:03:03",laiyuan:"QQ音乐"},
{name:"愿得一人心",src:"./musics/李行亮-愿得一人心.mp3",shichang:"00:04:37",laiyuan:"QQ音乐"},
{name:"光阴的故事",src:"./musics/黄晓明-光阴的故事.mp3",shichang:"00:03:33",laiyuan:"QQ音乐"}];*/
	var audio=$('audio').get(0);
	console.log(audio);
	/*暂停播放*/
	var bofang=function(){
		if(audio.paused===true){
		audio.play();
		}else{
		audio.pause();	
		}
	}
	$('#btnplay').on('click',function(){
			bofang();
	})
	audio.onplay=function(){
		$('#btnplay').removeClass('play_bt').addClass('pause_bt');
	}
	audio.onpause=function(){
		$('#btnplay').addClass('play_bt').removeClass('pause_bt');
	}
		/*声音的控制*/
		
		$('#spanvolume').on('click',function(e){
			var nowvolume = e.offsetX/$(this).width();
			 audio.volume=nowvolume;
			 $('#spanvolumebar').css('width', e.offsetX);
			 $('#spanvolumeop').css('left',e.offsetX)
			
		})
$('.player_bar').on('click',function(e){
	var vv=e.offsetX/$(this).width();
	audio.currentTime=vv;
	$('.spanprogress_op').css('left',e.offsetX);
	$('#spanplayer_bgbar').width(e.offsetX)
})
/*点击设计静音*/
	var nowvolume=audio.volume;
	$('#spanmute').on('click',function(){
		if(audio.volume===0){
			audio.volume=nowvolume;
		}else{
			audio.volume=0;
		}
	})
	$('#spanmute').on('click',function(){
		if(audio.volume===0){
			$(this).removeClass();
			$(this).addClass('volume_mute');
		}else{
			$(this).removeClass('volume_mute');
			$(this).addClass('volume_icon');
		}
	})
	/*进度条的设置*/
		 audio.ontimeupdate=function(){
		var jindu=((audio.currentTime/audio.duration).toFixed(2))*100+'%';
		$('#spanplayer_bgbar').css('width',jindu);
		$('#spanprogress_op').css('left',jindu);
	}
	/*音乐列表*/
 /*$(musicku).each(function(i,v){
$('#cc').append('<li index="i" class="li"><strong class="music_name" title="'+v.name+'">'+v.name+'</strong>  <strong class="singer_name" title="'+v.laiyuan+'">'+v.laiyuan+'</strong> <strong class="play_time">'+v.shichang+'</strong>  <div class="list_cp">  <strong class="btn_like" title="喜欢" name="" mid="004fQTu016b9W4"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong> <strong class="btn_fav" title="收藏到歌单"> <span>收藏</span> </strong>  <strong class="btn_del" title="从列表中删除"> <span>删除</span> </strong><li>')
})*/
/*歌曲的改变*/
/*var onsongchange=function(e){
	audio.play();
	$('#divsonglist li').removeClass('play_current')
	$(this).addClass('play_current')
}*/
var currentSong=0;
var onsongchange=function(){/*页面的改变*/
	audio.play();
$('#divsonglist li').removeClass('play_current')
.eq(currentSong).addClass('play_current');	
$('#music_name').text(database[currentSong].title);
$('.music_info_main .singer_name').text(database[currentSong].artist);
$('.play_date').text(database[currentSong].duration);
}
$('#divsonglist').on('click','li' ,function(){
	currentSong=$(this).index();
	audio.src=database[currentSong].filename;
	onsongchange();
})
$('#divsonglist').on('mouseenter mouseleave','li',function(){
	$(this).toggleClass('play_hover')
})
/*下一首*/
var xiayishou=function(){
	currentSong+=1;
	if(currentSong===database.length){
		currentSong=0;
	}
	audio.src=database[currentSong].filename;
}
$('#nextbt').on('click',function(){
	xiayishou();
	onsongchange();
})
/*上一首*/
$('.prev_bt').on('click',function(){

	currentSong-=1;
	if(currentSong===0){
		currentSong=database.length;
	}
	audio.src=database[currentSong].filename;
	onsongchange();
})
/*删除事件*/
$('#divsonglist').on('click','.btn_del',function(){
var todelete=$('#divsonglist .btn_del').index(this);
$.grep(database,function(v,k){
	return k!==todelete;
$(this).closets('li').remove();
$('#spansongnum1 span').text(database.length-1);
})
	return false;//阻止冒泡
})
/*没有选中歌曲的时候选第一首*/
	$('#cc li:first').addClass('play_current');
	/*收起列表*/
	var displaynone=function(){
	$('.play_list_fram').css('display','none');
	}
	var displayl=function(){
	$('.play_list_fram').css('display','block');
	}
$('.close_list').on('click',function(){
		displaynone();
})
$('#spansongnum1').on('click',function(){
	if($('.play_list_fram').css('display')=='block'){
		displaynone();
	}else{
		displayl();
	}
	})
/*循环*/
$('#btnPlayway').on('click',function(){
	$('#divselect').css('display','block');
})
$('#divselect').on('click','strong',function(){
	// var cname=$(this).attr();
	var rname=$(this).attr('class');
	$('#btnPlayway').attr('class',rname);
	$('#divselect').css('display','none');
})
/*显示歌词*/
var kuainone=function(){
	$('.lyrics_bg').css('display','none');
}
$('.btn_lyrics_disabled').on('click',function(){
	if($('.lyrics_bg').css('display')=='block'){
		kuainone();
	}else{
	$('.lyrics_bg').css('display','block')
	}
})
$('#closelrcpannel').on('click',function(){
	$(this).css('display','none')
	kuainone();
})
/*隐藏条*/
var flag=true;
$('.folded_bt').on('click',function(){
	console.log(9)
	displaynone();
	if(flag){
	$('.m_player').animate({left:'-540px'},500);
	 flag=false;
	}else{
	$('.m_player').animate({left:'0px'},500);	
	flag=true;
	}
	
})
/*自动播放下一首*/
audio.ended=function(){
	xiayishou();
	onsongchange();	console.log(currentSong)
}
})
