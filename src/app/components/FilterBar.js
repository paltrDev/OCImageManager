import React from "react";

import { FileFilter } from "./Filters/FileFilter";
import { UsageFilter } from "./Filters/UsageFilter";
import { SizeFilter } from "./Filters/SizeFilter";

export class FilterBar extends React.Component {
	render() {
		return (
			<div className="well">
				<div className="row">
					<FileFilter value={this.props.filterData.file} onChange={this.props.handleFileFilterChange} caption={this.props.translations.filter_by_file}/>
					<UsageFilter value={this.props.filterData.usage} onChange={this.props.handleUsageFilterChange} caption={this.props.translations.filter_by_usage}/>
					<SizeFilter value={this.props.filterData.size} onChange={this.props.handleSizeFilterChange} caption={this.props.translations.filter_by_size}/>
				</div>
			</div>
			);
	}
}