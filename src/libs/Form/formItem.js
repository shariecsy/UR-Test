var classnames = require('classnames');
var Input = require('../Input/index');
var ValidateRules = require('./validateRules');

/**
 * FormItem组件,负责输出label、Item固定div标签和数据验证
 *
 * @param [label] 表单名，一般不需要填写
 * @param [className] 默认输出form,填写时输出div
 *
 *
 * 示例:
 *
 *     @example
 *     var Form = UcsmyUI.Form;
 *     var FormItem = Form.FormItem;
 *     <FormItem ref="formItem" className="test" label="字段名"/></FormItem>
 */
var FormItem = React.createClass({
    contextTypes: {
        formData: React.PropTypes.any,
        //formItemChange: React.PropTypes.any
        formName: React.PropTypes.any,
        validateType: React.PropTypes.any
    },
    getInitialState: function () {
        return {
            explainResult: "", //验证提示结果
            explainType: ""//验证类型，true正确或false错误
        }
    },
    getDefaultProps: function () {
        return {
            className: '',//formitem className
            label: ''//formitem label
        }
    },
    _formValidate: function (name, value) {
        value = value == undefined ? "" : value;
        //验证数据，根据name去提取验证规则，验证通过返回true
        if (this.context.formData[name] != undefined) {
            var rules = this.context.formData[name];
            if (rules) {
                var results = ValidateRules(value, rules);
                if (results) {
                    this.setState({
                        explainResult: results,
                        explainType: false
                    });
                    //添加错误样式
                    this._addErrorClass(name, 'add');
                    return false
                } else {
                    this.setState({
                        explainResult: '',
                        explainType: true
                    });
                    //删除样式
                    this._addErrorClass(name, 'remove');
                    return true
                }
            }
            else {
                return true;
            }
        } else {
            return true
        }
    },
    _addErrorClass: function (name, type) {
        var el = ReactDOM.findDOMNode(this);
        var input = el.querySelectorAll('[name="' + name + '"]');
        if (input[0].type === 'text' || input[0].type === 'password' || input[0].type === 'textarea') {
            if (type == 'add' && input[0].className.indexOf('error') == -1) {
                input[0].className += " error";
            } else if (type == 'remove') {
                input[0].className = input[0].className.replace(' error', '');
            }
        }
    },
    /**
     * 设置FormItem验证错误解释，适用于特殊情况下
     * @param {string} v
     * */
    setExplain: function (v) {
        //设置错误提示，API
        this.setState({
            explainResult: v,
            explainType: false
        })
    },
    componentDidMount: function () {
        //表单按钮提交时 接收表单验证指令，返回有验证规则的
        var el = ReactDOM.findDOMNode(this);
        if (!Array.indexOf) {
            Array.prototype.indexOf = function (obj) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == obj) {
                        return i;
                    }
                }
                return -1;
            }
        }
        if (this.context.formName) {
            UEventHub.on('FORMSETVALIDATE' + this.context.formName, function (filed, fn) {
                React.Children.map(this.props.children, function (child) {
                    var childName = child.props.name;
                    if (typeof (child.type) === 'function' && this.context.formData[childName] != undefined) {
                        var input = el.querySelectorAll('[name="' + childName + '"]');
                        var value = '';
                        if (filed) {
                            if (filed.indexOf(childName) != -1) {
                                value = getValue(input);
                                fn(this._formValidate(childName, value));
                            }
                        } else {
                            value = getValue(input);
                            fn(this._formValidate(childName, value));
                        }
                    }
                }.bind(this));
            }.bind(this));
            var getValue = function (input) {
                var value = '';
                if (input.length > 1) {
                    for (var i in input) {
                        if ((input[i].type === 'radio' || input[i].type === 'checkbox') && input[i].checked) {
                            value = input[i].value;
                        }
                    }
                } else {
                    value = input[0].value;
                }
                return value;
            };
        }
    },
    componentWillMount: function () {
    },
    _handleChildChange: function (child, value) {
        if (this.context.formData) {
            if (typeof (value) === 'object') {
                //input,radio传回的value
                this._handChangeComm(child.props.name, value.target.value)
            } else {
                this._handChangeComm(child.props.name, value);
            }
        }
        child.props.onChange ? child.props.onChange(value) : "";
    },
    _handChangeComm: function (name, value) {
        this._formValidate(name, value);
    },
    render: function () {
        var tips = "";
        if (this.state.explainType !== '') {
            if (this.state.explainType) {
                tips = (
                    <div className="ucs-form-explain success">
                        <i className="iconfont icon-success"/>
                    </div>
                );
            } else {
                tips = (
                    <div className="ucs-form-explain">
                        <i className="iconfont icon-failure" title={this.state.explainResult}/>
                        <span>{this.state.explainResult}</span>
                    </div>
                );
            }
        }
        var lable = "";
        if (this.props.label) {
            lable = (<label className="label">{this.props.label}</label>);
        }
        var type = parseInt(this.context.validateType);
        return (
            <div className={classnames('ucs-form-group',this.props.className)} ref="formItem">
                {lable}
                <div className="form-box">
                    {
                        React.Children.map(this.props.children, function (child) {
                            if (typeof (child.type) === 'function' && child.props.name) {
                                return React.cloneElement(child, {
                                    onChange: type == 1 ? this._handleChildChange.bind(this, child) : "",
                                    onBlur: (child.type === Input && type < 3)
                                        ? this._handleChildChange.bind(this, child) : ""
                                })
                            } else {
                                return child;
                            }
                        }.bind(this))
                    }
                </div>
                {tips}
            </div>
        )
    }
});
module.exports = FormItem;