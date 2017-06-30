var classnames = require('classnames');
/**
 * Input组件
 * @class Input
 * @extends Basic
 *
 * 示例:
 *
 *     @example
 *     <Input placeholder="default" id="name" ref="ddd" value="333" onChange={this.onchange}/>
 */
var Input = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value,
            spanPlaceholder: true,
            onPaste: this.props.onPaste,
            className:classnames('ucs-input',this.props.className,this.props.disabled ? 'disabled' : '')
        }
    },
    getDefaultProps: function () {
        return {

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
        if(this.props.value !== nextProps.value){
            this.setState({
                value: nextProps.value,
                spanPlaceholder: nextProps.value ? false : true
            });
        }else {
            //console.log('不用')
        }

    },
    /**
     * Input的value改变时执行的事件
     * @param e
     *
     * */
    onChange: function (e) {
        console.log('change')
        this.setState({
            value: e.target.value,
            spanPlaceholder: e.target.value ? false : true
        });
        this.props.onChange ? this.props.onChange(e) : "";
    },
    /**
    * Input获取焦点时执行的事件
    * @param e
    *
    * */
    onFocus: function (e) {
        console.log('focus')
        //根据ie10的标准，获得焦点时提示是会消失的，因此失去焦点也要相应的处理
        this.setState({
            spanPlaceholder: false
        });
        this.props.onFocus ? this.props.onFocus(e) : "";
    },
    /**
     * Input失去焦点时执行的事件
     * @param e
     *
     * */
     onPaste: function (e) {
        if(this.props.type==='password'){
            e.preventDefault();
        }  
    },
    /**
    * Input为密码框的时候禁止输入空格
    * @param e
    *
    * */
    onKeydown:function(e){
        var e = e || window.event;
            if(e.keyCode == 32){
                 e.preventDefault();
            }
    },
    onBlur: function (e) {
        console.log('blur');
        this.setState({
            spanPlaceholder: e.target.value ? false : true
        });
        this.props.onBlur ? this.props.onBlur(e) : "";
    },
    _handlePlaceholderClick: function () {

        //让文字框获得焦点
        this.refs.inputtext.focus();
    },
    /**
     * 设置Input的value
     * @param {string} v
     * Input的value
     *
     * */
    setValue: function (v) {
        this.setState({value: v});
    },
    /**
     * 获取Input的值
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
        if (this.props.placeholder && !('placeholder' in document.createElement('input'))) {
            placeholder = (<span className="ucs-placeholder" style={spanPlaceholder}
                                 onClick={this._handlePlaceholderClick}>{this.props.placeholder}</span>);
        }
        return (
            <div className="ucs-input-control">
                <input type="text" {...this.props}
                       value={this.state.value}
                       className={this.state.className}
                       maxLength={this.props.maxlength}
                       ref="inputtext" onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} onPaste={this.onPaste} onKeyDown={this.onKeydown}/>
                {placeholder}
            </div>

        )
    }
});
module.exports = Input;