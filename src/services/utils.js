module.exports = {
	filterProducts: function (productArr, filterObj) {
		let productList = [];
		if(Object.keys(filterObj).length > 0) {
			let filteredArray = [ ...productArr ];
			Object.keys(filterObj).forEach((key, i) => {
				let newFilteredArray = [];
				switch(key) {
					case 'query' : newFilteredArray = filteredArray.filter(item => item.name.match(new RegExp(filterObj[key], "i")));
						break;
					case 'minPrice' : newFilteredArray = filteredArray.filter(item => parseInt(item.price, 10) >= parseInt(filterObj[key], 10));
						break;
					case 'maxPrice' : newFilteredArray = filterObj[key] > -1 ?
						filteredArray.filter(item => parseInt(item.price, 10) <= parseInt(filterObj[key], 10)) : filteredArray;
						break;
					default : newFilteredArray = filteredArray.filter(item => item[key] == filterObj[key]);
				}
				filteredArray  = [ ...newFilteredArray ];
			});
			productList = [ ...filteredArray ];
		} else {
			productList = [ ...productArr ];
		}
		return productList;
	}
}
