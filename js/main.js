

var plop = (x) => {};


var app = new Vue({
	el: "#app",
	created(){ this.load(); },
	data : {
		message: "Sloubi"
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
		}
	}

});