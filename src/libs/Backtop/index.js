
var classnames = require('classnames');
    /**
     * 回到顶部组件
     * 
     * @param  [visibilityHeight] 自定义滚动高度，默认400
     * 
     * @param [right] 距离右边的大小，默认20px
     * 
     * @param [onClick]  点击事件，默认为空，自定义点击后执行的事件
     *
     * 
     * @author chenzefang
     * 
     * 示例： 
     * 
     *     @example
     *     <Backtop visibilityHeight='100' right='100' />
     */
var Backtop = React.createClass({   // 自定义宽高50
    getDefaultProps: function(){
        return {
            id: '',
            visibilityHeight: '400', //可配置滚动多高才出现，默认400
            right: '20'
        }
    },
    getInitialState: function(){
        return {
            right:'-120px',
            className: classnames('ucs-backtop',this.props.className)
        }
    },
    onClick: function(){
        document.body.scrollTop = 0;
        this.setState({right:'-120px'});
        this.props.onClick? this.props.onClick():null;
    },
    componentDidMount: function(){
        if(document.addEventListener){
            window.addEventListener('scroll',function(){
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                if(t > this.props.visibilityHeight){
                    this.setState({right:this.props.right+'px'});
                }else{
                    this.setState({right:'-120px'});

                }
            }.bind(this))
        }else {
            window.attachEvent('onscroll',function(){
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                if(t > this.props.visibilityHeight){
                    this.setState({right:this.props.right+'px'});
                }else{
                    this.setState({right:'-120px'});

                }
            }.bind(this))
        }

    },
    render:function(){
        return(
            <div ref='backtop' {...this.props} style={{right:this.state.right}} className={this.state.className} onClick={this.onClick}>{this.props.children}</div>
        )
    }
})
module.exports = Backtop;



