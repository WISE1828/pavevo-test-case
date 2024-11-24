export interface IAnime {
	mal_id: number // Уникальный идентификатор аниме
	images: {
		jpg: {
			image_url: string // URL изображения
			small_image_url: string // URL маленького изображения
			large_image_url: string // URL большого изображения
		}
		webp: {
			image_url: string // URL изображения в формате WEBP
			small_image_url: string // URL маленького изображения в формате WEBP
			large_image_url: string // URL большого изображения в формате WEBP
		}
	}
	title: string // Название аниме
	title_japanese: string // Название на японском
	type: string // Тип аниме (например, TV)
	aired: {
		from: string // Дата начала
		to: string // Дата окончания
		prop: {
			from: {
				day: number // День начала
				month: number // Месяц начала
				year: number // Год начала
			}
			to: {
				day: number // День окончания
				month: number // Месяц окончания
				year: number // Год окончания
			}
			string: string // Строковое представление дат
		}
	}
	year: number // Год выхода
}
