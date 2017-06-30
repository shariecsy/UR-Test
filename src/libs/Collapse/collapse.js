/*
 * Created by Administrator on 2016/12/9.
 */
/**
 * Collapse组件
 *
 * @param [afterCallBack] 回调函数
 * @param [arrow] 箭头
 * @param [headerCanClick] 头部是否可点击
 * @param [arrowCanClick] 箭头是否可点击
 * @param [accordion] 是否是手风琴效果
 *
 * 示例:
 *
 *     @example
 *     var collapseSettings = {
 *           afterCallBack : function(){
 *               console.log("回调");
 *           }
 *       };
 *       var panelOneSettings = {
 *           arrow : {
 *               style : {
 *                   top: "0",
 *                   right: "50px"
 *               },
 *               openContent : "修改↓",
 *               closeContent : "修改↑"
 *           },
 *           headerCanClick: false,
 *           arrowCanClick: true
 *       };
 *       var panelTwoSettings = {
 *           arrow : {
 *               style : {
 *                   top: "0",
 *                   left: "16px"
 *               },
 *               openContent : "v",
 *               closeContent : ">"
 *           },
 *           headerCanClick: true,
 *           arrowCanClick: true
 *       };
 *        <Collapse {...collapseSettings}>
 *            <Panel title={<h4 style={{color: "#000"}}>This is panel header 1</h4>} key="1" {...panelOneSettings}>
 *                <div>
 *                    姓名：<input type="text" className="name" /><br /><br />
 *                    电话：<input type="text" className="phone" />
 *                </div>
 *            </Panel>
 *            <Panel title={'This is panel header 2'} key="2" {...panelOneSettings}>
 *               <p>内容1</p>
 *            </Panel>
 *            <Panel title={'This is panel header 3'} key="3" {...panelOneSettings}>
 *               <p>内容2</p>
 *            </Panel>
 *        </Collapse>
 *        <Collapse accordion>
 *            <Panel title={'This is panel header 1'} key="1" {...panelTwoSettings}>
 *               <p>内容1</p>
 *            </Panel>
 *            <Panel title={'This is panel header 2'} key="2" {...panelTwoSettings}>
 *               <p>内容2</p>
 *            </Panel>
 *            <Panel title={'This is panel header 3'} key="3" {...panelTwoSettings}>
 *               <p>内容3</p>
 *            </Panel>
 *        </Collapse>
 */
var Collapse = React.createClass({
    getDefaultProps: function(){
        return {
            afterCallBack: function(){

            }
        }
    },
    getInitialState: function () {
        var _this = this;
        return {
            panelChildren: React.Children.map(_this.props.children,function(o,i){
                return React.cloneElement(o, {
                    key: i ,
                    panelKey:i,
                    active : i==0?true:false,
                    animClassName : "",
                    arrowContent : i==0?o.props.arrow.openContent:o.props.arrow.closeContent,
                    height: i==0?46:0,
                    callback: _this.callback
                });
            })
        }
    },
    componentWillMount: function(){
    },
    componentDidMount: function(){
    },
    componentDidUpdate: function(){
        this.props.afterCallBack();
    },
    callback: function(key){
        var _this = this;
        _this.setState({
            panelChildren: React.Children.map(_this.props.children,function(o,i){
                if(_this.props.accordion){//判断是否是手风琴
                    return i == key ? React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : !_this.state.panelChildren[i].props.active,
                        animClassName : "ucs-collapse-anim-active",
                        arrowContent : _this.state.panelChildren[i].props.active?o.props.arrow.closeContent:o.props.arrow.openContent,
                        //height: _this.state.panelChildren[i].props.active?0:46,
                        callback: _this.callback
                    }):React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : false,
                        animClassName : "ucs-collapse-anim-active",
                        arrowContent : o.props.arrow.closeContent,
                        //height:0,
                        callback: _this.callback
                    });
                }else{
                    return i == key ? React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : !_this.state.panelChildren[i].props.active,
                        animClassName : "ucs-collapse-anim-active",
                        arrowContent : _this.state.panelChildren[i].props.active?o.props.arrow.closeContent:o.props.arrow.openContent,
                        //height: _this.state.panelChildren[i].props.active?0:46,
                        callback: _this.callback
                    }):React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : _this.state.panelChildren[i].props.active,
                        animClassName : "",
                        arrowContent : _this.state.panelChildren[i].props.active?o.props.arrow.openContent:o.props.arrow.closeContent,
                        //height: _this.state.panelChildren[i].props.height,
                        callback: _this.callback
                    });
                }

            })
        });
        /*setTimeout(function(){
            _this.setState({
                panelChildren: React.Children.map(_this.props.children,function(o,i){
                    return React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : _this.state.panelChildren[i].props.active,
                        animClassName : "",
                        callback: _this.callback
                    });
                })
            });
        },200);*/
    },
    render: function(){
        var _this = this;
        var children = _this.state.panelChildren;
        return (
            <div className="ucs-collapse">{children}</div>
        );
    }
});

module.exports = Collapse;