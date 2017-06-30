
var Calendar = require('./calendar');
/*
 * Created by Administrator on 2017/2/15.
 */
/**
 * DatePicker组件
 *
 * @param [curDate] 当前日期
 * @param [placeholder] 日期输入框提示语
 * @param [name] 日期输入框name值
 * @param [format] 日期显示格式
 * @param [time] 是否显示时间hh:mm:ss
 *
 * 示例:
 *
 *     @example
 *     <DatePicker curDate={curDate} placeholder={placeholder} name={name} format={format} time={time}/>
 */
var DatePicker = React.createClass({
    getDefaultProps: function(){
        return {
            curDate: "",
            placeholder: "Select date",
            name: "",
            format: "yyyy-mm-dd",
            time: false
        }
    },
    getInitialState: function () {
        return {

        }
    },
    componentWillMount: function(){

    },
    componentDidMount: function(){
        if (document.addEventListener) {
            document.addEventListener('click', this.onDocumentClick);
        } else {
            document.attachEvent('click', this.onDocumentClick);
        }
    },
    componentWillUnmount: function(){
        this._unrenderLayer();
        if(this._layer){
            //document.body.removeChild(this._layer);
            this._layer = null;
        }

        if (document.addEventListener) {
            document.removeEventListener('click', this.onDocumentClick);
        } else {
            document.detachEvent('click', this.onDocumentClick);
        }
    },
    componentDidUpdate: function(){
        if(this._layer){
            this._renderLayer();
        }
    },
    renderLayer: function(){
        var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
        var scrollLeft=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
        var style = {
            "top": (this.refs["ucs-calendar-picker-input"].getBoundingClientRect().top+scrollTop)+"px",
            "left": (this.refs["ucs-calendar-picker-input"].getBoundingClientRect().left+scrollLeft)+"px"
        }
        return (
            <div>
                <Calendar curDate={this.refs["ucs-calendar-picker-input"].value} callBack={this.callBack} style={style} time={this.props.time}/>
            </div>
        );
    },
    _renderLayer: function() {
        var layerElement = this.renderLayer();

        if (layerElement === null) {
            ReactDOM.render(<noscript />, this._layer);
        } else {
            ReactDOM.render(layerElement, this._layer);
        }
        /*if (this.layerDidMount) {
         this.layerDidMount(this._layer);
         }*/
    },
    _unrenderLayer: function() {
        /*if (this.layerWillUnmount) {
         this.layerWillUnmount(this._layer);
         }*/
        if(this._layer){
            ReactDOM.unmountComponentAtNode(this._layer);
        }
    },
    onDocumentClick: function(){
        /*if(this._layer){
            document.body.removeChild(this._layer);
            this._layer = null;
        }*/
        if(document.getElementById("datePickerLayerId")){
            document.body.removeChild(document.getElementById("datePickerLayerId"));
            this._layer = null;
        }
    },
    clickHandler: function(e){
        e.nativeEvent.stopImmediatePropagation();
        if(document.getElementById("datePickerLayerId")){
            document.body.removeChild(document.getElementById("datePickerLayerId"));
        }
        this._layer = document.createElement('div');
        this._layer.id = "datePickerLayerId";
        document.body.appendChild(this._layer);

        this._renderLayer();
    },
    callBack: function(curDate,curTime){
        if(this.props.format.indexOf("-")>0){
            if(this.props.time){
                this.refs["ucs-calendar-picker-input"].value = curDate.replace(/\//g,"-")+" "+curTime;
            }else{
                this.refs["ucs-calendar-picker-input"].value = curDate.replace(/\//g,"-");
            }
        }else{
            if(this.props.time){
                this.refs["ucs-calendar-picker-input"].value = curDate+" "+curTime;
            }else{
                this.refs["ucs-calendar-picker-input"].value = curDate;
            }
        }
        if(this._layer){
            document.body.removeChild(this._layer);
            this._layer = null;
        }
    },
    /**
     * DatePicker
     * @return {string}
     * */
    getValue: function(){
        return this.refs['ucs-calendar-picker-input'].value;
    },
    render: function(){
        var _this = this;
        return (
            <span className="ucs-calendar-picker">
                <span>
                    <input value={_this.props.curDate} placeholder={_this.props.placeholder} ref="ucs-calendar-picker-input" name={_this.props.name} className="ucs-calendar-picker-input" onClick={_this.clickHandler}/>
                    <span className="ucs-calendar-picker-icon"></span>
                </span>
            </span>
        );
    }
});

module.exports = DatePicker;