$(document).ready(() => {
	const divs = ["#f-image", "#s-image", 6, 20];
	// Click on image for 3d model
	$("#image-three").click(() => {
		// Show 3d model
		$("#meuCanvas").show();
		$("#full-image").hide();

		// Show buttons
		$("#buttons").addClass("buttons-show");
	});


	// Click on images to show each image
	for (let i = 0; i < 2; i++) {
		$(divs[i]).click(() => {
			// Hide 3d model
			$("#meuCanvas").hide();
			$("#full-image").show();
			$("#full-image").attr("src", "assets/img/produtos/" + divs[i + 2] + ".png");

			// Hide buttons
			$("#buttons").removeClass("buttons-show");
		});
	}
});