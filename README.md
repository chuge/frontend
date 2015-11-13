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

* 把数字转成货币显示，123456789 --> 123,456,789

* 定位的几种方式

* 对组件化和模块化的认识

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

