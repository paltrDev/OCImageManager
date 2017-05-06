import React from "react";

export class SizeFilter extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
	}

	handleChange(e) {
		var size = {
			value: e.target.value,
			option: this.More.checked ? this.More.value : this.Less.value
		}
		this.props.onChange(size);
	}

	handleRadioChange(e) {
		var size = {
			value: this.Size.value,
			option: e.target.value
		}
		this.props.onChange(size);
	}

	render() {
		return (
			<div className="col-sm-4">
				<div className="form-group">
					<label className="control-label">{this.props.translations.size_filter_caption}:</label>
					<div className="input-group">
						<span className="input-group-addon">
							<label className="radio-inline">
								<input type="radio" name="radioGroup" value="0" checked={this.props.value.option == 0} onChange={this.handleRadioChange} ref={(input) => {this.More = input}} /> {this.props.translations.size_filter_more}
							</label>
							<label className="radio-inline">
								<input type="radio" name="radioGroup" value="1" checked={this.props.value.option == 1} onChange={this.handleRadioChange} ref={(input) => {this.Less = input}} /> {this.props.translations.size_filter_less}
							</label>
						</span>
						<input type="text" className="form-control" placeholder="" aria-describedby="basic-addon2" value={this.props.value.value} onChange={this.handleChange} ref={(input) => {this.Size = input}} />
						<span className="input-group-addon">Kb</span>
					</div>
				</div>
			</div>
			);
	}
}