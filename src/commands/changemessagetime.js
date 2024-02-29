/** @type {import('./index.js').Command} */

import { getit } from './changetimezone.js';

let messageTime = `0 8 * * *`;

export function setTime(time) {
	console.log(`setting message time to: ${time}`);
	messageTime = time;
}

export function getTime() {
	return messageTime;
}

export default {
	data: {
		name: 'changemessagetime',
		description: 'set the time of the weather message',
		options: [
			{
				name: 'hour',
				description: 'enter hour value',
				type: 3,
				required: true,
			},
			{
				name: 'minute',
				description: 'enter minute value',
				type: 3,
				required: true,
			},
		],
	},
	async execute(interaction) {
		const hour = interaction.options.get('hour');
		const minute = interaction.options.get('minute');
		const setCronTime = `${minute.value} ${hour.value} * * *`;

		setTime(setCronTime);

		await interaction.reply(`new time for message is everyday at: ${hour.value}:${minute.value}, UTC${getit()}`);
	},
};
