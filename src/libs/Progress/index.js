/**
 * Created by DuHuiling on 2017/2/6.
 */

var setClass = require('classnames');
/**
 *	@author DuHuiling
 *
 * @param [percent] {number}
 * 	百分比
 *
 * @param [format] {string | ReactDom}
 *	提示文本
 *
 * @param [showInfo] {boolean}
 *	是否显示进度数值或状态图标
 *
 * @param [infoPosition]
 *  文本位置
 *
 * 实例：
 *
 * 		@example
 *
 * 1.默认显示百分比
 *
 * 		<Progress type = "line" percent = {30}></Progress>
 *
 * 2.format可修改显示文案,showInfo:true(默认)时才生效
 *
 * 		<Progress type = "line" percent = {30} format = '满标'></Progress>
 *
 * 3.format可以是字体图标/元素
 *
 * 		<Progress type = "line" percent = {70} format = {<i style={{'width':'20px','height':'20px','background':'red','display':'inline-block'}}></i>}></Progress>
 *
 * 4.不显示文案
 *
 * 		<Progress type = "line" percent = {50} showInfo = {false}></Progress>
 *
 * 	5.如果需要修改文案位置,请自行在className中添加class修改,infoPosition可设置progress-text的style
 *
 * 		<Progress className = "top" type = "line" percent = {30} format = "top"></Progress>
 * 		<Progress className = "top" type = "line" percent = {40} format = "infoPosition" infoPosition></Progress>
 * 		<Progress className = "top" type = "line" percent = {40} format = "infoPosition" infoPosition={{'left':'40%','margin-left':'-40px'}}></Progress>
 */
var Progress = React.createClass({
    getDefaultProps: function() {
        return {
            type: 'line',
            showInfo: true,
            percent: 0
        };
    },
    render: function(){
        var showInfo = this.props.showInfo;
        var info;
        var infoPos = this.props.infoPosition;
        var textProps = {};

        if(showInfo){
            if(infoPos){
                typeof (infoPos) == 'object'? (
                    textProps.style = infoPos
                ):(
                    textProps.style = {'left':this.props.percent + '%'}
                )
            }
            textProps.className = 'ucs-progress-text';
            if("format" in this.props){
                info = <span className = {textProps.className} style = {textProps.style}>{this.props.format}</span>;
            }else{
                info = <span className = {textProps.className} style = {textProps.style}>{this.props.percent}%</span>;
            }
        }
        var pClass = setClass('ucs-progress',this.props.className);
        return (
            <div className = {pClass} id = {this.props.id}>
                <div className="ucs-progress-inner">
                    <span className="ucs-progress-bg" style={{'width': this.props.percent + '%'}}></span>
                </div>
                {info}
            </div>
        )
    }
});

module.exports = Progress;