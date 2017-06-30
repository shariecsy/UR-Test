
var classnames = require('classnames');
var Table = require('../Table/index.js');
var Pagination = require('../Pagination/index.js');
var SelectDropDown = require('../SelectDropDown/index.js');
var Input = require('../Input/index.js');
var Button = require('../Button/index.js');
/*
 State:
 gridData: 数据源放到state
 currentPage：当前页
 totalPage: 总页数
 itemsPerPage：每页几条
 filterInputValue：搜索文字
 sortColumn：排序列名
 sortStatus：排序方向
 */

var selectDropDownOptions1 = [{ option: "5" }, { option: "10" }, { option: "15" }, { option: "20" }, { option: "25" }, { option: "30" } ];

/**
 * 高级表格，包含筛选、排序、分页
 *
 * @param [data] 数据源
 *
 * @param [className] 组件的div的class
 *
 * @param [itemsPerPage]  表格每页显示多少条
 *
 * @param [currentPage]  初始化时显示第几页
 *
 * @param [isSetItemsPerPageDisplay]  是否显示每页显示数据条数下拉框
 *
 * @param [isFilterDisplay]  是否显示 过滤
 *
 * @param [isSortDisplay]  是否显示 排序
 *
 * @param [getData]  方法。获取新数据
 *
 * @constructs
 * @author huangdebin
 * GridTable
 *
 * 示例:
 *
 *     @example
 *     <GridTable id="idGridTable" ref="refGridTable" classNames={classNames} itemsPerPage={itemsPerPage} currentPage={currentPage} totalPage={totalPage} isSetItemsPerPageDisplay={true} isFilterDisplay={true} isSortDisplay={true} sortHandle={this.sortHandle} gridData={gridData} getData={this.getData} isTextOverflowHidden={true} columns={columns} />
 *
 */
var GridTable = React.createClass({
    getDefaultProps:function() {
        return {
            id:'',
            data: [],
            className: '',
            itemsPerPage: 10,
            currentPage: 1,
            isSetItemsPerPageDisplay: false,
            isFilterDisplay: false,
            isSortDisplay: false,
            isTextOverflowHidden: false
        }
    },
    getInitialState:function() {
        return {
            gridData: this.props.gridData,
            currentPage:this.props.currentPage,
            totalPage: this.props.totalPage,
            itemsPerPage:this.props.itemsPerPage,
            filterInputValue:'',
            sortColumn:'',
            sortStatus:''
        }
    },

    /**
     * 设置GridTable的数据
     * @param {object} obj
     * GridTable的数据源
     *
     * */
    setValue: function (obj) {
        var _obj = {};
        obj.gridData && (_obj.gridData = obj.gridData);
        obj.currentPage ? (_obj.currentPage = obj.currentPage) : (_obj.currentPage = 0);
        obj.totalPage ? (_obj.totalPage = obj.totalPage) : (_obj.totalPage = 0);
        obj.itemsPerPage && (_obj.itemsPerPage = obj.itemsPerPage);
        obj.filterInputValue && (_obj.filterInputValue = obj.filterInputValue);
        obj.sortColumn && (_obj.sortColumn = obj.sortColumn);
        obj.sortStatus && (_obj.sortStatus = obj.sortStatus);
        this.setState(_obj);
    },
    /**
     * 获取GridTable的值
     * @return {string}
     * */
    getValue: function () {
        return this.state.gridData;
    },
    //跳页
    goCur:function(cur){
        var itemsPerPage = this.props.isSetItemsPerPageDisplay ? parseInt(this.refs.refItemsPerPageSelectDropDown.getValue()) : 10;
        var paramObj = {
            currentPage: parseInt(cur),
            itemsPerPage: itemsPerPage
        };
        this.props.isFilterDisplay && (paramObj.filterInputValue = this.state.filterInputValue);
        this.props.isSortDisplay && (this.state.sortColumn !== '' ? paramObj.sortColumn = this.state.sortColumn : '');
        this.props.isSortDisplay && (this.state.sortStatus !== '' ? paramObj.sortStatus = this.state.sortStatus : '');
        this.props.getData(paramObj);
    },
    //每页显示条数
    setItemsPerPageOnChange:function(e){
        var paramObj = {
            currentPage: 1,
            itemsPerPage: parseInt(e.option)
        };
        this.props.isFilterDisplay && (paramObj.filterInputValue = this.state.filterInputValue);
        this.props.isSortDisplay && (this.state.sortColumn !== '' ? paramObj.sortColumn = this.state.sortColumn : '');
        this.props.isSortDisplay && (this.state.sortStatus !== '' ? paramObj.sortStatus = this.state.sortStatus : '');
        this.props.getData(paramObj);
    },
    /**
     * 排序当前点击列
     * @param {string} column
     * 要排序的列名
     * @param {string} status
     * 排序方向，升序或降序
     * */
    sortHandle:function(column, status){
        var paramObj = {
            sortColumn: column,
            sortStatus: status,
            currentPage:1,
            itemsPerPage:this.state.itemsPerPage
        }
        this.state.filterInputValue !== '' ? paramObj.filterInputValue = this.state.filterInputValue : '';
        this.props.getData(paramObj);
        this.props.sortHandle && this.props.sortHandle(column, status);
    },
    //搜索
    searchHandle:function(){
        var filterInputValue = this.refs.refFilterInput.getValue() || '';
        if(filterInputValue.trim() === ''){
            alert("请输入搜索文字");
            return;
        }
        var itemsPerPage = this.props.isSetItemsPerPageDisplay ? parseInt(this.refs.refItemsPerPageSelectDropDown.getValue()) : 10;
        var paramObj = {
            currentPage: 1,
            itemsPerPage: itemsPerPage,
            filterInputValue: filterInputValue
        };
        this.props.isSortDisplay && (this.state.sortColumn !== '' ? paramObj.sortColumn = this.state.sortColumn : '');
        this.props.isSortDisplay && (this.state.sortStatus !== '' ? paramObj.sortStatus = this.state.sortStatus : '');
        this.props.getData(paramObj);
    },
    //搜索框改变
    filterOnChange:function(e){
        this.setValue({
            filterInputValue:e.target.value
        });
    },
    /**
     * 获取GridTable里的组件的ref值
     * @return {object}
     * */
    getChildrenRefs:function(){
        return this.refs;
    },
    render:function() {
        return (
            <div id={this.props.id} className={classnames("ucs-gridTable", this.props.classNames.rootDiv)}>
                { this.props.isSetItemsPerPageDisplay &&
                <div ref="itemsPerPage"
                     className={classnames("ucs-gridTable-setItemsPerPage", this.props.classNames.itemsPerPage)}>
                    每页显示
                    <SelectDropDown
                        ref="refItemsPerPageSelectDropDown"
                        option={selectDropDownOptions1}
                        defaultText={this.state.itemsPerPage}
                        value={this.state.itemsPerPage}
                        onChange={this.setItemsPerPageOnChange}
                    ></SelectDropDown>
                    条
                </div>
                }
                { this.props.isFilterDisplay &&
                <div ref="filter"
                     className={classnames("ucs-gridTable-filter", this.props.classNames.filter)}>
                    搜索文字：
                    <Input
                        ref="refFilterInput"
                        placeholder="请输入搜索文字"
                        onChange={this.filterOnChange}
                        value={this.state.filterInputValue}
                    ></Input>
                    <Button buttonType="confirm" onClick={this.searchHandle}>搜索</Button>
                </div>
                }
                <Table
                    ref="refTable"
                    className={classnames("ucs-gridTable-table", this.props.classNames.table)}
                    columns={this.props.columns}
                    data={this.state.gridData}
                    bordered={true}
                    isSortDisplay={this.props.isSortDisplay}
                    sortHandle={this.sortHandle}
                    isTextOverflowHidden={this.props.isTextOverflowHidden}
                >
                </Table>
                <Pagination
                    ref="refPagination"
                    className={classnames("ucs-gridTable-pagination", this.props.classNames.pagination)}
                    total={this.state.totalPage}
                    currentPage={this.state.currentPage}
                    goNext={this.goCur}
                    goPrev={this.goCur}
                    goCur={this.goCur}
                />
            </div>
        )
    }
});


module.exports = GridTable;