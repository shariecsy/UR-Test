var classnames = require("classnames");
    /**
     * Radio组件
     *
     * @param [checked] 是否选中
     * @param [disabled] 是否禁用
     *
     * 示例:
     *
     *     @example
     *     <Radio/>
     */
var Radio = React.createClass({
    getInitialState: function () {
        return {
            disabled: this.props.disabled,
            checked: this.props.checked
        }
    },
    getDefaultProps: function () {
        return {
            disabled: false,
            checked: false
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if(this.props !== nextProps) {
            this.setState({
                disabled: nextProps.disabled,
                checked: nextProps.checked
            });
        // }else {

        }
    },
    handleChange: function (e) {
        var t = e.target.value;
        this.setState({checked: !this.state.checked},function () {
            this.props.onChange ? this.props.onChange(t,this.state.checked) : "";
        });


    },
    /**
     * 获取Radio的值
     * @return {string}
     * */
    getValue: function () {
        return this.refs.radio.checked
    },
    /**
     * 设置Radio的value
     * @param {string} v
     * Radio的value
     *
     * */
    setValue: function (bool) {
        this.setState({checked:bool});
        this.props.checked = bool;
    },
    render: function () {
        var props = {
                name: this.props.name,
                value: this.props.value,
                onChange: this.handleChange,
                disabled: this.state.disabled ? "disabled" : "",
                className: "ucs-radio-input",
                checked: this.state.checked
            }
            ;
        var lt8 = true;
        if ('borderRadius' in document.createElement('div').style) {
            lt8 = false;
        }
        return (
            <label className={classnames('ucs-radio',{'checked':this.state.checked},{'disabled':this.state.disabled},{'lt8':lt8})}>
                <input type="radio" {...props} ref="radio"/>
                <span className="ucs-radio-inner"></span>
                <span className="text">{this.props.children}</span>
            </label>
        )
    }
});
Radio.RadioGroup = require('./RadioGroup');
module.exports = Radio;
