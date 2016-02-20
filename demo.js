<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>我的照片</title>
    <style type="text/css">
       *{
        margin: 0;
        padding: 0;
       }
       #ul1{
        height: auto;margin: 20px auto;  overflow: hidden; border: 1px solid rgb(26,66,186); border-right: none; border-bottom: none;
       }
       #ul1 li{
        border: 1px solid rgb(26,66,186);border-top: none;border-left: none;
       }
    </style>
    
</head>
<body style="text-align: center;">
    <ul id="ul1">
        
    </ul>
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
    var quene=function () {};
    quene.prototype={
        ul1:selector.$("#ul1"),
        li1:selector.$("li",ul1),
        sizeGird:50,
        num:5,
        init:function(){
            this.createGird();
        },
        createGird:function(){
            var len=this.num*this.num;
            var that=this;
            for(var i=0;i<len;i++){
                var lia=selector.node("li");
                // that.ul1.appendChild(lia);
                console.log(that.ul1);
                that.ul1.appendChild(lia);
            }
        },
       
    }
    window.onload=function(){
        var qu=new quene;
        qu.init()
    }

</script>
     
</html>
