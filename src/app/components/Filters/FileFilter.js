import React from "react";

export class FileFilter extends React.Component {
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
                        <label className="control-label">{this.props.caption}:</label>
                        <input type="text" className="form-control" value={this.props.value} onChange={this.handleChange} ></input>
                    </div>
				</div>
			);
	}
}