const chai = require("chai");
const server = "http://127.0.0.1:8000/humanresource"
const chaiHttp = require("chai-http");


//assertions
chai.should();
chai.use(chaiHttp);

describe('Employees API', () => {

	//get all employees
	describe("GET /humanresource/employees", () => {
		it("It should Get all Employees", (done) => {
			chai.request(server)
				.get("/employees")
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('array');
					//response.body.length.should.be.eq(6)
				done();
				})
		})

		it("It should Not Get Employees", (done) => {
			chai.request(server)
				.get("/employee1")
				.end((err, response) => {
					response.should.have.status(404);
				done();
				})
		})
	})

	//GET an Employee
	describe("GET /humanresource/employee/:id", () => {
		it("It should Not Get Employee By Id", (done) => {
			const taskId = 7
			chai.request(server)
				.get("/employees/"+taskId)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('id');
					response.body.should.have.property('name');
					response.body.should.have.property('id').eq(7);
					response.body.should.have.property('email').eq('paulndamboski@gmail.com')
				done();
				});
		});

		it("It should Get Employee By Id", (done) => {
			const taskId = 123
			chai.request(server)
				.get("/employees/"+taskId)
				.end((err, response) => {
					response.should.have.status(404);
				done();
				});
		});
	})

//Post An Employee
		describe("POST /humanresource/employees", () => {
		it("It should Create An Employee", (done) => {
			const employee = {
				"name": "Test Employee15",
				"gender": "Female",
				"phone_number": "+2531662311828111",
				"email": "testemploye111e31@gmail.com",
				"address": "228-90119",
				"town": "Matuu",
				"country": "Kenya"
			}
			chai.request(server)
				.post("/employees/")
				.send(employee)
				.end((err, response) => {
					response.should.have.status(201);
					response.body.should.be.a('object');
					response.body.should.have.property('id');
					response.body.should.have.property('id').eq(15);
					response.body.should.have.property('name');
					response.body.should.have.property('name').eq("Test Employee15");
				done();
				});
		});

		it("It should Not Create An Employee", (done) => {
			const employee = {
				"name": "Test Employee15",
				"gender": "Female",
				"phone_number": "+2531662311828111",
				"email": "testemploye111e31@gmail.com",
				"address": "228-90119",
				"town": "Matuu",
				"country": "Kenya"
			}
			chai.request(server)
				.post("/employees/")
				.send(employee)
				.end((err, response) => {
					response.should.have.status(400);
				done();
				});
		});

	});

	//Update An Employee
	describe("PUT /humanresource/employees/:id", () => {
		it("It should Update An Employee", (done) => {
			const employeeId = 15
			const employee = {
				"name": "Test Employee15",
				"gender": "Female",
				"phone_number": "+2531662311828111",
				"email": "testemploye111e31@gmail.com",
				"address": "228-90119",
				"town": "Matuu City",
				"country": "Kenyan Republic"
			}
			chai.request(server)
				.put("/employees/"+employeeId+"/")
				.send(employee)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('id').eq(15);
					response.body.should.have.property('name');
					response.body.should.have.property('name').eq("Test Employee15");
				done();
				});
		});

		it("It should Not Update An Employee", (done) => {
			const employeeId = 15
			const employee = {
				"phone_number": "+2531662311828111",
				"email": "testemploye111e31@gmail.com",
				"address": "228-90119",
				"town": "Matuu City",
				"country": "Kenyan Republic"
			}
			chai.request(server)
				.put("/employees/"+employeeId+"/")
				.send(employee)
				.end((err, response) => {
					response.should.have.status(400);
				done();
				});
		});

	});

//Patch An Employee
	describe("PATCH /humanresource/employees/:id", () => {
		it("It should Partially Update An Employee", (done) => {
			const employeeId = 15
			const employee = {
				"name": "Kuwakunywa Tu",
				"town": "Matuu City,  Machakos",
				"country": "Democratic Republic of Kenya"
			}
			chai.request(server)
				.patch("/employees/"+employeeId+"/")
				.send(employee)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('id').eq(15);
					response.body.should.have.property('name');
					response.body.should.have.property('name').eq("Kuwakunywa Tu");
				done();
				});
		});

		it("It should Not Patch An Employee", (done) => {
			const employeeId = 15
			const employee = {
				"phone_number": 748392992,
			}
			chai.request(server)
				.put("/employees/"+employeeId+"/")
				.send(employee)
				.end((err, response) => {
					response.should.have.status(400);
				done();
				});
		});

	})

	//Delete An Employee
	describe("DELETE /humanresource/employees/:id", () => {
		it("It should Delete An Employee", (done) => {
			const employeeId = 13
			chai.request(server)
				.delete("/employees/"+employeeId+"/")
				.end((err, response) => {
					response.should.have.status(204);
				done();
				});
		});

		it("It should Not Delete An Employee", (done) => {
			const employeeId = 15
			chai.request(server)
				.delete("/employees/"+employeeId+"/")
				.end((err, response) => {
					response.should.have.status(404);
				done();
				});
		});

	})



})