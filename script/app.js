(() => {
	const cards = Array.from(document.querySelectorAll(".work-card"));

	const BASE_ROT = 7;
	const MIN_SCALE = 1.1;
	const STACK_RANGE = 380;

	// MUST match your CSS: top: calc(80px + (var(--i) * 18px))
	const STICKY_BASE = 80;
	const STICKY_STEP = 18;

	const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
	const lerp = (a, b, t) => a + (b - a) * t;

	function update() {
		for (let i = 0; i < cards.length; i++) {
			const el = cards[i];

			if (el.classList.contains("work-card--intro")) {
				el.style.transform = "none";
				continue;
			}

			const r = el.getBoundingClientRect();

			// what "top" should it stick to (same as CSS)
			const iVar =
				parseFloat(getComputedStyle(el).getPropertyValue("--i")) || i;
			const stickyTop = STICKY_BASE + iVar * STICKY_STEP;

			// 0 when perfectly stacked, larger when still "free"
			const dist = Math.max(0, r.top - stickyTop);

			// map dist [0..STACK_RANGE] => progress [1..0]
			const t = clamp(dist / STACK_RANGE, 0, 1);
			const stuckness = 1 - t;

			const scale = lerp(1, MIN_SCALE, stuckness);
			const rot = lerp(BASE_ROT, 0, stuckness);

			el.style.transform = `translate3d(0,0,0) scale(${scale}) rotate(${rot}deg)`;
		}
	}

	let raf = 0;
	function onScroll() {
		if (raf) return;
		raf = requestAnimationFrame(() => {
			raf = 0;
			update();
		});
	}

	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("resize", update);
	update();
})();

document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector(".header");
	const stopSection = document.querySelector("#gone"); // <-- section waar hij moet verdwijnen

	if (!header || !stopSection) return;

	const observer = new IntersectionObserver(
		([entry]) => {
			// Zodra #Work in beeld komt -> verberg header
			header.classList.toggle("is-hidden", entry.isIntersecting);
		},
		{
			threshold: 0.01, // triggert bijna meteen bij binnenkomen
			rootMargin: "0px 0px 0px 0px",
		},
	);

	observer.observe(stopSection);
});
