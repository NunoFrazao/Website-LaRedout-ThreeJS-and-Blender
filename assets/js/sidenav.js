$(document).ready(() => {

	/* OPEN SIDE NAV */
	$("svg#icon-menu").click(() => {

		/* FULL SIDE NAV */
		$("#mySidenav").css("width", "300px");

		/* OPACITY DIV */
		$(".opacity").css("display", "block");
		$(".opacity").css("opacity", "1");

		/* LIST */
		$(".side-nav-anc").css("margin-left", "0px");
		$("#side-nav-redes").css("left", "50%");
		$("#google_translate_element").css("left", "0%");
	});


	/* CLOSE SIDE NAV */
	$("#close-sidenav").click(() => {		

		$("#mySidenav").css("width", "0px");

		/* OPACITY DIV */
		$(".opacity").css("display", "none");
		$(".opacity").css("opacity", "0");

		/* LIST */
		$(".side-nav-anc").css("margin-left", "-250px");
		$("#side-nav-redes").css("left", "-50%");
		$("#google_translate_element").css("left", "-50%");
	});


	/* CLOSE SIDE NAV WITH OPACITY DIV */
	$(".opacity").click(() => {	

		$("#mySidenav").css("width", "0px");

		/* OPACITY DIV */
		$(".opacity").css("display", "none");
		$(".opacity").css("opacity", "0");

		/* LIST */
		$(".side-nav-anc").css("margin-left", "-250px");
		$("#side-nav-redes").css("left", "-50%");
		$("#google_translate_element").css("left", "-50%");
	});


	/* DROPDOWN ON CLICK */
	$("#dropdownMenuButton").click(() => {
		$("#spanMenu i").toggleClass("icon-transform");

	});

	$('body').on('click', (e) => {
		if ($("#menu-drop").hasClass("show")) {
			$("#menu-drop").removeClass("show");
			$("#spanMenu i").removeClass("icon-transform");
		}
	});
});
