import React, { useState, useRef } from "react"
import Title from "./Title"
import { motion } from "motion/react"

const Testimonial = () => {
	const [tooltipVisibleIndex, setTooltipVisibleIndex] = useState(null)
	const tooltipRefs = useRef([])
	const cardRefs = useRef([])

	const testimonials = [
		{
			text: "Toyota Corolla",
			name: "Евгений Далов",
			message:
				"Toyota Corolla — надёжный и удобный автомобиль, который значительно облегчает повседневную жизнь. Очень рекомендую!",
			image:
				"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
		},
		{
			text: "BMW X5",
			name: "Анна Смирнова",
			message:
				"Bmw X5 — надёжный и комфортный автомобиль, который делает каждую поездку приятной и удобной. Очень рекомендую!",
			image:
				"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
		},
		{
			text: "Jeep Wrangler",
			name: "Елена Букова",
			message:
				"Jeep Wrangler — интуитивно понятный и гибкий внедорожник, который вдохновляет на быстрые решения и уверенный запуск новых возможностей. Отличный выбор для тех, кто ценит комфорт и надёжность в любой ситуации.",
			image:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
		},
	]

	const handleMouseMove = (e, index) => {
		const card = cardRefs.current[index]
		const tooltip = tooltipRefs.current[index]
		if (!card || !tooltip) return

		const bounds = card.getBoundingClientRect()
		const x = e.clientX - bounds.left + 10
		const y = e.clientY - bounds.top + 10

		tooltip.style.transform = `translate3d(${x}px, ${y}px, 0)`
	}

	const handleMouseEnter = index => {
		setTooltipVisibleIndex(index)
	}

	const handleMouseLeave = () => {
		setTooltipVisibleIndex(null)
	}

	return (
		<div className='py-28 px-6 md:px-16 lg:px-24 xl:px-44'>
			<Title
				title='Что говорят наши клиенты'
				subTitle='Узнайте, почему путешественники выбирают Car Rental для роскошного отдыха по всему миру'
			/>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
				{testimonials.map((testimonial, index) => (
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
						viewport={{ once: true, amount: 0.3 }}
						key={index}
						ref={el => (cardRefs.current[index] = el)}
						onMouseMove={e => handleMouseMove(e, index)}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={handleMouseLeave}
						className='relative border border-gray-200 rounded-lg overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300'>
						<span
							ref={el => (tooltipRefs.current[index] = el)}
							className={`absolute px-3 py-1.5 text-sm rounded whitespace-nowrap bg-indigo-600 text-white pointer-events-none
                shadow-lg
                transition-opacity duration-300 ease-in-out transform-origin-top-left
                will-change-transform will-change-opacity
                ${
									tooltipVisibleIndex === index
										? "opacity-100 scale-100"
										: "opacity-0 scale-75"
								}
              `}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								transform: "translate3d(0, 0, 0)",
								filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
							}}>
							{testimonial.name}
						</span>

						<div className='flex flex-col items-center justify-center p-8 text-center'>
							<div className='mb-4 text-gray-500'>
								<h3 className='text-xl font-semibold text-black'>
									{testimonial.text}
								</h3>
								<p className='my-4 text-sm line-clamp-3'>
									{testimonial.message}
								</p>
							</div>
							<div className='flex items-center justify-center'>
								<img
									className='rounded-full w-9 h-9'
									src={testimonial.image}
									alt={`${testimonial.name} profile`}
								/>
								<div className='space-y-0.5 font-medium text-left ml-3'>
									<p>{testimonial.name}</p>
									<div className='flex gap-0.5'>
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												width='22'
												height='20'
												viewBox='0 0 22 20'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'>
												<path
													d='M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z'
													fill='#2563eb'
												/>
											</svg>
										))}
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}

export default Testimonial
