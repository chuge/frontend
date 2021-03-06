# frontend


##对自己的一些查漏补缺的记录

####工作上遇到的问题

##### JS
* new 构造函数
```
有些大侠们，总结了下 new+构造函数 至少做了4件事，基本思路如下：
这样按照第三点来说的话，会有MyClass.call(obj)发生，所以会执行Myclass().

// new Base();

// 1.创建一个空对象 obj
var obj = {};
// 2.设置obj的proto为原型
obj.proto = Base.prototype;
// 3.使用obj作为上下文调用Base函数
var ret = Base.call(obj);
// 4.如果构造函数返回的是原始值，那么这个返回值会被忽略，如果返回的是对象，就会覆盖构造的实例
if(typeof ret == 'object'){
return ret;
} else {
return obj;
}
```

* js老生常谈之this,constructor ,prototype
```
http://www.haorooms.com/post/js_constructor_pro
```
* ajax返回多次造成阻塞，单线程问题
```
具体明天去找代码
```
* id精度丢失问题
```
老系统原先id是后台java以long类型传递到前台，原先长度不到10位，后来重构后超出Number类型最大integer的值

Number.MAX_SAFE_INTEGER 
The maximum safe integer in JavaScript (2^53 - 1).

input: 12345678901234567
console result: 12345678901234568
超出16位或者大于最大值就会出现精度丢失。

解决：使用string来存储id
```

##### CSS
* 用float形式去流式布局，第一排如果高度不同，第二排可能就会不在同一条水平线上。
```
为每排加上一个包含的div，然后为div清除浮动。
```
* 左边高度和右边div高度一致。
```
由于不考虑ie9一下，所以，使用display： table, display: table-row , display:table-cell来解决
```
####五百米面试
* 对angular技术选型，为什么选择angular
* 不同浏览器兼容性遇到的问题


####工作上
* isArray
```
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
```

* arguments to arr
```
function turnToArr(arg) {
   return Array.prototype.slice.call(arg);
}
```

* Number.prototype.toFixed(), Numbser.prototype.toPrecision()

####来自其他
* html语义化  
```
 HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。
      绘画 canvas;
      用于媒介回放的 video 和 audio 元素;
      本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
      sessionStorage 的数据在浏览器关闭后自动删除;
      语意化更好的内容元素，比如 article、footer、header、nav、section;
      表单控件，calendar、date、time、email、url、search;
      新的技术webworker, websockt, Geolocation;

  移除的元素：

      纯表现的元素：basefont，big，center，font, s，strike，tt，u;
      对可用性产生负面影响的元素：frame，frameset，noframes；
```

* 计时器的缺点
```
setTimeout(function(){

/* Some long block of code… */

setTimeout(arguments.callee, 10);

}, 10);

setInterval(function(){

/* Some long block of code… */

}, 10);

这两个函数看起来效果一样，其实不然，第一个代码块总会延迟10毫秒执行，虽然大多时候是大于10毫秒的。而第二个每到10毫秒就尝试执行，不管之前的触发执行了没有。

总结起来四条

• JavaScript 引擎只有一个线程，它会迫使某些异步事件排队

• setTimeout 和 setInterval 在执行异步代码的时候有很大区别

• 假如一个计时器被阻止执行，它会等待知道遇到一个代码执行空隙，通常时间比预计的要长

• Intervals 可能会一个挨着一个执行，如果回调函数的执行时间大于间隔
```

null和undefined的区别。
```
null 表示一个值被定义了，定义为“空值”；
undefined 表示根本不存在定义。
REF: http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html
```

* angular的一些特性  
```
#1 良好的应用程序结构
　　通常情况下，我们编写 JavaScript 没有明确的结构。虽然在编写小应用程序的时候没有问题，但这显然是不适合于大规模的应用程序。使用 AngularJS，您可以通过MVC（模型 - 视图 - 控制器）或MVVM （模型 - 视图 - 视图模型）模式来组织源代码。 AngularJS 是一个 MVW 框架，其中W代表可以用于任何项目。你可以组织你的代码模块，它可显著提高应用程序的可测试性和可维护性。

#2 双向数据绑定
　　数据绑定肯定是 AngularJS 最佳功能之一。你可以声明绑定的模型到 HTML 元素。当模型发生变化时，视图会自动更新，反之亦然。这可以减少大量的传统样板代码，保持模型和视图同步。

#3 指令
　　AngularJS 指令让你使用 HTML 新语法快速的构建应用程序。您可以创建可重用的自定义组件与指令的API。例如，如果你想自定义日期选择器小部件，你可以创建一个<data-picker/ >组件。如果你想要一个奇特的文件上传与进度指示器可以继续创建一个<file-upload/ >组件。很酷，不是吗？

#4 HTML 模板
　　AngularJS 使用 HTML 模板，这使事情变得简单，并允许设计人员和开发人员同时工作。设计人员可以按照通常的方式创建用户界面，而开发人员可以使用声明性绑定语法很容易配合不同的UI组件的数据模型。

#5 可嵌入、注入和测试
　　关于 AngularJS 的最好的事情是，它是一个很好的团队成员。它从来没有要求全面承诺。AngularJS 官方网站说，你可以根据你需要使用尽可能多或尽可能少的在项目中使用 AngularJS。如果你只需要双向数据绑定，您可以引入 Angular，只是使用此功能。

　　AngularJS 支持依赖注入的开箱即用。如果你需要的东西，你只要调用 Angular 来注入。就这么简单。这巨大的提高可测试性，因为你可以很容易地在测试的模拟组件。

　　AngularJS 在创建时候始终考虑着可测试性。这些模块和依赖注入系统，使得单元测试更容易。此外， AngularJS 提供了一个称为量角器工具，这使得终端到终端的测试变得轻而易举。所以，你开发的代码始终是可测试性和可维护性。

　　这还不是全部！ AngularJS 还提供了更多的实用功能，如路由，过滤器，和动画等等。不过，以上几点已足以让我爱上它。
```

* 把数字转成货币显示，123456789 --> 123,456,789

* 定位的几种方式
```
static	默认。位置设置为 static 的元素，它始终会处于页面流给予的位置（static 元素会忽略任何 top、bottom、left 或 right 声明）。
relative	位置被设置为 relative 的元素，可将其移至相对于其正常位置的地方，因此 "left:20" 会将元素移至元素正常位置左边 20 个像素的位置。
absolute	位置设置为 absolute 的元素，可定位于相对于包含它的元素的指定坐标。此元素的位置可通过 "left"、"top"、"right" 以及 "bottom" 属性来规定。
fixed	位置被设置为 fixed 的元素，可定位于相对于浏览器窗口的指定坐标。此元素的位置可通过 "left"、"top"、"right" 以及"bottom" 属性来规定。不论窗口滚动与否，元素都会留在那个位置。工作于 IE7（strict 模式）。
```


* 对组件化认识
```
模块

你可能听说过 “组件是天然模块”的说法。好吧，感谢它，我们又要解释这里的术语！

你可能会觉得“组件”的说法更加适合用来描述UI，而“模块”更适合描述提供服务的功能逻辑。而对于我来说，模块和组件意思相近，都提供组织、聚焦和封装，是与某个功能单位相关的。

高内聚

又是一个软件工程的高频词！ 我们将相关的一些功能组织在一起，把一切封装起来，而在组件的例子中，就可能是相关的功能逻辑和静态资源：JavaScript、HTML、CSS以及图像等。这就是我们所说的内聚。

这种做法将让组件更容易维护，并且这么做之后，组件的可靠性也将提高。同时，它也能让组件的功能明确，增大组件重用的可能性。

可重用

你看到的示例组件，尤其是Web Component，更关心可重用的问题。功能明确，实现清晰，API易于理解。自然就能促进组件复用。通过构建可重用组件，我们不仅保持了 DRY（不要重复造轮子）原则，还得到了相应的好处。

这里要提醒： 不要过分尝试构建可重用组件。你更应该关注应用程序上所需要的那些特定部分。如果之后相应需求出现，或者组件的确到了可重用的地步，就花一点额外时间让组件重用。事实上，开发者都喜欢去创造可重用功能块（库、组件、模块、插件等），做得太早将会让你后来痛苦不堪。所以，吸取基于组件开发的其他好处，并且接受不是所有组件都能重用的事实。

可互换

一个功能明确好组件的API能让人轻易地更改其内部的功能实现。要是程序内部的组件是松耦合的，那事实上可以用一个组件轻易地替换另一个组件，只要遵循相同的 API/接口/约定。

假如你使用GoInstant提供的实时功能服务组件，那他们这周关闭服务这样的新闻会影响到你。然而，只要提供了相同的数据同步API，你也可以自行构建使用一个 FirebaseComponent 组件或者 PubNubComponent 组件。

可组合

之前也讨论过，基于组件的架构让组件组合成新组件更加容易。这样的设计让组件更加专注，也让其他组件中构建和暴露的功能更好利用。

不论是给程序添加功能，还是用来制作完整的程序，更加复杂的功能也能如法炮制。这就是这种方法的主要好处。

是否有必要把所有的东西转换成组件，事实上取决于你自己。没有任何理由让你的程序由 你自己 的组件组合成你最惊叹的功能 ，乃至 最花哨的功能。而这些组件又反过来构成其他组件。如果你从这个方法中得到了好处，就想方设法地去坚持它。然而要注意的是，不要用同样的方法把事情变得复杂，你并不需要过分关注如何让组件重用。而是要关注呈现程序的功能。
```

* 对模块化的认识
```
立即执行函数,不暴露私有成员

    var module1 = (function(){
    　　　　var _count = 0;
    　　　　var m1 = function(){
    　　　　　　//...
    　　　　};
    　　　　var m2 = function(){
    　　　　　　//...
    　　　　};
    　　　　return {
    　　　　　　m1 : m1,
    　　　　　　m2 : m2
    　　　　};
    　　})();
```

* JSONP的原理
```
很简单，就是利用<script>标签没有跨域限制的“漏洞”（历史遗迹啊）来达到与第三方通讯的目的。
当需要通讯时，本站脚本创建一个<script>元素，地址指向第三方的API网址，形如：    
<script src="http://www.example.net/api?param1=1&param2=2"></script>     并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。
第三方产生的响应为json数据的包装（故称之为jsonp，即json padding），形如：     
callback({"name":"hax","gender":"Male"})    
这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据。   
补充：“历史遗迹”的意思就是，如果在今天重新设计的话，也许就不会允许这样简单的跨域了嘿，
比如可能像XHR一样按照CORS规范要求服务器发送特定的http头。
```

* 清除浮动
```
1. 对父容器加上 .parent:before { content: ""; clear:both; display:table;}  
.parent:after { content: ""; clear:both; display:table;}
2. 对父容器加上 .parent { display: table}
3. 对父容器加上 .parent { overflow: hidden}
4. 使父容器浮动
```
* JS获取页面的高度宽度
```
window.screen.availWidth 返回当前屏幕宽度(空白空间) 
window.screen.availHeight 返回当前屏幕高度(空白空间) 
window.screen.width 返回当前屏幕宽度(分辨率值) 
window.screen.height 返回当前屏幕高度(分辨率值) 
window.document.body.offsetHeight; 返回当前网页高度 
window.document.body.offsetWidth; 返回当前网页宽度 

我们这里说说四种浏览器对 document.body 的 clientHeight、offsetHeight 和 scrollHeight 的解释。

这四种浏览器分别为IE（Internet Explorer）、NS（Netscape）、Opera、FF（FireFox）。

clientHeight
大家对 clientHeight 都没有什么异议，都认为是内容可视区域的高度，也就是说页面浏览器中可以看到内容的这个区域的高度，一般是最后一个工具条以下到状态栏以上的这个区域，与页面内容无关。

offsetHeight
IE、Opera 认为 offsetHeight = clientHeight + 滚动条 + 边框。
NS、FF 认为 offsetHeight 是网页内容实际高度，可以小于 clientHeight。

scrollHeight
IE、Opera 认为 scrollHeight 是网页内容实际高度，可以小于 clientHeight。
NS、FF 认为 scrollHeight 是网页内容高度，不过最小值是 clientHeight。

简单地说
clientHeight 就是透过浏览器看内容的这个区域高度。
NS、FF 认为 offsetHeight 和 scrollHeight 都是网页内容高度，只不过当网页内容高度小于等于 clientHeight 时，scrollHeight 的值是 clientHeight，而 offsetHeight 可以小于 clientHeight。
IE、Opera 认为 offsetHeight 是可视区域 clientHeight 滚动条加边框。scrollHeight 则是网页内容实际高度。
```
* 滚动条的宽度
* html5里怎么放大
```
scale()
```

* 对前端行业的看法  
```
前端是展示给用户看的，最接近用户的程序员，要与后端，视觉设计师，产品经理，项目经理，测试工程师打交道。
具体职责在于:
1. 实现界面交互
2. 优化用户体验
3. 实现一些简单的业务逻辑，减少后台性能付出
4. 做一些浏览器端的优化，减轻服务器端压力
5. 参与项目，快速高质量完成实现效果图，精确到1px
6. 与团队成员，UI设计，产品经理的沟通
7. 做好的页面结构，页面重构
8. hack，兼容、写出优美的代码格式
9. 针对服务器的优化、拥抱最新前端技术
```
* css3动画优化
```
目前对提升移动端CSS3动画体验的主要方法有几点：

尽可能多的利用硬件能力，如使用3D变形来开启GPU加速
如下面一个元素通过translate3d右移500px的动画流畅度会明显优于使用left属性：

#ball-1 {
  transition: -webkit-transform .5s ease;
  -webkit-transform: translate3d(0, 0, 0);
}
#ball-1.slidein {
  -webkit-transform: translate3d(500px, 0, 0);
}


#ball-2 {
  transition: left .5s ease;
  left: 0;
}
#ball-2.slidein {
  left: 500px;
}
注：3D变形会消耗更多的内存与功耗，应确实有性能问题时才去使用它，兼在权衡
尽可能少的使用box-shadows与gradients

box-shadows与gradients往往都是页面的性能杀手，尤其是在一个元素同时都使用了它们，所以拥抱扁平化设计吧。

尽可能的让动画元素不在文档流中，以减少重排

position: fixed;
position: absolute;
优化 DOM layout 性能
```
* canvas的一些标准应用  
```
通过 JavaScript 来绘制
canvas 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成：
<script type="text/javascript">
var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
cxt.fillStyle="#FF0000";
cxt.fillRect(0,0,150,75);
</script>
JavaScript 使用 id 来寻找 canvas 元素：
var c=document.getElementById("myCanvas");
然后，创建 context 对象：
var cxt=c.getContext("2d"); 
getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
下面的两行代码绘制一个红色的矩形：
cxt.fillStyle="#FF0000";
cxt.fillRect(0,0,150,75); 
fillStyle 方法将其染成红色，fillRect 方法规定了形状、位置和尺寸。
```

* html5的了解  

---
####来自小黑
* ES6的一些新特性的实现  

* 一些布局  

* HTML元素分为五大类：
```
Void elements。像hr，br，base这种.
Raw text elements。有两个：script和style.
RCDATA elements。也有两个：textarea和title.
Foreign elements。来自MATHML和SVG的元素.
Normal elements。除了以上四种类型之外的所有元素，比如p，div，iframe等
```
#####underscore源码  


####蘑菇街：
* 首屏加载优化。
* 模块化的实践经验。
* Angular.js中factory和service的区别。
* Angular.js中双向绑定的实现原理。

####UC:
* BigRender的原理。
* Promise的应用场景。
* 闭包的优缺点。
* html语义化的理解。
```
用正确的标签做正确的事情。
html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
及时在没有样式CCS情况下也以一种文档格式显示，并且是容易阅读的;
搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。
```

####其它:
* CSS3：animate，transition
* 日期格式化函数的实现原理
* js代码的缓存
* 框架设计的想法


##参考
###其他面试题:  http://www.oschina.net/question/2012764_243956?fromerr=tXX6Z9Z6
