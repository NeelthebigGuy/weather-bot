/** @type {import('./index.js').Command} */
export default {
	data: {
		name: 'weathertomorrow',
		description: 'Check tomorrows weather!',
	},

	async execute(interaction) {
		const url =
			'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/halifax?unitGroup=metric&include=current&key=TANKKJ92T5WMLGAKU4TL8JXXM&contentType=json';
		const response = await fetch(url);
		const data = await response.json();

		const dateTime = data.days[1].datetime;
		const snowDepth = data.days[1].snow;
		const perChange = data.days[1].precipprob;
		const description = data.days[1].description;
		const location = data.resolvedAddress;
		const tempMin = data.days[1].tempmin;
		const tempMax = data.days[1].tempmax;
		const temp = data.days[1].temp;
		const feelsLike = data.days[1].feelslike;
		const windSpeed = data.days[1].windspeed;

		let toString = ` __***Hello ${interaction.user.displayName}, here is the weather for ${dateTime}!***__`;
		toString += `\n\t\tTomorrow will be ***${description}***`;
		toString += `\n\t\tThe temperature will be ***${temp}°C***, But it will feel like ***${feelsLike}°C***, with a low of ***${tempMin}°C*** and a high of ***${tempMax}°C***`;
		toString += `\n\t\tTomorrow has a ***${perChange}%*** chance of precipitation in ***${location}***.`;

		if (snowDepth > 0) {
			toString += `\n\t\tthere will be a snow fall of around ***${snowDepth}*** cm.`;
		}

		if (windSpeed >= 30) {
			toString += `\n\t\t__***wowza!***__, Tomorrows wind speed will be ***${windSpeed} km/h!***.`;
		} else {
			toString += `\n\t\tTomorrows wind speed will be ***${windSpeed} km/h***.`;
		}

		toString += `\n*if this imformation seems wrong please let Neel know <3*`;

		await interaction.reply(toString);
	},
};
