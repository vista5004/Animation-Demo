<!DOCTYPE html>
<html lang="en">
<head>
  <title>我的照片</title>
  <style type="text/css">
    *{
      margin: 0;
      padding: 0;
    }
    #div1{
      position: absolute;
      width: 800px;
      height: 800px;
      border: 1px solid green;
    }
    #div2{
      position: absolute;
      left: 800px;
      width: 800px;
      height: 800px;
      border: 1px solid green;
    }
    #div3{
      position: absolute;
      top: 800px;
      width: 800px;
      height: 800px;
      border: 1px solid green;
    }
  </style>

</head>
<body style="text-align: center;">
  <div id="div1">

  </div>
  <div id="div2">

  </div>
  <div id="div3">

  </div>
</body>
<script>
  (function(exports){
    var doc=document;
    var tagNameExpr=/^[\w-]+$/;
    var idExpr=/^#([\w-]*)$/;
    var classExpr=/^.([\w-]+)$/;
    var hasClassListProperty='classList' in document.documentElement;
    var vendor=['o','ms','moz','webkit'];
    var div=document.createElement("div");
    var $d={
      $:function (selector,context){
        var result;
        var qsa;
        var content=context||doc;
        if(idExpr.test(selector)){
          result=this.id(selector.replace("#",''));
          if(result) return result;
        }
        else if (tagNameExpr.test(selector)){
          result=this.tagName(selector,context)
        }
        else if(classExpr.test(selector)){
          result=this.className(selector,context)
        }
        else result=context.querySelectorAll(selector);
        return result;
      },
      id:function(id) {
        return doc.getElementById(id);
      },
      tagName:function(tagName,context){
        var content=context||doc;
        return document.getElementsByTagName(tagName);
      },
      node:function(name){
        return doc.createElement(name);
      },
      className:function(className,context){
        context=context||doc;
        return context.getElementsByClassName(className)
      },
      remove:function(node){
        var context=node.parentNode;
        context.removeChild(node);
      },
      setStyle:function(ele,styleNames){
        for(var n in styleNames){
          if(styleNames.hasOwnProperty(n)){
            ele.style[n]=styleNames[n]
          }
        }
      },
      getStyle: function (ele,attr) {
        if(!ele){
          return
        }
        if(attr==='float'){
          attr='cssFloat';
        }
        if(ele.style[attr]){
          return ele.style[attr]
        }
        if(window.getComputedStyle){
          getComputedStyle(ele,null)[attr]
        }else if(document.defaultView && document.defaultView.getComputedStyle){
          attr = attr.replace(/([/A-Z])/g, "-$1");
          attr = attr.toLowerCase();
          var style = document.defaultView.getComputedStyle(el, "");
          return style && style.getPropertyValue(attr);
        }else if(ele.currentStyle){
          return ele.currentStyle[ele]
        }
      },
      setAttr: function (ele,json) {
        for(var i in json){
          ele.setAttribute(i,json[i]);
        }
      }
    };
    var Tween = {
      Linear: function (t, b, c, d) { return c * t / d + b; },
      Quad: {//Quadratic二次方效果
        easeIn: function (t, b, c, d) {
          return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {
          return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function (t, b, c, d) {
          if ((t /= d / 2) < 1) return c / 2 * t * t + b;
          return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
      },
      Cubic: {//Cubic 立方效果
        easeIn: function (t, b, c, d) {
          return c * (t /= d) * t * t + b;
        },
        easeOut: function (t, b, c, d) {
          return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
          if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
          return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
      },
      Quart: {// Quartic  四次方效果
        easeIn: function (t, b, c, d) {
          return c * (t /= d) * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
          return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function (t, b, c, d) {
          if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
          return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
      },
      Quint: {// Quintic五次方效果
        easeIn: function (t, b, c, d) {
          return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
          return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
          if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
          return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
      },
      Sine: {//Sinusoidal 正弦效果
        easeIn: function (t, b, c, d) {
          return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function (t, b, c, d) {
          return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function (t, b, c, d) {
          return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
      },
      Expo: { // Exponential指数
        easeIn: function (t, b, c, d) {
          return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function (t, b, c, d) {
          return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
          if (t == 0) return b;
          if (t == d) return b + c;
          if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
          return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
      },
      Circ: { //circle循环
        easeIn: function (t, b, c, d) {
          return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, b, c, d) {
          return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, b, c, d) {
          if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
          return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
      },
      Elastic: {//  Elastic 弹性
        easeIn: function (t, b, c, d, a, p) {
          if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
          if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
          else var s = p / (2 * Math.PI) * Math.asin(c / a);
          return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function (t, b, c, d, a, p) {
          if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
          if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
          else var s = p / (2 * Math.PI) * Math.asin(c / a);
          return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function (t, b, c, d, a, p) {
          if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
          if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
          else var s = p / (2 * Math.PI) * Math.asin(c / a);
          if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
          return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
      },
      Back: {//后退
        easeIn: function (t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function (t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function (t, b, c, d, s) {
          if (s == undefined) s = 1.70158;
          if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
          return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
      },
      Bounce: {// Bounce反弹
        easeIn: function (t, b, c, d) {
          return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function (t, b, c, d) {
          if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
          } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
          } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
          } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
          }
        },
        easeInOut: function (t, b, c, d) {
          if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
          else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
      }
    };
    exports.selector=$d;
    exports.animate=Tween;
  })(window);

  var SVG=function (setting) {
    this.data={
      centerNode:{text:'克鲁兹'},
      otherNode:[
      ]
    };
    var defaults={
      number:9,
      angleNum:360/this.number,
      centerR:250
    };
    if(setting){
      for(var key in setting){
        defaults[key]=setting[key]
      }
    }

    this.oParent=selector.$("#div1");
    this.oParent1=selector.$("#div2");
    this.centerX=this.oParent.offsetWidth/2;
    this.centerY=this.oParent.offsetHeight/2;
    for(var i=0;i<defaults.number;i++){
      var x=Math.sin(i*40*Math.PI/180)*defaults.centerR+this.centerY;
      var y=Math.cos(i*40*Math.PI/180)*defaults.centerR+this.centerX;
      this.data.otherNode.push({x:x,y:y,text:i});
    }
  };
  SVG.prototype={
    svgNS:'http://www.w3.org/2000/svg',

    //oParent:document.getElementById("div1")
//    centerX:this.oParent.offsetWidth/2,
//    centerY:this.oParent.offsetHeight/2,
    init:function(){
      var that=this;
      var oSVG=this.createTag("svg",{
        'xmls':this.svgNS,
        'width':"100%",
        'height':"100%"
      });
      this.svg=oSVG;
      for(var i=0;i<this.data.otherNode.length;i++){
        that.addOtherTag(that.data.otherNode[i],that.svg);
      }
      this.addMainTag();
      this.bindEvent();
      var oSVG1=this.createTag("svg",{
        'xmls':this.svgNS,
        'width':"100%",
        'height':"100%"
      });
      this.svg1=oSVG1;
      this.points='';
      this.createPolyLine(this.svg1,{
        'fill':'none',
        'stroke':'navy',
        'stroke-width':'2'
      });
    },
    //创建元素
    createTag: function (tag,objAttr) {
      var tag=document.createElementNS(this.svgNS,tag);
      for(var attr in objAttr){
        tag.setAttribute(attr,objAttr[attr]);
      }
      return tag;
    },
    addMainTag: function () {
      var oG=this.createTag('g',{
        'style':'cursor:pointer',
        'class':'mainCircle'
      });
      var oCircle=this.createTag('circle',{
        'cx':this.centerX,
        'cy':this.centerY,
        'r':'60',
        'fill':'white',
        'stroke':'red',
        'stroke-width':'1'
      });
      var oText=this.createTag('text',{
        'x':this.centerX,
        'y':this.centerY+8,
        'font-size':'20',
        'text-anchor':'middle'
      });
      oText.innerHTML='克鲁兹';
      this.svg.appendChild(oG);
      oG.appendChild(oCircle);
      oG.appendChild(oText);
      this.oParent.appendChild(this.svg);
    },
    addOtherTag: function (otherAttr,oSvg) {
      var line1=this.createTag('line',{
        'x1':otherAttr.x,
        'y1':otherAttr.y,
        'x2':this.centerX,
        'y2':this.centerY,
        'stroke':'#ccc',
        'stroke-width':'2'
      });
      var line2=this.createTag('line',{
        'x1':otherAttr.x,
        'y1':otherAttr.y,
        'x2':this.centerX,
        'y2':this.centerY,
        'stroke':'transparent',
        'stroke-width':'10'
      });
      var oRect=this.createTag('rect',{
        'x':(otherAttr.x+this.centerX)/2-10,
        'y':(otherAttr.y+this.centerY)/2-10,
        'fill':'#999',
        'width':'20',
        'height':'20',
        'rx':'5'
      });
      var oText1=this.createTag('text',{
        'x':(otherAttr.x+this.centerX)/2,
        'y':(otherAttr.y+this.centerY)/2+8,
        'fill':'white',
        'font-size':20,
        'text-anchor':'middle'
      });
      oText1.innerHTML="?";
      var oG1=this.createTag('g',{
        'style':'cursor:pointer',
        'class':'otherLine'
      });
      var oG2=this.createTag('g',{
        'style':'cursor:pointer',
        'class':'otherCircle'
      });

      var oCircle=this.createTag('circle',{
        'cx':otherAttr.x,
        'cy':otherAttr.y,
        'r':'30',
        'fill':'white',
        'stroke':'red',
        'stroke-width':'1'
      });
      var oText2=this.createTag('text',{
        'x':otherAttr.x,
        'y':otherAttr.y+8,
        'fill':'black',
        'font-size':20,
        'text-anchor':'middle'
      });
      oText2.innerHTML="OK";
      oG1.appendChild(line1);
      oG1.appendChild(line2);
      oG1.appendChild(oRect);
      oG1.appendChild(oText1);


      oG2.appendChild(oCircle);
      oG2.appendChild(oText2);
      oSvg.appendChild(oG1);
      oSvg.appendChild(oG2);
    },
//    tween animation
    tweenAnimate: function (obj,start,end,dur) {
      clearInterval(obj.timer);
      var changeValue=end-start;
      var newR;
      var t=0;
      obj.timer=setInterval(function () {
        t+=5;
        newR=animate.Elastic.easeOut(t,start,changeValue,dur)
        if(t<dur){
          selector.setAttr(obj,{
            "r":newR
          })
        }
      },30)
    },
    bindEvent: function () {
      var otherLine=selector.className("otherLine");
      var mainCircle=selector.className("mainCircle");
      //var otherCircle=selector.className("otherCircle");
      var otherCircle=document.getElementsByClassName("otherCircle");
      var that=this;
      for(var i=0;i<otherLine.length;i++){
        otherLine[i].onmouseover= function () {
          var previous=this;
          selector.setAttr(previous.getElementsByTagName('line')[0],{
            'stroke':'blue'
          });
          selector.setAttr(previous.getElementsByTagName("rect")[0],{
            'fill':'red'
          })
        };
        otherLine[i].onmouseleave= function () {
          var previous=this;
          selector.setAttr(previous.getElementsByTagName('line')[0],{
            'stroke':'#ccc'
          });
          selector.setAttr(previous.getElementsByTagName("rect")[0],{
            'fill':'#ccc'
          })
        };
      }
      for(var k=0;k<otherCircle.length;k++){
        otherCircle[k].onmouseenter= function () {
          var previous=this.previousElementSibling;
          selector.setAttr(previous.getElementsByTagName('line')[0],{
            'stroke':'#547'
          });
          selector.setAttr(previous.getElementsByTagName("rect")[0],{
            'fill':'#782'
          });
          that.tweenAnimate(this.getElementsByTagName('circle')[0],30,50,300);
          console.log(1);
        };
        otherCircle[k].onmouseleave= function () {
          var previous=this.previousElementSibling;
          selector.setAttr(previous.getElementsByTagName('line')[0],{
            'stroke':'#ccc'
          });
          selector.setAttr(previous.getElementsByTagName("rect")[0],{
            'fill':'#ccc'
          });
          that.tweenAnimate((this.getElementsByTagName('circle')[0]),50,30,300)
        }
      }
    },
    //动态创建折线
    createPolyLine: function (obj,attr) {
      var that=this;
      var targetPolyLine;
      var targetCircle;
      var oCircleMove;
      obj.onclick= function (e) {
        var ev=e||window.event;
        var x= ev.clientX-that.oParent1.offsetLeft;
        var y= ev.clientY-that.oParent1.offsetTop;
        if(that.points===''){
          that.points=x+','+y;
        }else{
          that.points+=','+x+','+y;
        }
//        只添加一次，如果存在就不再添加
        if(!oPolyLine){
          var oPolyLine=that.createTag('polyline',attr);
          var oCircle=that.createTag('circle',{
            'cx':x,
            'cy':y,
            'r':5,
            'fill':'transparent',
            'stroke':'pink',
            'stroke-width':'2'
          });
          targetPolyLine=oPolyLine;
          targetCircle=oCircle;
          this.appendChild(targetPolyLine);
          this.appendChild(targetCircle);
        }
        selector.setAttr(targetPolyLine,{
          'points':that.points
        });
      };
      //    进入后添加小圆圈
      obj.onmouseenter= function () {
        var oCircle=that.createTag('circle',{
          'r':'5',
          'fill':'transparent',
          'stroke':'pink',
          'stroke-width':'2'
        });
        oCircleMove=oCircle;
        this.appendChild(oCircleMove);
      };
      obj.onmouseleave= function () {
        this.removeChild(oCircleMove);
      };
//      实时显示折线
      obj.onmousemove= function (e) {
        var ev=e||window.event;
        var x=ev.clientX-that.oParent1.offsetLeft;
        var y=ev.clientY-that.oParent1.offsetTop;
        if(oCircleMove){
          selector.setAttr(oCircleMove,{
            'cx':x,
            'cy':y
          })
        }
        if(targetPolyLine){
          selector.setAttr(targetPolyLine,{
            'points':that.points+','+x+','+y
          });
        }
      };
//      右键取消事件
      obj.oncontextmenu= function () {
        obj.onmousemove=null;//移动事件取消
        return false;
      };
      that.oParent1.appendChild(obj);
    }
  }
  window.onload=function(){
    var svg=new SVG;
    svg.init()

  }

</script>

</html>
