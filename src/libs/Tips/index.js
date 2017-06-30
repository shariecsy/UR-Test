/**
     * Tips组件
     *
     * @param message 提示文本内容
     * @param icon icon图标
     * @param close 关闭按钮，不传则不显示
     * @param position 提示框位置，leftTop，middleTop，rightTop，leftMiddle，middle，rightMiddle，leftBottom，middleBottom，rightBottom
     *
     * 示例:
     *
     *     @example
     *     <Tips id="tips" name="tipsName" message="警告提示文字内容" icon="warning"  position="middle"/>
     */
var Tips = React.createClass({
            getDefaultProps:function (){
                return {
                    message:"",
                    icon:"",
                    close:"",
                    position:"middle",
                    id:"",
                    name:""
                }   
            },
            closeHandle:function(){
                this.refs.ucsTips.style.display = "none";
            },
            componentDidMount:function(){
                /*var that = this.refs.ucsTips;
                setTimeout(function(){that.style.display = 'none'}, 3000);*/
            },
            render:function (){
                var showIcon = this.props.icon?"inline-block":"none";
                var showClose = this.props.close?"block":"none";

                return (
                    <div id={this.props.id} name={this.props.name} className={'ucs-tips '+this.props.position} ref="ucsTips">
                        <i className={'ucs-tips-icon iconfont icon-'+this.props.icon} style={{display:showIcon}}></i>
                        <span className="ucs-tips-message">{this.props.message}</span>
                        <span className="ucs-tips-close" style={{display:showClose}} onClick={this.closeHandle}>{this.props.close}</span>
                    </div>
                )       
            }
        });

module.exports = Tips;


