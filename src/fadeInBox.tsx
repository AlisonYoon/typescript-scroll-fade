import React, { useEffect, useRef } from "react";
import "./fadeInBox.css";

const FadeInSection = (props: any) => {
	const divRef = useRef<HTMLDivElement>(
		null
	) as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		const target = divRef.current;

		const thresholdArray = (steps: number) =>
			Array(steps + 1)
				.fill(0)
				.map((_, index) => index / steps || 0);

		let previousY = 0;
		let previousRatio = 0;

		const handleIntersect = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				const currentY = entry.boundingClientRect.y;
				const currentRatio = entry.intersectionRatio;
				const isIntersecting = entry.isIntersecting;

				// Scrolling down/up
				if (currentY < previousY) {
					if (currentRatio > previousRatio && isIntersecting) {
						// "Scrolling down enter";
						if (target.style.visibility !== "1") {
							target.style.opacity = "1";
							target.style.visibility = "visible";
						}
					} else {
						// "Scrolling down leave";
					}
				} else if (currentY > previousY && isIntersecting) {
					if (currentRatio < previousRatio) {
						// "Scrolling up leave";
					} else {
						// "Scrolling up enter";
						if (target.style.visibility !== "1") {
							target.style.opacity = "1";
							target.style.visibility = "visible";
						}
					}
				}

				previousY = currentY;
				previousRatio = currentRatio;
			});
		};

		//A threshold of 1.0 means that when 100% of the target is visible within the element specified by the root option, the callback is invoked.
		const observer = new IntersectionObserver(handleIntersect, {
			threshold: thresholdArray(20),
		});

		observer.observe(target);
	}, []);

	return (
		<div className="fadeInBox" ref={divRef}>
			{props.children}
		</div>
	);
};

export { FadeInSection };
