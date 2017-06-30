/**
 * Form组件
 *
 * @param [name] 表单名，一般不需要填写
 * @param [form] 默认输出form,填写时输出div
 * @param [formData] 验证数据
 * @param [validateType] 验证类型　1失去焦点和改变时触发（默认）　2失去焦点时触发　3不验证 （输入事件不是按钮点击事件）
 *
 * 示例:
 *
 *     @example
 *     <Form ref="form1" className="form" formData={}/>
 */
var Form = React.createClass({
    getInitialState: function () {
        return {
            formName: this.props.name ? this.props.name : 'form' + Math.random().toString(36).substr(2, 5)//随机给取个表单名
        }
    },
    getDefaultProps: function () {
        return {
            formData: "",
            validateType: 1
        }
    },
    childContextTypes: {
        formData: React.PropTypes.any,
        formName: React.PropTypes.any,
        validateType: React.PropTypes.any
        // formItemChange: React.PropTypes.any
    },
    getChildContext: function () {
        //定义三个参数给子组件获取
        return {
            formData: this.props.formData,
            formName: this.state.formName,
            validateType: this.props.validateType
            // formItemChange: this._itemChange
        }
    },
    validate: function (fn, filed) {
        var len = 0;
        var boolarry = [];
        var bool = true;
        if (filed) {
            len = filed.length;
        }
        else {
            for (var i in this.props.formData) {
                len++;
            }
        }
        UEventHub.emit('FORMSETVALIDATE' + this.state.formName, filed, function (b) {
            boolarry.push(b);
            if (!b) {
                bool = false
            }
            if (len === boolarry.length) {
                fn(bool);
            }
        });
    },
    componentDidMount: function () {

    },

    render: function () {
        var type = "";
        if (!this.props.form) {
            type = (<form {...this.props}>
                {this.props.children}
            </form>)
        } else {
            type = (<div {...this.props}>
                {this.props.children}
            </div>)
        }
        return type
    }
});
Form.FormItem = require('./formItem');

module.exports = Form;