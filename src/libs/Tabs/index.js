var TabItem=React.createClass({
    render:function(){
        return (this.props.children);
    }
});

/**
 * 标签页组件
 * @author phy <yao.qianfeng@ucsmy.com>
 *
 *     @example
 *     <Tabs defaultActiveKey={0} onClick={callback}>
 *          <TabItem tab="Tab 1">Content of Tab Pane 1</TabItem>
 *          <TabItem tab="Tab 2">Content of Tab Pane 2</TabItem>
 *          <TabItem tab="Tab 3">Content of Tab Pane 3</TabItem>
 *          <TabItem tab="Tab 4">Content of Tab Pane 4</TabItem>
 *     </Tabs>
 */
var Tabs=React.createClass({
    propTypes:{
        defaultActiveKey:React.PropTypes.number
    },

    getDefaultProps:function(){
        return {
            disabled:false,
            defaultActiveKey:0
        }
    },

    getInitialState:function(){
        return {
            currentIndex : this.props.defaultActiveKey
        };
    },

    /**
     * 检查标题的索引号
     * @param index
     * @returns {*}
     */
    checkTitleIndex:function(index){
        if(this.state.currentIndex==-1){
            return "";
        }else{
            return index===this.state.currentIndex ? "ucs-tabs-active" : "";
        }
    },

    /**
     * 检查内容项容器的索引号
     * @param index
     * @returns {*}
     */
    checkContentIndex:function(index){
        if(this.state.currentIndex==-1){
            return "none";
        }else{
            return index===this.state.currentIndex ? "block" : "none";
        }
    },

    /**
     * 点击事件处理函数
     * @param index
     * @param disabled
     * @private
     */
    _handleClick:function(index,disabled){
        if(!disabled){
            this.setState({currentIndex : index})
        }
    },

    render:function(){
        var _self=this;
        return(
            <div className="ucs-tabs">
                <div className="ucs-tabs-bar">
                    <ul>
                        { React.Children.map( this.props.children , function(element,index){
                            var disabled=element.props.disabled?'disabled':'';
                            return(
                                <li onClick={ function(){_self._handleClick(index,element.props.disabled)} } className={disabled+" "+_self.checkTitleIndex(index) }>
                                    { element.props.tab }
                                </li>
                            );
                        }) }
                    </ul>
                </div>
                <div className="ucs-tabs-content">
                    {React.Children.map(this.props.children,function(element,index){
                        return(
                            <div className="ucs-tabs-tabpane" style={{ "display": _self.checkContentIndex(index) }}>
                                {element.props.children}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});

Tabs.TabItem=TabItem;
module.exports = Tabs;