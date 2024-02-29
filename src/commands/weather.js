/** @type {import('./index.js').Command} */

export default {
	data: {
		name: 'weather',
		description: 'get current weather info',
	},

	async execute(interaction) {
		const url =
			'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/halifax?unitGroup=metric&include=current&key=TANKKJ92T5WMLGAKU4TL8JXXM&contentType=json';
		const response = await fetch(url);
		const data = await response.json();

		const dateTime = data.days[0].datetime;
		const snowDepth = data.days[0].snow;
		const perChange = data.days[0].precipprob;
		const description = data.days[0].description;
		const location = data.resolvedAddress;
		const tempMin = data.days[0].tempmin;
		const temp = data.days[0].temp;
		const feelsLike = data.days[0].feelslike;

		if (snowDepth > 0) {
			await interaction.reply(
				` __***Hello ${interaction.user.displayName}, it's ${dateTime}!***__
			Today will be ***${description}***
			The temperature is ***${temp}°C***, But it will feel like ***${feelsLike}°C***, with a min temp of ***${tempMin}°C***.
			There's a ***${perChange}%*** chance of precipitation in ***${location}***, the max amount will be ***${snowDepth}mm*** of snow/rain.
			*if this imformation seems wrong please let Neel know <3*`,
			);
		} else {
			await interaction.reply(
				` __***Hello ${interaction.user.displayName}, it's ${dateTime}!***__
			Today will be ***${description}***
			The temperature is ***${temp}°C***, But it will feel like ***${feelsLike}°C***, with a min temp of ***${tempMin}°C***.
			There's a ***${perChange}%*** chance of precipitation in ***${location}***.
			\n*if this imformation seems wrong please let Neel know <3*`,
			);
		}
	},
};
