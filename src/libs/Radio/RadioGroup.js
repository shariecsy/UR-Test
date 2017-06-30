    /**
     * RadioGroup组件
     * @param [name] 组名
     * @param [onChange] 回调
     *
     * 示例
     *
     *     @example
     *     <RadioGroup value={this.state.value} onChange={this.onChange} name="abc" ref="radioGroup" id="optional">
     *      <Radio value="1" disabled>选项1</Radio>
     *      <Radio value="2">选项2</Radio>
     *      <Radio value="3">选项3</Radio>
     *      <Radio value="4">选项4</Radio>
     *      <Radio value="5">选项5</Radio>
     *     </RadioGroup>
     *
    　*/
var RadioGroup = React.createClass({
    getInitialState: function () {
        return {value: this.props.value}
    },
    componentWillReceiveProps: function (nextProps) {
        if(this.props.value !== nextProps.value) {
            this.setState({value: nextProps.value});
        // }else {

        }
    },
    _handleChange: function (e) {
        this.setState({value: e});
        this.props.onChange ? this.props.onChange(e) : "";
    },
    getValue: function () {
        return this.state.value;
    },
    setValue: function (v) {
        this.setState({value: v});
    },
    render: function () {
        var that = this;

        return (
            <div className="radio-group" id={this.props.id}>
                {
                    React.Children.map(this.props.children, function (child, index) {
                        return React.cloneElement(child, {
                            name: this.props.name,
                            onChange: this._handleChange,
                            checked: this.state.value == child.props.value ? true : false
                        });
                    }.bind(this))
                }
            </div>
        )
    }
});
module.exports = RadioGroup;