/**
 * Badge组件
 *
 * @param count 传入的数值,若不传,默认为小红点
 *
 * 示例:
 *
 *     @example
 *     <Badge id="badge" name="badgeName" count="8" />
 *
 */
var Badge = React.createClass({
	getDefaultProps:function (){
		return {
			count:"",
			id:"",
			name:""
		}	
	},
	render:function (){
		return (
			<span id={this.props.id} name={this.props.name} className="ucs-badge">
				<sup className="ucs-badge-number" ref="ucsBadgeNumber">{this.props.count}</sup>
			</span>
			)		
	},
	componentDidMount:function(){
 		this.props.count==""?(this.refs.ucsBadgeNumber.className=this.refs.ucsBadgeNumber.className+" ucs-badge-dot"):null;
	}
});

module.exports = Badge;



