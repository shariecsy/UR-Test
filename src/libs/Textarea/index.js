
var classnames = require('classnames');
/**
 * 文本域组件
 *
 * 示例:
 *
 *     @example
 *     <Textarea placeholder="default" id="name" ref="ddd" value="333" onChange={this.onchange}/>
 */
var Textarea = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value,
            spanPlaceholder: true,
            className:classnames('ucs-input ucs-textarea',this.props.className,this.props.disabled ? 'disabled' : '')
        }
    },
    componentWillMount: function () {
        if (this.props.value) {
            this.setState({
                spanPlaceholder: false
            });
        }

    },
    componentWillReceiveProps:function (nextProps) {
        if(this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
                spanPlaceholder: nextProps.value ? false : true
            });
        }else {

        }
    },
    /**
     * Textarea的value改变时执行的事件
     * @param e
     *
     * */
    onChange: function (e) {
        this.setState({
            value: e.target.value,
            spanPlaceholder: e.target.value ? false : true
        });
        this.props.onChange ? this.props.onChange(e) : "";
    },
    /**
     * Textarea获取焦点时执行的事件
     * @param e
     *
     * */
    onFucus: function (e) {
        //根据ie10的标准，获得焦点时提示是会消失的，因此失去焦点也要相应的处理
        this.setState({
            spanPlaceholder: false
        });
        this.props.onFocus ? this.props.onFocus(e) : "";
    },
    /**
     * Textarea失去焦点时执行的事件
     * @param e
     *
     * */
    onBlur: function (e) {
        this.setState({
            spanPlaceholder: e.target.value ? false : true
        });
        this.props.onBlur ? this.props.onBlur(e) : "";
    },
    _handlePlaceholderClick: function () {

        //让文字框获得焦点
        // this.refs.inputtext.focus();
        // this.focus();
    },
    /**
     * 设置Textarea的value
     * @param {string} v
     * Checkbox的value
     *
     * */
    setValue: function (v) {
        this.setState({value: v});
    },
    /**
     * 获取Textarea的值
     * @return {string}
     * */
    getValue: function () {
        return this.state.value
    },
    render: function () {

        //value值不为空时，隐藏提示
        var spanPlaceholder = {
            display: this.state.spanPlaceholder ? "block" : "none"
        };
        var placeholder = "";
        //这里先是判断浏览器的支持，
        if (this.props.placeholder && !('placeholder' in document.createElement('textarea'))) {
            placeholder = (<span className="ucs-placeholder" style={spanPlaceholder}
                                 onClick={this._handlePlaceholderClick}>{this.props.placeholder}</span>);
        }
        return (
            <div className="ucs-textarea-control">
                <textarea  {...this.props}
                           value={this.state.value}
                           className={this.state.className}
                           ref="textarea" onChange={this.onChange} onFocus={this.onFucus} />
                {placeholder}
            </div>

        )
    }
});
module.exports = Textarea;