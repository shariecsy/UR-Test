var Tooltip = require('../Tooltip/index.js');
var classnames = require('classnames');

/**
 *
 * 初级表格
 *
 * @param [data] 数据源
 *
 * @param [className] 组件的div的class
 *
 * @param [bordered]  是否显示边框
 *
 * @param [striped]  是否隔行变色
 *
 * @param [hover]  是否悬浮变色
 *
 * @param [hasThead]  是否有头部
 *
 * @param [isSortDisplay]  是否显示 排序
 *
 * @param [isTextOverflowHidden]  文本是否超出一行隐藏
 *
 * @constructs
 * @author huangdebin
 * Table
 *
 * 示例:
 *
 *     @example
 *     <Table id="mytable" ref="mytable" bordered={true} striped={false} hover={true} hasThead={true} isTextOverflowHidden={true} data={data} columns={columns} />
 */
var Table = React.createClass({
    getDefaultProps:function() {
        return {
            id:'',
            data: [],
            className: '',
            bordered: false,
            striped: false,
            hover: false,
            hasThead: true,
            isSortDisplay:false,
            isTextOverflowHidden: false
        }
    },
    getInitialState:function() {
        return {
            stateData: this.props.data,     //数据列表
            sortColumn: '',                 //排序列
            sortStatus: ''                  //排序方向
        }
    },
    /**
     * 排序当前点击列
     * @param {string} column
     * 要排序的列名
     * @param {string} status
     * 排序方向，升序或降序
     * */
    sortHandle:function(column, status){
        this.setState({
            sortColumn:column,
            sortStatus:status
        });
        {this.props.sortHandle && this.props.sortHandle(column, status)}
    },
    renderHeader:function(columns) {
        var RootThis = this;
        var headers = [];
        //遍历表头columns
        columns.forEach(function(header, i) {
            if(header.hidden) {
                return;
            }
            headers.push(
                <Header
                    header={header.header}
                    name={header.name}
                    subHeader={header.subHeader}
                    width={header.width}
                    isSortDisplay={RootThis.props.isSortDisplay}
                    sort={header.sort}
                    sortColumn={RootThis.state.sortColumn}
                    sortStatus={RootThis.state.sortStatus}
                    sortHandle={RootThis.sortHandle}
                    key={header.name || i}
                    className={header.className}/>
            );
        })
        return <thead><tr>{headers}</tr></thead>;
    },
    getTextWidth:function(v) {
        var _div = document.getElementById('textWidthTempWrap');
        if(_div === null){
            var _div = document.createElement('div');
            _div.id = 'textWidthTempWrap';
            _div.style = 'position:absolute; visibility:hidden;';
            document.body.appendChild(_div);
        }
        _div.innerHTML = encodeURIComponent(v);
        return { width: _div.offsetWidth, height: _div.offsetHeight };
    },
    renderBody:function(columns) {
        if (!columns) return;
        var data = this.state.stateData;
        var hasThead = this.props.hasThead;
        var that = this;
        //如果data不是数组，直接显示data内容，可用于列表为空的情况
        if (!Array.isArray(data)) {
            return (
                <tbody>
                <tr>
                    <td colSpan={columns.length}>{data}</td>
                </tr>
                </tbody>
            )
        }
        //如果data数组长度是0
        if (data.length == 0) {
            return (
                <tbody>
                <tr>
                    <td colSpan={columns.length}>暂无数据</td>
                </tr>
                </tbody>
            )
        }
        //遍历data
        var trs = data.map(function(data, trIndex) {
            var tds = [];
            columns.map(function(columnItem, j){
                var name = columnItem.name;
                var content = columnItem.content !== undefined ? columnItem.content : '';
                var hidden = columnItem.hidden ? true : false;
                var width = columnItem.width !== undefined ? columnItem.width : 'auto';

                //当前列有hidden属性，不渲染
                if (hidden) return;

                var tdContent = columnItem.content ? columnItem.content(data, trIndex, j) : data[name];

                if(!hasThead){
                    if(trIndex == 0){
                        //如果没有表头，第一行需定义宽度
                        tds.push(
                            <td key={j} style={{width: width, maxWidth: width}}>
                                {tdContent}
                            </td>
                        );
                    }else{
                        tds.push(
                            <td key={j}>{tdContent}</td>
                        );
                    }
                }else{
                    //有表头
                    if(columnItem.content){
                        tds.push(
                            <td key={j}>{tdContent}</td>
                        );
                    }else{
                        if(that.props.isTextOverflowHidden){
                            var _TextWidth = that.getTextWidth(tdContent).width;
                            if(_TextWidth > width){
                                tds.push(
                                    <td key={j}>
                                        <Tooltip title={tdContent}><div className="text-auto" style={{width: width}}>{tdContent}</div></Tooltip>
                                    </td>
                                )
                            }else{
                                tds.push(
                                    <td key={j}>{tdContent}</td>
                                );
                            }
                        }else{
                            tds.push(
                                <td key={j}>{tdContent}</td>
                            );
                        }
                    }
                }
            })
            if(trIndex % 2){
                var trClassName = 'odd-bg';
            }else{
                var trClassName = 'even-bg';
            }
            return <tr className={trClassName} key={data.id}>{tds}</tr>
        });
        return <tbody>{trs}</tbody>;
    },
    /**
     * 设置Table的数据
     * @param {object} obj
     * GridTable的数据源
     *
     * */
    setValue: function (v) {
        this.setState({stateData: v});
    },
    /**
     * 获取Table的值
     * @return {string}
     * */
    getValue: function () {
        return this.state.stateData
    },
    /**
     * 获取Table里的组件的ref值
     * @return {object}
     * */
    getChildrenRefs:function(){
        return this.refs;
    },
    componentWillReceiveProps:function(nextProps){
        if(this.props.data !== nextProps.data){
            this.setState({stateData:nextProps.data});
        }
    },
    render:function() {
        var hover = this.props.hover;
        var bordered = this.props.bordered;
        var striped = this.props.striped;
        var columns = this.props.columns;

        var className = classnames(
            'ucs-table',
            hover && 'ucs-table-hover',
            bordered && 'ucs-table-bordered',
            striped && 'ucs-table-striped',
            this.props.className
        );

        return (
            <div className={className}>
                <table id={this.props.id}>
                    { columns && this.props.hasThead ? this.renderHeader(columns) : '' }
                    { columns && this.renderBody(columns) }
                </table>
            </div>
        )
    }
});

var Header = React.createClass({
    //获取排序图标的class
    getClassName:function(base, name, status) {
        return classnames(
            base,
            this.props.sortColumn === name && this.props.sortStatus === status && 'active'
        )
    },
    sortClick:function(t, sortStatus) {
        var name = t.props.name;
        if(name === this.props.sortColumn && sortStatus === this.props.sortStatus) return;
        this.props.sortHandle(name, sortStatus);
    },
    render:function() {
        var header = this.props.header;
        var name = this.props.name;
        var width = this.props.width;
        var subHeader = this.props.subHeader;
        var isSortDisplay = this.props.isSortDisplay;
        var sort = this.props.sort;
        var className = this.props.className;
        var sortIcons = [
            <a key="up" className={this.getClassName('sort-up', name, 'asc')} onClick={this.sortClick.bind(this, this, 'asc')} />,
            <a key="down" className={this.getClassName("sort-down", name, 'desc')}  onClick={this.sortClick.bind(this, this, 'desc')} />
        ]
        return <th style={{width:width, maxWidth: width}} className={className}>
            <span className="th-header">{header}</span>
            {subHeader && <span className="th-subheader">{subHeader}</span>}
            {isSortDisplay && sort && sortIcons}
        </th>
    }
});

module.exports = Table;
