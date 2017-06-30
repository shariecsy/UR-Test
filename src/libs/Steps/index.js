/*
 * 参数
 * icon　图标
 * title　标题
 * description　描述
 * className 类名
 * */
var classnames = require("classnames");
    /**
     * Steps组件
     *
     * @param [icon] 图标
     * @param [title] 标题
     * @param [description] 描述
     * @param [className] 类名
     *
     * 示例
     *
     *     @example
     *     var Steps = UcsmyUI.Steps;
     *     var Step=Steps.Step;
     *     <Steps current="3">
     *      <Step title="找回方式" description="1" icon="icon图">这里也可以有内容</Step>
     *      <Step title="验证账号" description="2" icon="icon图">能适应多种要求</Step>
     *      <Step title="重围密码" description="3" icon="icon图">3</Step>
     *      <Step title="找回成功" description="4" icon="icon图">4</Step>
     *     </Steps>
     *
     */
var Steps = React.createClass({
    getDefaultProps: function () {
        return {
            icon: "",
            title: "",
            description: ""
        }
    },
    render: function () {
        var that = this;
        return (
            <div className={classnames("ucs-steps",this.props.className)}>
                {React.Children.map(this.props.children, function (el, index) {
                    return (
                        <div className={classnames("ucs-steps-item",{"ucs-steps-active":this.props.current>index})}>
                            {el.props.icon ?
                                <i className={"iconfont icon-"+el.props.icon}></i> : ""
                            }
                            {el.props.title ?
                                <div className="ucs-steps-title">{el.props.title}</div>
                                : ""}
                            {el.props.description ?
                                <div className="ucs-steps-description">{el.props.description}</div>
                                : ""}
                            <div className="ucs-steps-line"></div>
                            {el.props.children}
                        </div>
                    )
                }.bind(this))
                }
            </div>
        )
    }
});
Steps.Step = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});
module.exports = Steps;