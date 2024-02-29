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
		const windSpeed = data.days[0].windspeed;

		let toString = ` __***Hello ${interaction.user.displayName}, it's ${dateTime}!***__`
		toString += `\n\t\tToday will be ***${description}***`
		toString += `\n\t\tThe temperature is ***${temp}°C***, But it will feel like ***${feelsLike}°C***, with a min temp of ***${tempMin}°C***.`
		toString += `\n\t\tThere's a ***${perChange}%*** chance of precipitation in ***${location}***.`;

		if (snowDepth > 0) {
			toString += `\n\t\tthere will be a snow fall of around ${snowDepth} cm.`
		}

		if (windSpeed >= 20){
			toString += `\n\t\t__***WHOOOSH***__, The wind speed for today is ***${windSpeed} km/h***.`
		} else {
			toString += `\n\t\tThe wind speed for today is ***${windSpeed} km/h***.`
		}


		toString += `\n*if this imformation seems wrong please let Neel know <3*`;

		await interaction.reply(toString);
	},
};
