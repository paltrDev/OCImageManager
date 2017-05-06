import React from "react";
import ReactDOM from "react-dom";

import { FilterBar } from "./components/FilterBar";
import { ImageTable } from "./components/ImageTable";

class App extends React.Component {
	constructor(props) {
		super(props);
		//add key and state to items
		const images = this.props.images.map((image, key) => { 
			image.id = key;
			image.checked = false;
			image.usage_items = image.usage_items.map((item, key) => {
				item.id = key;
				return item;
			});
			return image; 
		});
		this.state = {
			images: images,
			filterData:
			{
				file: "",
				usage: -1,	//-1 = any, 1 = used, 0 = not used
				size: {
					value: "",
					option: 0
				}
			}
		};
		this.handleFileFilterChange = this.handleFileFilterChange.bind(this);
		this.handleUsageFilterChange = this.handleUsageFilterChange.bind(this);
		this.handleSizeFilterChange = this.handleSizeFilterChange.bind(this);
		this.filterElementsCallback = this.filterElementsCallback.bind(this);
		this.handleCheckedStateChange = this.handleCheckedStateChange.bind(this);
		this.handleBundleCheckedStateChange = this.handleBundleCheckedStateChange.bind(this);
	}

	handleFileFilterChange(e) {
		this.setState((prevState) => {filterData: prevState.filterData.file = e});
	}

	handleUsageFilterChange(e) {
		this.setState((prevState) => {filterData: prevState.filterData.usage = e});
	}

	handleSizeFilterChange(e) {
		this.setState((prevState) => {filterData: prevState.filterData.size = e});
	}

	filterElementsCallback(i) {
		var byFile = true;
		if (this.state.filterData.file)
			byFile = i.file.toLowerCase().indexOf(this.state.filterData.file.toLowerCase()) != -1;
		var byUsage = this.state.filterData.usage == -1 ? true : (i.usage_items.length > 0) == this.state.filterData.usage;
		var bySize = true;
		if (this.state.filterData.size.value && !isNaN(this.state.filterData.size.value))
			bySize = this.state.filterData.size.option == 0 ? i.size >= (this.state.filterData.size.value * 1024) : i.size <= (this.state.filterData.size.value * 1024);
		return (byFile && byUsage && bySize);
	}

	handleCheckedStateChange(e) {
		this.setState((prevState) => {images: prevState.images.find(i => i.id == e.id).checked=e.checked});
	}

	handleBundleCheckedStateChange(e) {
		this.setState(prevState => {images: prevState.images.forEach(i => i.checked = e.ids.includes(i.id) ? e.state : i.checked) });
	}

	render() {
		var filtered = this.state.images.filter(this.filterElementsCallback);
		return (
			<div>
				<FilterBar 
					filterData={this.state.filterData} 
					handleFileFilterChange={this.handleFileFilterChange} 
					handleUsageFilterChange={this.handleUsageFilterChange} 
					handleSizeFilterChange={this.handleSizeFilterChange}
					translations={TRANSLATIONS}/>
				<ImageTable 
					filterByFile={this.state.filterData.file} 
					filterByUsage={this.state.filterData.usage} 
					filterBySize={this.state.filterData.size} 
					images={filtered} 
					handleCheckedStateChange={this.handleCheckedStateChange}
					handleBundleCheckedStateChange={this.handleBundleCheckedStateChange}
					translations={TRANSLATIONS} />
			</div>
			);
	}
}

var SAMPLE_DATA = [
	{
		url: 'http://localhost/magazoc.zz/image/catalog/demo/apple_logo.jpg', 
		file: 'catalog/demo/apple_logo.jpg',
		size: 21560,
		usage_items: []
	},
	{
		url: 'http://localhost/magazoc.zz/image/catalog/demo/apple_cinema_30.jpg',
		file: 'catalog/demo/apple_cinema_30.jpg',
		size: 64530,
		usage_items: [
			{
				name: "Apple Cinema 30\"",
				type: "Product",
				url: ""
			}
		]	
	},
	{
		url: 'http://localhost/magazoc.zz/image/catalog/demo/banners/iphone6.jpg',
		file: 'catalog/demo/banners/iphone6.jpg',
		size: 34050,
		usage_items: []
	}
];

const TRANSLATIONS = {
	"filter_by_file": "Имя файла",
	"filter_by_usage": "Использование",
	"filter_by_size": "Размер файла",
	column_image: "Изображение",
	column_file: "Имя файла",
	column_size: "Размер",
	column_usage: "Где используется",
	column_actions: "Действия"
};

ReactDOM.render(<App images={SAMPLE_DATA} />, document.getElementById('app'));