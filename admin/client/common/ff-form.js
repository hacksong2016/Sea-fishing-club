ff = {
    geo: function() {
        $("<div id='ff-map' class=' animated fadeInLeft'><div id='baidumap'></div></div>").appendTo($("#datagrid"));
        var map = null;
        $(".geo").click(function() {
            $("#ff-map").show();
            if (!map) {
                map = new BMap.Map("baidumap"); // 创建Map实例
                var top_left_control = new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT
                }); // 左上角，添加比例尺
                var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
                var top_right_navigation = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_RIGHT,
                    type: BMAP_NAVIGATION_CONTROL_SMALL
                });
                map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
                map.addControl(top_left_control);
                map.addControl(top_left_navigation);
                map.addControl(top_right_navigation);

                function fillPosition(e){
                	$(".geo").parent().find("input").val(e.point.lng + ", " + e.point.lat);
                	$("#ff-map").hide();
				}
				map.addEventListener("click", fillPosition);

                // 定义一个控件类,即function
                function CloseControl() {
                    // 默认停靠位置和偏移量
                    this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
                    this.defaultOffset = new BMap.Size(10, 10);
                }

                // 通过JavaScript的prototype属性继承于BMap.Control
                CloseControl.prototype = new BMap.Control();

                // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
                // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
                CloseControl.prototype.initialize = function(map) {
                        // 创建一个DOM元素
                        var div = document.createElement("div");
                        // 添加文字说明
                        div.appendChild(document.createTextNode("关闭"));
                        // 设置样式
                        div.style.cursor = "pointer";
                        div.style.border = "1px solid gray";
                        div.style.padding = "5px 10px";
                        div.style.backgroundColor = "white";
                        // 绑定事件,关闭地图
                        div.onclick = function(e) {
                                $("#ff-map").hide();
                            }
                            // 添加DOM元素到地图中
                        map.getContainer().appendChild(div);
                        // 将DOM元素返回
                        return div;
                    }
                    // 创建控件
                var cCtrl = new CloseControl();
                // 添加到地图当中
                map.addControl(cCtrl);
            }
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
            map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的

        });
    },
    checkTime:function(str){
        var reg = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
        return reg.test(str);
    },
     editor:function(){
        $(".ff-line div[contenteditable=true]").keyup(function(event){
           
            if(event.keyCode == 91 || event.keyCode == 22){
                $(this).find("img").attr("width","auto").attr("style","max-width:100%;");
                console.log($(this).find("img").size());
            }
        });
    }
}
