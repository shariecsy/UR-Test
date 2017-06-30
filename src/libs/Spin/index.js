 /**
     *  weishuxian
     * 旋转组件
     *
     * @param [size] 旋转 大小
     *
     * 示例:
     *
     *     @example
     *     <Spin size="small"></Spin>
     *
     *     <Spin size="large"></Spin>
     *
     */
var Spin = React.createClass({
    render:function(){
        var addClass;
        if(this.props.size == "small" ){
            addClass = "ucs-spin-sm";
        }else if(this.props.size == "large"){
            addClass = "ucs-spin-lg";
        }else{
            addClass = " ";
        }
        var spinClass = "ucs-spin" + " " + addClass + " " + "ucs-spin-spinning";
        var spinDotClass = "ucs-spin-dot";
        return(
            <div className={spinClass}>
              <span className={spinDotClass}>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
        )
    }
})

module.exports = Spin;




