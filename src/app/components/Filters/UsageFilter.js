import React from "react";

export class UsageFilter extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onChange(e.target.value);
	}

	render() {
		return (
			    <div className="col-sm-4">
					<div className="form-group">
                        <label className="control-label">{this.props.translations.usage_filter_caption}:</label>
                        <select className="form-control" value={this.props.value} onChange={this.handleChange}>
                            <option value="-1"></option>
                            <option value="1">{this.props.translations.usage_filter_in_use}</option>
                            <option value="0">{this.props.translations.usage_filter_not_in_use}</option>
                        </select>
                    </div>
				</div>
			);
	}
}