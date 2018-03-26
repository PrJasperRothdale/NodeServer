

var plop = (x) => {};


var app = new Vue({
	el: "#app",
	created(){ this.load(); },
	data : {
		message: "Sloubi",
		tickets: [],
		users: []
	},
	methods: {
		hop(){
			this.message = "Ceci est le messafe";
		},
		load(){
			axios.get("/message").then(
				(response) => {
					this.message = response.data.message;
				});
			axios.get("/listAllTickets").then(
				(response) => {
					this.tickets = response.data.tickets;
				});
			axios.get("/listAllUsers").then(
				(response) => {
					this.users = response.data.users;
				})
		}
	}

});