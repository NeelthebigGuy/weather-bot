import { CronJob } from 'cron';
import { Events } from 'discord.js';
import { getTime } from '../commands/changemessagetime.js';
import { getit } from '../commands/changetimezone.js';
/** @type {import('./index.js').Event<Events.ClientReady>} */

export default {
	name: Events.ClientReady,
	once: false,

	async execute(client) {
		const url =
			'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/halifax?unitGroup=metric&include=current&key=TANKKJ92T5WMLGAKU4TL8JXXM&contentType=json';

		let weathertime = 'UTC' + getit();

		const job = new CronJob(
			getTime(), // cronTime
			async () => {
				const channel = client.channels.cache.get('1117510560691531857');

				const response = await fetch(url);
				const data = await response.json();
				weathertime = 'UTC' + getit();

				const dateTime = data.days[0].datetime;
				const snowDepth = data.days[0].snow;
				const perChange = data.days[0].precipprob;
				const description = data.days[0].description;
				const location = data.resolvedAddress;
				const tempMin = data.days[0].tempmin;
				const tempMax = data.days[0].tempmax;
				const temp = data.days[0].temp;
				const feelsLike = data.days[0].feelslike;
				const windSpeed = data.days[0].windspeed;

				let toString = `__***Hello, its time for the weather on ${dateTime}!***__`;
				toString += `\n\t\tToday will be ***${description}***`;
				toString += `\n\t\tThe temperature is ***${temp}°C***, But it will feel like ***${feelsLike}°C***, with a low of ***${tempMin}°C*** and a high of ***${tempMax}°C***`;

				if (description === undefined) {
					console.log(`error finding weather with url:${url}`);
				}

				if (windSpeed >= 20) {
					toString += `\n\t\t__***WHOOOSH***__, The wind speed for today is ***${windSpeed} km/h***.`;
				} else {
					toString += `\n\t\tThe wind speed for today is ***${windSpeed} km/h***.`;
				}

				if (snowDepth >= 10) {
					toString += `\n\t\tThere's a ***${perChange}%*** chance of precipitation in ***${location}***.`;
					toString += `\n\t\t__***WOAH WOAH, ALERT ALERT, more than 10cm of snow!***__ (check another source)`;
				} else if (snowDepth > 0) {
					toString += `\n\t\tThere's a ***${perChange}%*** chance of precipitation in ***${location}***, the max amount will be ***${snowDepth}mm*** of snow/rain`;
				} else {
					toString += `\n\t\tThere's a ***${perChange}%*** chance of precipitation in ***${location}***`;
				}

				toString += `\n\n\t\t*If this imformation seems wrong, please let Neel know <3*`;

				if (description !== undefined) {
					channel.send(toString);
				}

				console.log(`Checked for weather!
                date time: ${dateTime}
                snow depth: ${snowDepth}
                percipation chance: ${perChange}
                location: ${location}
                temp: ${temp}
                tempMin: ${tempMin}
                feels like: ${feelsLike}
				time zone: ${weathertime}`);
			}, // onTick
			null, // onComplete
			true, // start
			weathertime, // timeZone
		);
		console.log(`current time set for checking the weather is: ${getTime()}`);
		job.start();
	},
};
