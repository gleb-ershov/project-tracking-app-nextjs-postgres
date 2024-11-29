"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ReactNode, useCallback } from "react";

interface ICarouselProps {
	elements: ReactNode[];
}

export const Carousel = (props: ICarouselProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel();

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	return (
		<div className="embla">
			<button className="embla__prev" onClick={scrollPrev}>
				Prev
			</button>
			<button className="embla__next" onClick={scrollNext}>
				Next
			</button>
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{props.elements.map((element, index) => (
						<div className="embla__slide" key={index}>
							{element}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
