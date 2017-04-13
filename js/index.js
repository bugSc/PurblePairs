// 游戏规则介绍界面
    var $rule=$("#rule");
    var $ruleImg=$("#rule>img:nth-of-type(2)");
// 游戏进入开始界面
    var $crossing=$("#crossing");
$ruleImg.on("touchstart",function(){
    $rule.hide();
    $crossing.slideDown(500,"easeOutBounce");
});
// 进入游戏
    var $start=$("#crossing>img:nth-of-type(2)");
    var $first=$("#first");
    var $wrap=$(".wrap");
$start.on("touchstart",function(){
    $crossing.hide();
    $first.slideDown(500,"easeOutBounce");
    $wrap.css({
        "background-color":"rgba(0,0,0,0)"
    })
    $firstImg.on("touchstart",function(){
        $first.hide();
    })
})

// 游戏挑战失败
    var $firstImg=$("#first>img");
    // 点击翻转图片
    var $oneImg=$("ul>li>img:nth-of-type(1)");

    var $imgs=$("ul>li>img");

    var $lis=$("ul>li");
    // 游戏时间
    var $time=$("#article>div>p"); 
    var $pat=$("#pat");
// 挑战失败/成功关卡图片
var losesuccceArr=["images/lose.png","images/next.png","images/second.png","images/third.png"];
    // 创建图片数组
var imageArr1=["goreTex1.png","goreTex2.png","goreTex3.png","goreTex1.png","goreTex2.png","goreTex3.png"];

$oneImg.on("touchstart",function(){
    $(this).css({"transform":"rotateY(180deg)"}).next().css({"transform":"rotateY(0deg)"});
});

var timeTimer=null; 
var alltimeTimer=null;
var spanPercent=100;
var secondTime=10;
var b=0;
var c=0;
var alltime=0;
// 开始游戏
$firstImg.on("touchstart",function(){
        // 启动游戏
        $pat.slideDown(500,"easeOutBounce"); 
        var $ph=1;
        timeTimer=setInterval(function(){
            if($ph>=100){
                $(".loseFirst").slideDown(500,"easeOutBounce")
                $(".loseFirst img").attr("src","images/lose.png");
                clearInterval(timeTimer);
            }
            spanPercent-=1;
            b+=1;
            c++;
            // 记录时间份额数
            if(c==10){
                secondTime--;
                $(".ten").text(secondTime);
                c=0;
            };
            // 记录时间总进度
            if(b==1){
                $(".theTime").text(spanPercent+"%");
                b=0;
            }
            $time.css({
                "left":-$ph+"%"
            })
            $ph++;
        },120);
    // 计算总时间
    alltimeTimer=setInterval(function() {
        alltime++;
    },1000)
})
// 创建一个空字符串保存被点击的图片地址
var src="";
// 记录当前页面图片的被翻转数目
var a=0;
// 保存上一次被点击的li
var liIndex=10000;
// 记录过关卡数
var customs="one";
// 记录消失的牌数
var number=0;
// 判断是否已经全部关卡都挑战成功
var bol=false;
// 点击翻牌事件
// 关卡一
randomFn(6);
$lis.on("touchstart",function(){
    var children=$(this).children();
    checkFn(children);
});
$(".loseFirst>img").on("touchstart",successAndFailFn);
// 挑战失败或成功函数
function successAndFailFn(){
    // 创建一个空字符串保存被点击的图片地址
    src="";
    // 记录当前页面图片的被翻转数目
    a=0;
    // 记录消失的牌数
    number=0;
    // 保存上一次被点击的li
    liIndex=10000;
    // 时间进度条
    $ph=1;

    spanPercent=100;
    secondTime=10;
    b=0;
    c=0;
    $lis.css({"visibility":"visible"});
    $lis.children("img:nth-of-type(1)").css({"transform":"rotateY(0deg)"});
    $lis.children("img:nth-of-type(2)").css({"transform":"rotateY(180deg)"});
        // 失败
        $pat.css("display","none");
        $(".loseFirst").css("display","none");
        // 通关
        // 关卡二
        if($(this).attr("src")=="images/next.png"&&customs=="two"){
            // 第二关界面
            $firstImg.attr("src",losesuccceArr[2]);
        }else if($(this).attr("src")=="images/next.png"&&customs=="three"){
            // 第三关界面
            $firstImg.attr("src",losesuccceArr[3]);
        }
        $("#first").slideDown(500,"easeOutBounce");
        // 第二关 内容
        // 改变过关数目
        if(customs=="two"){
            console.log("还在第二关")
            if (imageArr1.length<12) {
                    for(var i=4;i<=6;i++){
                    imageArr1.push("goretex"+i+".png");
                    imageArr1.push("goretex"+i+".png");
                }
            };
            randomFn(12);
            $(".oneone").css({"visibility":"visible"});
            $("ul>li").css({"width":"85%"});
            $lis.css({"width":"30%","height":"25%"});
            $(".second").css({'display':"inline-block","visibility":"visible"})
        }else if(customs=="three"){
            if (imageArr1.length<19) {
                for(var i=7;i<=10;i++){
                    imageArr1.push("goretex"+i+".png");
                    imageArr1.push("goretex"+i+".png");
                }
            }
            randomFn(20);
            $lis.css({'display':"inline-block",'visibility':"visible"});
            $("ul>li").css({"width":"98%"});
            $lis.css({"width":"22%","height":"20%"});
        }
}         
// 游戏点击翻牌函数
function checkFn(element){
    if(liIndex==element.parent().index()){
        console.log("不能点击一样的图片");
        return;
    }
        ++a;
        if (a>=3){
            $("ul>li>img:nth-child(odd)").css("transform","rotateY(0deg)");
            $("ul>li>img:nth-child(even)").css("transform","rotateY(180deg)");
            // 记录点击图片数目
            a=1;
        }            
        element.eq(0).css("transform","rotateY(180deg)");
        element.eq(1).css("transform","rotateY(0deg)");
        if (a==2){
            if (src==element.eq(1).attr("src")){
                // console.log("图片一样");
                element.parent().css("visibility","hidden");
                $("ul>li").eq(liIndex).css("visibility","hidden");
                src="";
                // 判断牌是否已经全部消失
                number++;
                console.log(number)
                if(number>=imageArr1.length/2){
                    setTimeout(function(){
                        if (bol){
                            clearInterval(alltimeTimer);
                            $(".pass span").text(alltime);
                            $(".pass").css("display","block");

                            $(".pass>div").on("touchstart",function(){
                                $crossing.slideDown(500,"easeOutBounce");
                            })
                            return;
                        };
                        $(".loseFirst img").attr("src","images/next.png");
                        $(".loseFirst").css("display","block");
                        if(customs=="one"){
                            customs="two";
                        }
                        else if(customs=="two"){
                            customs="three";
                            bol=true;
                        }
                        // 创建一个空字符串保存被点击的图片地址
                        src="";
                        // 记录当前页面图片的被翻转数目
                        a=0 
                        // 保存上一次被点击的li
                        liIndex=10000;
                        // 重新计数
                        number=0;
                        clearInterval(timeTimer);
                    },1000)
                }
            }
        }
        // 记录点击的图片地址
        src=element.eq(1).attr("src");
        // 记录点击的li下标
        liIndex=element.parent().index();
}
//改变图片地址
function randomFn(max){
    // 创建一个空数组
    var arr=[];
    // 随机下标
    var num=parseInt(Math.random()*max);
    // .........改变地址.............
    for(var i=0; i<max; i++){
        // 遍历判断arr里面是否已经有num这个数字
        // 如果有的话，就再重新随机
        while(arr.indexOf(num)!=-1){
            num=parseInt(Math.random()*max);
            // 判断数组arr是否填满eleArr.length
            // 如果存满了数，就要删除一些数
        }
        arr.push(num);
        console.log(arr)
        $("#shot>li>img:nth-child(2)").eq(i).attr("src","images/"+imageArr1[num]);
    }
}