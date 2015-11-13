# frontend


##对自己的一些查漏补缺的记录

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

* 清除浮动
* JS获取页面的高度宽度
* 滚动条的宽度
* html5里怎么放大

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
* canvas的一些标准应用  

* html5的了解  

---
####来自小黑
* ES6的一些新特性的实现  

* 一些布局  

#####underscore源码  


####蘑菇街：
首屏加载优化。
模块化的实践经验。
Angular.js中factory和service的区别。
Angular.js中双向绑定的实现原理。

####UC:
BigRender的原理。
Promise的应用场景。
闭包的优缺点。
html语义化的理解。

####其它:
CSS3：animate，transition
日期格式化函数的实现原理
js代码的缓存
框架设计的想法

