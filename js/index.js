/**
 * Created by Administrator on 2017/7/11.
 */
$(function(){
//   轮播图
    banner();
//  产品
    initTab();
//    初始化工具提示
    $("[data-toggle='tooltip']").tooltip();
});

//  轮播图
var banner = function(){
    /*
     * 1.动态渲染
     * 1.1 数据  图片地址（两种pc m）数组  模拟
     * 1.2 根据数据和当前设备宽度  转换成html格式的代码
     * 1.3 渲染到页面
     * 2.测试功能
     * 2.1 根据浏览器尺寸的变化对应不同设备的宽度重新渲染
     * 3.移动端手势切换
     * */
//    模拟数据
    var data = [
        {
            pcUrl : "images/slide_01_2000x410.jpg",
            mUrl : "images/slide_01_640x340.jpg"
        },
        {
            pcUrl : "images/slide_02_2000x410.jpg",
            mUrl : "images/slide_02_640x340.jpg"
        },
        {
            pcUrl : "images/slide_03_2000x410.jpg",
            mUrl : "images/slide_03_640x340.jpg"
        },
        {
            pcUrl : "images/slide_04_2000x410.jpg",
            mUrl : "images/slide_04_640x340.jpg"
        },
    ];
    /*动态渲染*/
    var render = function(){
        /*判断当前设备*/
        var isMobile = $(window).width()<768? true : false;
        /*那些代码是动态的？？？ 点盒子和图片盒子*/
        var $pointBox = $(".carousel-indicators");
        var $imgBox = $(".carousel-inner");
        /*html代码生成*/
        var pointHtml = "";
        var imgHtml = "";
        /*根据数据和设备*/
        $.each(data,function(i,item){
         pointHtml += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="'+(i==0? 'active' :'')+'"></li>';
         imgHtml += '<div class="item '+(i==0? 'active':'')+'">';
         /*拼接移动端的html*/
         if (isMobile){
             imgHtml += '<a href="javascriptL:;" class="m_imgBox hidden-lg hidden-md hidden-sm"><img src="'+item.mUrl+'" alt="..."></a>'
         }
         /*拼接pc端的html*/
         else {
             imgHtml += '<a href="javascript:;" class="pc_imgBox hidden-xs" style="background-image: url('+item.pcUrl+')"></a>'
         }
         imgHtml += '</div>';
        });
         $pointBox.html(pointHtml);
         $imgBox.html(imgHtml);
    };
    //测试功能
    $(window).on('resize',function(){
        render();
    }).trigger('resize');

//    触摸屏
    var startX = 0;
    var distance = 0;
    var isMove = false;

    $(".wjs_banner").on("touchstart",function(e){
        startX = e.originalEvent.touches[0].clientX;
    }).on("touchmove",function(e){
        var moveX = e.originalEvent.touches[0].clientX;
        distance = moveX - startX;
        isMove = true;
    }).on("touchend",function(e){
        if (isMove && Math.abs(distance)>50){
            if (distance>0){
                $(".carousel").carousel('prev');
            }else {
                $(".carousel").carousel('next');
            }
        }
         startX = 0;
         distance = 0;
         isMove = false;
    });
}


/*======================产品========================*/
var initTab = function(){
    var $parentBox = $(".nav-tabs-parent");
    var $childBox = $parentBox.children();

    var width = 0;
    $childBox.find("li").each(function(){
        width += $(this).outerWidth(true);
    });
    $childBox.width(width);
    new IScroll(".nav-tabs-parent",{
        scrollX:true,
        scrollY:false
    });
    document.addEventListener("touchmove",function(e){
        e.preventDefault();
    });
};