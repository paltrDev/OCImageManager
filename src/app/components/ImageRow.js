import React from "react";

export class ImageRow extends React.Component {
	constructor(props){
		super(props);
		this.handleChangeState = this.handleChangeState.bind(this);
	}

	handleChangeState(e) {
		this.props.handleCheckedStateChange({id: e.target.value, checked: e.target.checked});
	}

	render() {
		var usageItems = this.props.image.usage_items.length == 0 
			? <Item translations={this.props.translations} /> 
			: this.props.image.usage_items.map((i) => <Item key={i.id} item={i} />);
		return (
			<tr>
				<td className="text-center">
					<input type="checkbox" value={this.props.image.id} checked={this.props.image.checked} onChange={this.handleChangeState} />
                </td>
				<td className="text-center">
					<img className="img-thumbnail" src={this.props.image.url} alt={this.props.image.file} width="50" height="50" />

				</td>
				<td className="text-left">{this.props.image.file}</td>
				<td className="text-left">{this.props.image.size}</td>
				<td className="text-left">{usageItems}</td>
                <td className="text-right">
                	<button type="button" data-toggle="tooltip" onClick="" title="" className="btn btn-danger"><i className="fa fa-minus-circle"></i></button>
                </td>
			</tr>
			);
	}
}

class Item extends React.Component {
	render() {
		if (!this.props.item)
			return <label className="label label-danger" style={{fontSize: "11px"}}>{this.props.translations.not_in_use}</label>	
		else 
			return <label className="label label-success" style={{fontSize: "11px"}}>{this.props.item.type}: {this.props.item.name}</label>
	}
}