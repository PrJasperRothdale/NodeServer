

var plop = (x) => {};


var app = new Vue({
	el: "#app",
	created(){ this.load(); },
	data : {
		message: "Sloubi",
		tickets: ""
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
				})
		}
	}

});