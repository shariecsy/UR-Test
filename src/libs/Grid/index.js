/**
 * 栅格布局
 * @constructs
 *
 * Row
 * @param {object} flex 可传参数
 *
 *
 *     	    flex={{ type: 'flex', justify: 'start'}}
 *
 *     	    type	布局模式，可选 flex，现代浏览器 下有效
 *
 *     	    align	flex 布局下的垂直对齐方式：top middle bottom
 *
 *     	    justify	flex 布局下的水平排列方式：start end center space-around space-between
 *
 *
 * Col
 * @param {object} col 设置列的参数
 * @param {object} xs 超小屏幕
 * @param {object} sm 小屏幕
 * @param {object} lg 大屏幕
 *
 *
 *     		col={{ span: 8, order: 3 }}
 *
 *     		span	栅格占位格数，为 0 时相当于 display: none	number
 *
 *     		order	栅格顺序，flex 布局模式下有效	number	0
 *
 *     	    offset	栅格左侧的间隔格数，间隔内不可以有栅格	number	0
 *
 *     	    push	栅格向右移动格数	number	0
 *
 *     	    pull	栅格向左移动格数	number	0
 *
 *     	    xs	<768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
 *
 *     	    sm	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
 *
 *     	    md	≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
 *
 *     		lg	≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
 *
 * 示例：
 *
 *     @example
 *     var Grid = UcsmyUI.Grid;
 *     var Row = Grid.Row;
 *     var Col = Grid.Col;
 *     <Row>
 *         <Col col={{ span: 6 }}>
 *         		<p>2-1</p>
 *         </Col>
 *         <Col col={{ span: 6, offset: 6 }}>
 *         		<p>2-2</p>
 *         </Col>
 *         <Col col={{ span: 6 }}>
 *         		<p>2-3</p>
 *         </Col>
 *     </Row>
 *
 *
 *
 *
 */

var Row = React.createClass({
	render:function(){
		var cols = this.props.children;
		var className = '', flexClassName = '';
		if(this.props.flex){
			var type = '', justify = '', align = '';
			if(this.props.flex.type){
				type = 'ucs-row-' + this.props.flex.type
			}
			if(this.props.flex.justify){
				justify = ' ucs-row-flex-' + this.props.flex.justify
			}
			if(this.props.flex.align){
				align = ' ucs-row-flex-' + this.props.flex.align
			}
			flexClassName = type + justify + align + ' '
		}
		className = flexClassName == '' ? 'ucs-row' : flexClassName
		return (
			<div className={className}>{cols}</div>
		)
	}
})

var Col = React.createClass({
	render:function(){
		var colsChildren = this.props.children;
		var className = '',colClassName = '',xsClassName = '',smClassName = '',mdClassName = '',lgClassName = '';
		if(this.props.col){
			var span = '', offset = '', push = '', pull = '', order = '';
			if(this.props.col.span){
				span = 'ucs-col-' + this.props.col.span
			}
			if(this.props.col.offset){
				offset = ' ucs-col-offset-' + this.props.col.offset
			}
			if(this.props.col.push){
				push = ' ucs-col-push-' + this.props.col.push
			}
			if(this.props.col.pull){
				pull = ' ucs-col-pull-' + this.props.col.pull
			}
			if(this.props.col.order){
				pull = ' ucs-col-order-' + this.props.col.order
			}
			colClassName = span + offset + push + pull + order + ' '
		}
		if(this.props.xs){
			var span = '', offset = '', push = '', pull = '';
			if(this.props.xs.span){
				span = 'ucs-col-xs-' + this.props.xs.span
			}
			if(this.props.xs.offset){
				offset = ' ucs-col-xs-offset-' + this.props.xs.offset
			}
			if(this.props.xs.push){
				push = ' ucs-col-xs-push-' + this.props.xs.push
			}
			if(this.props.xs.pull){
				pull = ' ucs-col-xs-pull-' + this.props.xs.pull
			}
			xsClassName = span + offset + push + pull + ' '
		}
		if(this.props.sm){
			var span = '', offset = '', push = '', pull = '';
			if(this.props.sm.span){
				span = 'ucs-col-sm-' + this.props.sm.span
			}
			if(this.props.sm.offset){
				offset = ' ucs-col-sm-offset-' + this.props.sm.offset
			}
			if(this.props.sm.push){
				push = ' ucs-col-sm-push-' + this.props.sm.push
			}
			if(this.props.sm.pull){
				pull = ' ucs-col-sm-pull-' + this.props.sm.pull
			}
			smClassName = span + offset + push + pull + ' '
		}
		if(this.props.md){
			var span = '', offset = '', push = '', pull = '';
			if(this.props.md.span){
				span = 'ucs-col-md-' + this.props.md.span
			}
			if(this.props.md.offset){
				offset = ' ucs-col-md-offset-' + this.props.md.offset
			}
			if(this.props.md.push){
				push = ' ucs-col-md-push-' + this.props.md.push
			}
			if(this.props.md.pull){
				pull = ' ucs-col-md-pull-' + this.props.md.pull
			}
			mdClassName = span + offset + push + pull + ' '
		}
		if(this.props.lg){
			var span = '', offset = '', push = '', pull = '';
			if(this.props.lg.span){
				span = 'ucs-col-lg-' + this.props.lg.span
			}
			if(this.props.lg.offset){
				offset = ' ucs-col-lg-offset-' + this.props.lg.offset
			}
			if(this.props.lg.push){
				push = ' ucs-col-lg-push-' + this.props.lg.push
			}
			if(this.props.lg.pull){
				pull = ' ucs-col-lg-pull-' + this.props.lg.pull
			}
			lgClassName = span + offset + push + pull
		}
		className = (colClassName == '' ? '' : colClassName) + (xsClassName == '' ? '' : xsClassName) + (smClassName == '' ? '' : smClassName) + (mdClassName == '' ? '' : mdClassName) + (lgClassName == '' ? '' : lgClassName);
		return (
			<div className={className}>{colsChildren}</div>
		)
	}
})

var Grid = {
	Row:Row,
	Col:Col
}

module.exports = Grid