module.exports = {
	httpCodes: {
		internalServerError: 500,
		notFound: 404,
		success: 200,
		badRequest: 400
	},
	httpColorCodes: {
		internalServerError: 31,
		badRequest: 33,
		multipleChoices: 36,
		success: 32
	},
	mysql: {
		local: {
			host: "127.0.0.1",
			user: "panand",
			password: "vicky1992",
			database: "ecommerce"
		}
	},
	userType: {
		user: 1,
		vendor: 2
	}
};