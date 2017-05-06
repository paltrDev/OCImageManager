import React from "react";

import { ImageRow } from "./ImageRow";

export class ImageTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortField: 'file',
			sortOrder: 'asc'
		};
		this.handleSortChange = this.handleSortChange.bind(this);
		this.handleBundleCheckedStateChange = this.handleBundleCheckedStateChange.bind(this);
	}

	handleSortChange(e) {
		this.setState({
			sortField: e.target.name,
			sortOrder: e.target.name == this.state.sortField ? (this.state.sortOrder == 'asc' ? 'desc' : 'asc') : this.state.sortOrder
		});
	}

	handleBundleCheckedStateChange(e) {
		this.props.handleBundleCheckedStateChange({
			state: this.props.images.some(i => !i.checked) ? true : false,
			ids: this.props.images.map(i => i.id)
		});
	}

	render() {
		const images = this.props.images;
		switch (this.state.sortField) {
			case 'size': images.sort((a, b) => { return this.state.sortOrder == 'asc' ? a.size - b.size : b.size - a.size; });
				break;
			case 'usage': images.sort((a, b) => { return this.state.sortOrder == 'asc' ? a.usage_items.length - b.usage_items.length : b.usage_items.length - a.usage_items.length; });
				break;
			default: images.sort((a, b) => { return this.state.sortOrder == 'asc' ? a.file.toLowerCase() > b.file.toLowerCase() : a.file.toLowerCase() < b.file.toLowerCase(); });
				break;
		}
		const rows = images.map((i) => <ImageRow key={i.id} image={i} handleCheckedStateChange={this.props.handleCheckedStateChange} />);
		return (
                <form action="" method="post" id="form" >
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <td className="text-center" style={{width: "1px"}} >
                                        <input type="checkbox" checked={this.props.images.some(i => !i.checked) ? false : true} onClick={this.handleBundleCheckedStateChange} />
                                    </td>
									<td className="text-center">{this.props.translations.column_image}</td>
									<td className="text-left">
										<a name='file' onClick={this.handleSortChange} className={this.state.sortField == 'file' ? this.state.sortOrder : ''}>{this.props.translations.column_file}</a>
									</td>
									<td className="text-left">
										<a name='size' onClick={this.handleSortChange} className={this.state.sortField == 'size' ? this.state.sortOrder : ''}>{this.props.translations.column_size}</a>
									</td>
									<td className="text-left">
										<a name='usage' onClick={this.handleSortChange} className={this.state.sortField == 'usage' ? this.state.sortOrder : ''}>{this.props.translations.column_usage}</a>
									</td>
									<td className="text-left">{this.props.translations.column_actions}</td>
								</tr>
							</thead>
							<tbody>
								{rows}
							</tbody>
						</table>
					</div>
				</form>
				
			
			);
	}
}