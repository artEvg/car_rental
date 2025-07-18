import React from "react"
import { assets } from "../assets/assets"
import { motion } from "motion/react"

const Footer = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='text-gray-500/80 pt-8 px-6 mt-50 md:px-16 lg:px-24 xl:px-32'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'>
				<div>
					<motion.img
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						src={assets.logo}
						alt='logo'
						className='h-8 md:h-9'
					/>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className='max-w-80 mt-3'>
						Премиальный сервис по аренде автомобилей с широким выбором роскошных
						и повседневных транспортных средств для любых целей.
					</motion.p>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className='flex items-center gap-3 mt-6'>
						<a href='#'>
							{" "}
							<img
								src={assets.facebook_logo}
								className='w-5 h-5'
								alt='facebook'
							/>
						</a>
						<a href='#'>
							{" "}
							<img
								src={assets.instagram_logo}
								className='w-5 h-5'
								alt='instagram'
							/>
						</a>
						<a href='#'>
							{" "}
							<img
								src={assets.twitter_logo}
								className='w-5 h-5'
								alt='twitter'
							/>
						</a>
						<a href='#'>
							{" "}
							<img
								src={assets.gmail_logo}
								className='w-5 h-5'
								alt='gmail'
							/>
						</a>
					</motion.div>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className='flex flex-wrap justify-between w-1/2 gap-8'>
					<div>
						<h2 className='text-base font-medium text-gray-800 uppercase'>
							Полезные Ссылки
						</h2>
						<ul className='mt-3 flex flex-col gap-1.5'>
							<li>
								<a href='#'>Главная</a>
							</li>
							<li>
								<a href='#'>Смотреть автомобили</a>
							</li>
							<li>
								<a href='#'>Сдать свой автомобиль</a>
							</li>
							<li>
								<a href='#'>О нас</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 className='text-base font-medium text-gray-800 uppercase'>
							Ресурсы
						</h2>
						<ul className='mt-3 flex flex-col gap-1.5'>
							<li>
								<a href='#'>Помощь</a>
							</li>
							<li>
								<a href='#'>Условия обслуживания</a>
							</li>
							<li>
								<a href='#'>Политика компании</a>
							</li>
							<li>
								<a href='#'>Страхование</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 className='text-base font-medium text-gray-800 uppercase'>
							Контакты
						</h2>
						<ul className='mt-3 flex flex-col gap-1.5'>
							<li>Россия, Приморский край</li>
							<li>Владивосток, Снеговая 74</li>
							<li>+7 950 284-40-50</li>
							<li>info.carrental@gmail.com</li>
						</ul>
					</div>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.6 }}
				className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
				<p>
					© {new Date().getFullYear()}{" "}
					<a href='https://prebuiltui.com'>CarRental</a>. Все права защищены.
				</p>
				<ul className='flex items-center gap-4'>
					<li>
						<a href='#'>Конфиденциальность</a>
					</li>
					<li> | </li>
					<li>
						<a href='#'>Условия</a>
					</li>
					<li> | </li>
					<li>
						<a href='#'>FAQ</a>
					</li>
				</ul>
			</motion.div>
		</motion.div>
	)
}

export default Footer
