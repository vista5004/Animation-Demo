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
  </style>

</head>
<body style="text-align: center;">
  <div id="div1">

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
        var children, elements, i, l, classNames;
        context=context||doc;
        return context.getElementByclassName(className)
      },
      remove:function(node){
        var context=node.parentNode;
        context.removeChild(node);
      },
      setStyle:function(ele,styleNames){
        for(var n in classNames){
          ele.style[n]=styleNames[n];
        }
      }
    }
    exports.selector=$d;
  })(window)

  var SVG=function () {
    this.data={
      centerNode:{text:'克鲁兹'},
      otherNode:[
        {x:100,y:100,text:'易车网'},
        {x:300,y:700,text:'23'}
      ]
    };
    this.oParent=selector.$("#div1");
    this.centerX=this.oParent.offsetWidth/2;
    this.centerY=this.oParent.offsetHeight/2;
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
    },
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
      var oG=this.createTag('g',{
        'style':'cursor:pointer'
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
        'y':otherAttr.y,
        'fill':'black',
        'font-size':20,
        'text-anchor':'middle'
      });
      oText2.innerHTML=otherAttr.text;
      oG.appendChild(line1);
      oG.appendChild(line2);
      oG.appendChild(oRect);
      oG.appendChild(oText1);
      oG.appendChild(oCircle);
      oG.appendChild(oText2);
      oSvg.appendChild(oG);
    },

  }
  window.onload=function(){
    var svg=new SVG;
    svg.init()

  }
  
</script>

</html>
