import React from "react";

import { FileFilter } from "./Filters/FileFilter";
import { UsageFilter } from "./Filters/UsageFilter";
import { SizeFilter } from "./Filters/SizeFilter";

export class FilterBar extends React.Component {
	render() {
		return (
			<div className="well">
				<div className="row">
					<FileFilter value={this.props.filterData.file} onChange={this.props.handleFileFilterChange} translations={this.props.translations}/>
					<UsageFilter value={this.props.filterData.usage} onChange={this.props.handleUsageFilterChange} translations={this.props.translations}/>
					<SizeFilter value={this.props.filterData.size} onChange={this.props.handleSizeFilterChange} translations={this.props.translations}/>
				</div>
			</div>
			);
	}
}