var classnames = require('classnames');
/**
 * 标签组件
 *
 * @param [color] 标签的背景样式
 *
 * @param [closable] 是否可以关闭
 *
 * @param {function} onClose 点击关闭时的回调事件
 *
 * Tag组件
 * 示例:
 *
 *     @example
 *     <Tag color="#4db6ac" closable >标签2</Tag>
 */
var Tag = React.createClass({
    getDefaultProps: function(){
        return{
            className: '',
            color:'',   //标签的背景颜色
            closable: false,   //是否出现关闭按钮,默认不显示
            onClose:'',  //点击关闭时的回调事件
        }
    },
    getInitialState:function () {
        return{
            className: classnames('ucs-tag',this.props.className)
        }
    },
    onClose: function(){
        this.componentEl = ReactDOM.findDOMNode(this);
        this.componentEl.remove();
        var eventClose = this.props.onClose;
        if(eventClose){
            eventClose();
        }
    },
    componentDidMount: function () {

    },
    render: function(){

        var closespan = this.props.closable? <span onClick={this.onClose}><i className="iconfont icon-close"></i> X</span> : '';
        return <div {...this.props} className={this.state.className} style={{backgroundColor:this.props.color}} >{this.props.children}{closespan}</div>
    }
})
module.exports = Tag;