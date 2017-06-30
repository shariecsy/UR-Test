   /**
    * 开关组件
    *
    * @param [size] 按钮 大小
    *
    * @param [defaultChecked] 按钮开关状态 默认为false 表示关闭状态
    *
    * @param [checkedChildren] 按钮文本 例如 “开”
    *
    * @param [unCheckedChildren] 按钮文本 例如 “关”
    *
    * @param [disabled] 按钮滑动 默认为false
    *
    *
    * @author weishuxian
    *
    * 示例：
    *
    *     @example
    *     <Switch size="small" checkedChildren={'开'} unCheckedChildren={'关'} defaultChecked={true}></Switch>
    *
    *
    *     <Switch size="small" checkedChildren={'开'} unCheckedChildren={'关'} defaultChecked={true} disabled={true}></Switch>
    *
    */
var Switch = React.createClass({
    getInitialState: function() {
        return {checked: false,
            className:''};
    },
    handleClick: function() {
        if(this.props.disabled){
            return;
        }else{
            if(this.state.checked){
                if(this.props.size == "small"){
                    this.state.className = 'ucs-switch-small ucs-switch';
                }else{
                    this.state.className = 'ucs-switch';
                }
                this.setState({checked: !this.state.checked});
            }else{
                if(this.props.size == "small"){
                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-checked';
                }else{
                    this.state.className = 'ucs-switch ucs-switch-checked';
                }
                this.setState({checked: !this.state.checked});
            }
        }
        this.forceUpdate();
    },
    componentDidMount: function(){
        if(this.props.disabled){
            if(this.state.checked){
                if(this.props.size == "small"){
                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-checked ucs-switch-disabled ';
                }else {
                    this.state.className = 'ucs-switch ucs-switch-checked ucs-switch-disabled ';
                }
            }else{
                if(this.props.size == "small"){
                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-disabled ';
                }else {
                    this.state.className = 'ucs-switch ucs-switch-disabled ';
                }
            }

            if(this.props.defaultChecked){
                if(this.props.size == "small"){
                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-checked ucs-switch-disabled';
                }else{
                    this.state.className = 'ucs-switch ucs-switch-checked ucs-switch-disabled';
                }
                this.setState({checked: !this.state.checked});
            }else{
                if(this.props.size == "small"){
                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-disabled';
                }
                else{
                    this.state.className = 'ucs-switch ucs-switch-disabled';
                }
            }
        }else{
            if(this.props.defaultChecked){
                if(this.props.size == "small"){
                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-checked';
                }else{
                    this.state.className = 'ucs-switch ucs-switch-checked';
                }
                this.setState({checked: !this.state.checked});
            }else{
                if(this.props.size == "small"){
                    this.state.className = 'ucs-switch-small ucs-switch';
                }
                else{
                    this.state.className = 'ucs-switch';
                }
            }
        }
        this.forceUpdate();
    },
    render:function(){
        return(
            <span className={this.state.className} onClick={this.handleClick}>
                <span className="ucs-switch-inner">{this.state.checked?this.props.checkedChildren:this.props.unCheckedChildren}</span>
            </span>
        )
    }
})

module.exports = Switch;




