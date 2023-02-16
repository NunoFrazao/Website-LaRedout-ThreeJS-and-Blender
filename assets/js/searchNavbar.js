$(document).ready(() => {
	$("#divSearchIcon").click(() => {
		var hideNav = anime.timeline({
			easing: 'easeOutExpo',
			duration: 300,
			loop: false
		});

		hideNav.add({
			targets: [/*"#icon-menu", "#imageLogo", */"#anc-list li"/*, "#searchIcon", "#dropdownMenuButton"*/],
			opacity: [1,0],
			// delay: function(el, i) {return i * 200;}
			delay: anime.stagger(30, {direction: 'reverse'})
		});


		/* HIDE VISIBLE ELEMENTS */
		setTimeout(() => {
			$("#anc-list li").hide();
		}, 900);


		/* SHOWS SEARCH BAR */
		setTimeout(() => {
			$("nav#nav div#hidden-search").addClass("mostrarBarra");
			hideNav.add({
				targets: "#hidden-search",
				opacity: [0,1],
				translateX: [250,0],
				delay: 0
			});
		}, 100);
	});


	$("#closeIconHidden").click(() => {
		var showNav = anime.timeline({
			easing: 'easeOutExpo',
			duration: 300,
			loop: false
		});

		showNav.add({
			targets: "#hidden-search",
			opacity: [1,0],
			translateX: [0,250],
			delay: 0
		});

		setTimeout(() => {
			$("nav#nav div#hidden-search").removeClass("mostrarBarra");
		}, 100);

		/* HIDE VISIBLE ELEMENTS */
		setTimeout(() => {
			$("#anc-list li").show();
		}, 50);

		showNav.add({
			targets: [/*"#icon-menu", "#imageLogo", */"#anc-list li"/*, "#searchIcon", "#dropdownMenuButton"*/],
			opacity: [0,1],
			delay: anime.stagger(30, {direction: 'normal'})
		});
	});
});