module.exports = {
	httpCodes: {
		internalServerError: 500,
		notFound: 404,
		success: 200
	},
	httpColorCodes: {
		internalServerError: 31,
		badRequest: 33,
		multipleChoices: 36,
		success: 32
	},
	mysql: {
		prod: {
			host: "ap-south-1.rds.amazonaws.com",
			user: "panand",
			password: "panand",
			database: "ecommercedb"
		},
		local: {
			host: "localhost",
			user: "root",
			password: "panand",
			database: "ecommercedb"
		}
	}
};