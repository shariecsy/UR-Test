/*
 * Created by Administrator on 2017/3/17.
 */

/*
 * 查询样式是否存在
 * @param {object，string} args
 * @return {boolean}
 * */
function hasClass(elem, cls) {
    elem = elem || {};
    return new RegExp("\\b" + cls + "\\b").test(elem.className);
};
/*
 * 添加样式
 * @param {object，string} args
 * @return {object}
 * */
function addClass(elem, cls) {
    elem = elem || {};
    hasClass(elem, cls) || (elem.className += " " + cls);
    elem.className = elem.className.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
    return this;
};
/*
 * 删除样式
 * @param {object，string} args
 * @return {object}
 * */
function removeClass(elem, cls) {
    elem = elem || {};
    if (hasClass(elem, cls)) {
        elem.className = elem.className.replace(new RegExp("(\\s|^)" + cls + "(\\s|$)"), "");
    }
    return this;
};
/**
 * Slider组件
 *
 * @param [dots] 是否有焦点
 * @param arrows 是否有箭头
 * @param [autoPlay] 是否自动播放
 * @param [autoPlaySpeed] 自动播放速度
 *
 * 示例:
 *
 *     @example
 *
 *     var config = {
 *			dots: true,
 *			arrows: true,
 *			autoPlay: true,
 *			autoPlaySpeed: 2000
 *		}
 *
 *     <Slider config={config}>
 *        <div className="ucs-slider-item active-item" style={{background: "url(../images/b0.jpg)  center 0 no-repeat"}}>
 *          <div className="inner"></div>
 *        </div>
 *        <div className="ucs-slider-item" style={{background: "url(../images/b1.jpg)  center 0 no-repeat"}}>
 *          <div className="inner"></div>
 *        </div>
 *        <div className="ucs-slider-item" style={{background: "url(../images/banner.jpg)  center 0 no-repeat"}}>
 *          <div className="inner"></div>
 *        </div>
 *     </Slider>
 */
var Slider = React.createClass({
    getDefaultProps:function(){
        return{
            config: {
                dots: true,
                arrows: true,
                autoPlay: true,
                autoPlaySpeed: 2000
            }
        }
    },
    componentDidMount: function(){
        this.count = 0;
        if(this.props.config.autoPlay){
            this.slideHandler();
        }
    },
    /*
     * 自动播放方法
     * */
    slideHandler: function(){
        var _this = this;
        var items = _this.refs['ucs-slider-list'].childNodes;
        var dots;
        if(_this.props.config.dots){
            dots = _this.refs['dots'].childNodes;
        }
        _this.timer = setInterval(function(){
            for(var i = 0; i < items.length; i ++){
                removeClass(items[i],"active-item");
                if(_this.props.config.dots){
                    removeClass(dots[i],"current");
                }
                items[i].style.opacity = 0;
            }
            if(_this.count == items.length-1){
                _this.count = 0;
            }else{
                _this.count++;
            }
            addClass(items[_this.count],"active-item");
            if(_this.props.config.dots){
                addClass(dots[_this.count],"current");
            }
            _this.fadeInHandler();
        },_this.props.config.autoPlaySpeed);
    },
    /*
     * 鼠标移入事件
     * */
    mouseOverHandler: function(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
    },
    /*
     * 鼠标移出事件
     * */
    mouseOutHandler: function(){
        if(this.props.config.autoPlay){
            this.slideHandler();
        }
    },
    /*
     * 焦点点击事件
     * */
    dotClickHandler: function(e){
        var _this = this;

        var items = _this.refs['ucs-slider-list'].childNodes;
        var dots = _this.refs['dots'].childNodes;
        for(var i = 0; i < items.length; i ++){
            removeClass(items[i],"active-item");
            removeClass(dots[i],"current");
        }
        addClass(items[e.target.parentNode.value],"active-item");
        addClass(dots[e.target.parentNode.value],"current");
        _this.count = e.target.parentNode.value;
        _this.fadeInHandler();
    },
    /*
     * 左箭头点击事件
     * */
    prevHandler: function(){
        var _this = this;

        var items = _this.refs['ucs-slider-list'].childNodes;
        var dots;
        if(_this.props.config.dots){
            dots = _this.refs['dots'].childNodes;
        }
        for(var i = 0; i < items.length; i ++){
            removeClass(items[i],"active-item");
            if(_this.props.config.dots){
                removeClass(dots[i],"current");
            }
        }
        if(_this.count == 0){
            _this.count = items.length-1;
        }else{
            _this.count--;
        }
        addClass(items[_this.count],"active-item");
        if(_this.props.config.dots){
            addClass(dots[_this.count],"current");
        }
        if(_this.props.config.dots){
            removeClass(dots[i],"current");
        }
        this.fadeInHandler();
    },
    /*
     * 右箭头点击事件
     * */
    nextHandler: function(){
        var _this = this;

        var items = _this.refs['ucs-slider-list'].childNodes;
        var dots;
        if(_this.props.config.dots){
            dots = _this.refs['dots'].childNodes;
        }
        for(var i = 0; i < items.length; i ++){
            removeClass(items[i],"active-item");
            if(_this.props.config.dots){
                removeClass(dots[i],"current");
            }
        }
        if(_this.count == items.length-1){
            _this.count = 0;
        }else{
            _this.count++;
        }
        addClass(items[_this.count],"active-item");
        if(_this.props.config.dots){
            addClass(dots[_this.count],"current");
        }
        this.fadeInHandler();
    },
    /*
     * 渐变效果方法
     * */
    fadeInHandler: function(){
        var _this = this;
        var items = _this.refs['ucs-slider-list'].childNodes;
        var opt = 0;
        var tm = setInterval(function(){
            if(opt>1){
                clearInterval(tm);
            }else{
                opt += 0.1;
            }
            items[_this.count].style.opacity = opt;
        },50);
    },
    render:function(){
        var _this = this;
        return(
            <div className="ucs-slider" onMouseOver={_this.mouseOverHandler.bind(_this)} onMouseOut={_this.mouseOutHandler}>
                <div className="ucs-slider-list" ref="ucs-slider-list">
                    {_this.props.children}
                </div>
                {
                    _this.props.config.dots?(
                        <div className="dots">
                            <ul ref="dots">
                                {
                                    _this.props.children.map(function(item,index){
                                        if(index == 0){
                                            return (<li value={index} className="current"><a href="javascript:void(0)" onClick={_this.dotClickHandler}></a></li>);
                                        }else{
                                            return (<li value={index}><a href="javascript:void(0)" onClick={_this.dotClickHandler}></a></li>);
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    ):""
                }
                {
                    _this.props.config.arrows?(
                        <div className="arrows">
                            <a href="javascript:void(0)" className="prev" onClick={_this.prevHandler}></a>
                            <a href="javascript:void(0)" className="next" onClick={_this.nextHandler}></a>
                        </div>
                    ):""
                }
            </div>
        )
    }
});

module.exports = Slider;