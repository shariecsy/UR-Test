var classNames=require('classnames');
/**
 * Button组件
 * @author phy <yao.qianfeng@ucsmy.com>
 *
 * 示例：
 *
 *      @example
 *      <Button buttonType="cancel">取消</Button>
 *
 */
var Button = React.createClass({
    propTypes:{
        onClick: React.PropTypes.func
    },
    getInitialState:function(){
        return {
            currentClassName : ''
        };
    },

    /**
     *点击事件处理程序
     *
     * @param e
     */
    _handleClick:function(e){
        var _self=this;
        _self.setState({currentClassName : 'ucs-btn-clicked'});
        setTimeout(function(){
            _self.setState({currentClassName : ''});
        },200);
    },

    /**
     * 获取class类名
     * @returns {Object}
     *
     */
    getClassName:function(){
        var defaultClassName='ucs-btn';
        var customClassNameArr=this.props.buttonType?this.props.buttonType.split(' '):'';
        var customClassName='';
        if(customClassNameArr.length>0){
            for(var i=0;i<customClassNameArr.length;i++){
                customClassName='ucs-btn-'+customClassNameArr[i]+' '+customClassName;
            }
        }
        var className=classNames(defaultClassName,customClassName,this.props.className);
        return (className);
    },

    /**
     * 获取按钮尺寸大小
     *
     */
    getSize:function () {
        var size=this.props.size;
    },

    render:function(){
        var html;
        // var displayType=this.props.display?'ucs-btn-block':'';
        if(this.props.HtmlType=='link'){
            html=<a {...this.props} className={this.getClassName()} onClick={this.props.onClick? this.props.onClick:this._handleClick}>{this.props.children}</a>;
        }else{
            html=<button {...this.props} className={this.getClassName()} type="button" onClick={this.props.onClick? this.props.onClick:this._handleClick}>{this.props.children}</button>;
        }
        return (html);
    }
});
module.exports = Button;