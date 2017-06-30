var classnames = require('classnames');
    /**
     * Checkbox组件
     *
     * @param [checked] 是否选中
     * @param value value值
     * @param [text] 显示的文案
     * @param [disabled] 是否禁用
     *
     * 示例:
     *
     *     @example
     *     <Checkbox ref="checkref" id="11" value="复选框1"  text="自定义内容" eventId="first"/>
     */
var Checkbox = React.createClass({
    getInitialState: function(){
        return {
            checked:this.props.checked ? this.props.checked : false,
            disabled:this.props.disabled,
            className:classnames('ucs-checkbox-input',this.props.className),
            value: this.props.value,
            text:this.props.text
        }
    },
        /**
         * Checkbox点击事件
         * @param {object} args
         * 返回组件的state值
         * */
    onClick: function (args) {
        this.setState({checked:!this.state.checked});
        args.checked = !this.state.checked;
        this.props.onClick ? this.props.onClick(args) : "";
    },
       /**
        * 获取Checkbox的值
        * @return {string}
        * */
    getValue: function () {
        return this.state.value;
    },
        /**
         * 设置Checkbox的value
         * @param {string} v
         * Checkbox的value
         *
         * */
    setValue: function (v) {
        this.setState({value:v})
    },
        /**
         * 获取Checkbox的显示文字
         * @return {string}
         * */
    getText: function () {
        return this.state.text;
    },
        /**
         * 设置Checkbox的显示文字
         * @param {string} v
         *
         * */

    setText: function (v) {
        this.setState({text:v})
    },
        /**
         * 获取Checkbox的checked值
         * @return {string}
         * */
    getChecked:function () {
        return this.state.checked;
    },
        /**
         * 设置Checkbox的value
         * @param {string} v
         * Checkbox的checked值
         *
         * */
    setChecked:function (v) {
        this.setState({checked:v});
    },
    componentWillReceiveProps:function (nextProps) {
        if(this.props.value !== nextProps.value){
            this.setState({
                value:nextProps.value,
                checked:nextProps.checked,
                text:nextProps.text});
        }else {
            //console.log('不用')
        }

    },
    componentDidMount: function(){
        var that = this;
        UEventHub.on(that.props.eventId ? that.props.eventId : 'checkAllEvent',function(bool){
            that.setState({checked: bool});
        });
    },
    render:function  () {
        var that = this;
        var lt8 = true;
        if ('borderRadius' in document.createElement('div').style) {
            lt8 = false;
        }
        return <label className={classnames('ucs-checkbox',{'checked':this.state.checked},{'disabled':this.state.disabled},{'lt8':lt8})}>
            <input type="checkbox" {...this.props} checked ={this.state.checked} className={this.state.className} name={this.props.name} onClick={that.onClick.bind(that,that.state)}   />
            <span className="ucs-checkbox-inner" onClick={this.handleClick}></span>
            <span className="ucs-checkbox-text" title={this.state.text}>{this.state.text}</span>
        </label>
    }
})

module.exports = Checkbox;
