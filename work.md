* Button在table-cell或者div里面怎么定位
* 一行button和字怎么对齐

* 无时区信息时候，firefox和chrome，ie处理有区别

```
IE title changes to <afterHash> if the page has a url with '#' , and has flash/swf embedded in it


Ng-cloak, 加载页面的时候由于js里面包含的css没有加载进来，导致angular js没算完的时候，导航条会全部显示，然后隐藏，有闪烁的现象。把ng-cloak样式加入css

Java 后台传到前台的id是long型的值，超过js能接收的Number类型的值，精度丢失，id匹配不上

var d1 = new Date(2009,0,1);
var d2 = new Date(2009,6,1);
var Time = d1.getTimezoneOffset() != d2.getTimezoneOffset();
console.log(d1.getTimezoneOffset());
console.log(d2.getTimezoneOffset());


```

```
针对button名字过长，超过包含块，使用white-space： normal

Width: auto  width: 100%
http://stackoverflow.com/questions/7245896/link-using-z-index-cant-be-clicked-even-though-its-on-top-in-both-firefox-i

z-index 要在position不是static的时候

IE9 event.target, ff event.currentTarget

The textContent property is "inhertied" from the Node interface of the DOM Core specification. The text property is "inherited" from the HTML5 HTMLAnchorElement interface and is specified as "must return the same value as the textContent IDL attribute".

IE9 使用background-position-x 和 background-position-y，标准的是background-position 


```

```
Jquery 1.11.1的IE9下，
只有$(‘body’).css(‘backgroundPosition’)有用，‘background-position’失效，
$('body').animate({'background-position': '100%'});
	只有background-position有用

function capitalizeFirstLetterWords(str) {
    str = str.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
        return letter.toUpperCase();
    });
    return str;
}

http://stackoverflow.com/questions/9648007/how-to-have-2-floating-divs-have-the-same-height
http://stackoverflow.com/questions/2331717/css-how-to-make-left-float-div-to-adjust-height-dynamically

http://matthewjamestaylor.com/blog/equal-height-columns-cross-browser-css-no-hacks

HTML Entities


左边div 和右边div同高度

Display： table 外层div

Display: cell 内层左右div

```

```
word-break: break-all; 
for ie

word-wrap: break-word;


在这两个浏览器中，有两个嵌套关系的div，如果外层div的父元素padding值为0，那么内层div的margin-top或者margin-bottom的值会“转移”给外层div。

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
</head>

<body>
<div style="width:300px; height:100px">上部层</div>

<div style=" width:300px; height:300px;overflow:hidden "> <!--父层-->
     <div style="margin:50px; width:200px; height:200px"">子层</div>
</div>

</body>
</html>
原因：盒子没有获得 haslayout 
 https://developer.mozilla.org/en-US/docs/Web/CSS/margin_collapsing
造成 margin-top无效
 
解决办法：
```

```
在父层div加上：overflow:hidden；
2、把margin-top外边距改成padding-top内边距 ；
3、父元素产生边距重叠的边有不为 0 的 padding 或宽度不为 0 且 style 不为 none 的 border。
    父层div加： padding-top: 1px;
4、让父元素生成一个 block formating context，以下属性可以实现
    * float: left/right
    * position: absolute
    * display: inline-block/table-cell(或其他 table 类型)
    * overflow: hidden/auto
   父层div加：position: absolute;

--------------------------------------------------------------

div之间的空隙
http://stackoverflow.com/questions/19038799/why-is-there-an-unexplainable-gap-between-these-inline-block-div-elements
Where This Problem Comes From
This problem can arise when a browser is in "quirks" mode. In this example, changing the doctype from:
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
to 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Strict//EN">
will change how the browser deals with extra whitespace.
In quirks mode, the whitespace is ignored, but preserved in strict mode.
References:
html doctype adds whitespace?
https://developer.mozilla.org/en/Images,_Tables,_and_Mysterious_Gaps 


json返回类似150414013801365576 的number值，通过string.parseJSON精度丢失，暂时用string类型来代替

```
