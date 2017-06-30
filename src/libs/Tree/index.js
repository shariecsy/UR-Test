var classnames = require('classnames');
var nodeTree = [];
/**
 *
 *
 * @param [defaultCollapsed] 是否收起，默认展开
 * @param  {object} data 树节点数据
 *
 * Tree组件
 *
 * 示例:
 *
 *     @example
 *     var data=[{
 *          name:"广东省",
 *           id:"gd",
 *           children:[
 *               {name:"广州",id:'gz',href:'www.baidu.com'},
 *              {name:"深圳",id:'sz',href:'www.baidu.com'},
 *               {name:"珠海",id:'zh',href:'www.baidu.com'}]
 *       },{
 *           name:"广西省",
 *           id:"gx",
 *           children:[
 *               {name:"桂林",id:'gl',
 *                   children:[{name:"阳朔",id:'ys',href:'www.baidu.com'},
 *                       {name:"溶洞",id:'rd',href:'www.baidu.com'},
 *                       {name:"山水",id:'ss',href:'www.baidu.com',
 *                           children:[{name:"阳朔",id:'ys',href:'www.baidu.com'},
 *                               {name:"溶洞",id:'rd',href:'www.baidu.com'},
 *                               {name:"山水",id:'ss',href:'www.baidu.com'}]
 *                       }]},
 *               {name:"北海",id:'bh',href:'www.baidu.com'},
 *               {name:"南宁",id:'nn',href:'www.baidu.com'}]
 *       }];
 *     <Tree data={data} defaultCollapsed={false} onClick = {this.onClick}/>
 */
var Tree = React.createClass({
    getDefaultProps: function(){
        return{
            id:'',
            className:'',
            defaultCollapsed:'false'
        }
    },
    getInitialState:function () {
        return{
            collapsed: this.props.defaultCollapsed,
            nodeTree: [],
            nodeCheck:[]

        }
    },
    getNodeTree: function (data,ranks) {
        for(var i = 0,len=data.length; i< len ;i++){
            nodeTree.push({id:data[i].id,pid:ranks,name:data[i].name});
            if(data[i].children){
                for (var j=0,len2 = data[i].children.length;j < len2; j++) {
                    nodeTree.push({id:data[i].children[j].id,pid:data[i].id,name:data[i].children[j].name})
                    if (data[i].children[j].children) {
                        ranks = data[i].children[j].id;
                        this.getNodeTree(data[i].children[j].children,ranks);
                    }
                }

            }
        }
    },
    componentDidMount:function () {
        this.getNodeTree(this.props.data,-1);
    },
    _getTreeDom:function (menuObj) {
        var collapsed = this.state.collapsed;
        var vdom = [];
        var that = this;
        var arrowClass = 'ucs-tree-arrow';
        var childrenClass = 'ucs-tree-children';
        if(collapsed){
            arrowClass += ' ucs-tree-arrow-collapsed';
            childrenClass += ' ucs-tree-children-collapsed';
        }

        var arrow = <div className={arrowClass} ref={menuObj.id} onClick={that._handleArrow.bind(that,menuObj.id)}/>;
        //判断是否为数组
        if(menuObj instanceof Array){
            var list = [];
            menuObj.map(function(node){
                if(node.children){
                    list.push(that._getTreeDom(node))
                }else{
                    list.push(
                        <div><a id={node.id} href='javascript:;' onClick={that.onClick.bind(that,node)} >{node.name}</a></div>
                    ) ;
                }
            })

            vdom.push(
                <div>
                    {list}
                </div>
            )
        }else{
            var childDom;
            if(menuObj.children){
                childDom = this._getTreeDom(menuObj.children)
            }
            vdom.push(
                <div className="ucs-tree" id={this.props.id}>
                    <div className={'ucs-tree-item'}>
                        {arrow}
                        <span id={menuObj.id} onClick={this.onClick.bind(that,menuObj)}>{menuObj.name}</span>

                    </div>
                    <div className={childrenClass}>
                        {childDom}
                    </div>
                </div>
            )
        }
        return vdom;
    },
    _handleArrow:function (arrowId) {
        var arrowCurrent = this.refs[arrowId];
        var arrowclass = arrowCurrent.className;
        var childCurrent = arrowCurrent.parentNode.nextSibling;
        if(arrowclass.indexOf('ucs-tree-arrow-collapsed') == -1){
            arrowCurrent.className ='ucs-tree-arrow ucs-tree-arrow-collapsed';
            childCurrent.className ='ucs-tree-children ucs-tree-children-collapsed';
        }else{
            arrowCurrent.className ='ucs-tree-arrow';
            childCurrent.className ='ucs-tree-children';

        }
    },
    /**
     * 节点的点击事件，返回当前节点数据，e 事件
     * @param {object} args
     * @param {object} e
     *
     * */
    onClick:function (args,e) { //args 当前节点数据  e  点击事件
        this.props.onClick(args,e);

    },
    render: function(){
        return  <div>
            {this._getTreeDom(this.props.data)}
        </div>
    }
})
module.exports = Tree;