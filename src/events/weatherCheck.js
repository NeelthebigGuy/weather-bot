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
			async() => {
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
				const temp = data.days[0].temp;
				const feelsLike = data.days[0].feelslike;

				if (description === undefined) {
					console.log(`error finding weather with url:${url}`);
				} else if (snowDepth >= 10) {
					channel.send(` 
                    __***Hello, its time for the weather on ${dateTime}!***__
                    Today will be ***${description}***
                    The temperature is ***${temp}°C***, But it will feel like ***${feelsLike}°C***, with a min temp of ***${tempMin}°C***.
                    There's a ***${perChange}%*** chance of precipitation in ***${location}***, the max amount will be ***${snowDepth}mm*** of snow/rain`);
					channel.send(`\t\t__**ALERT ALERT**__ ** there might around ** __***${snowDepth}mm***__.
                                ***Check another weather source incase of a storm!***`);
				} else if (snowDepth > 0) {
					channel.send(`
                    __***Hello, its time for the weather on ${dateTime}!***__
                    Today will be ***${description}***
                    The temperature is ***${temp}°C***, But it will feel like ***${feelsLike}°C***, with a min temp of ***${tempMin}°C***.
                    There's a ***${perChange}%*** chance of precipitation in ***${location}***, the max amount will be ***${snowDepth}mm*** of snow/rain`);
				} else {
					channel.send(`
                    __***Hello, its time for the weather on ${dateTime}!***__
                    Today will be ***${description}***
                    The temperature is ***${temp}°C***, But it will feel like ***${feelsLike}°C***, with the lowest temp being ***${tempMin}°C***.
                    There's a ***${perChange}%*** chance of precipitation in ***${location}***.`);
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
