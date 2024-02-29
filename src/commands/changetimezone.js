/** @type {import('./index.js').Command} */

let time = '-4';

function changeit(string) {
	console.log(`changed time to ${string}`);
	time = string;
}

export function getit() {
	return time;
}

export default {
	data: {
		name: 'changetimezone',
		description: 'set UTC timezone',
		options: [
			{
				name: 'utc',
				description: 'enter UTC value',
				type: 3,
				required: true,
			},
		],
	},
	async execute(interaction) {
		const message = interaction.options.get('utc');

		if (message.value.length === 2 || message.value.length === 3) {
			console.log(`attemping changing timezone to: ${message.value}`);
			changeit(message.value);
		} else {
			console.log(`error changing timezone: ${message.value}`);
		}

		await interaction.reply(`timezone changed to: ${message.value}`);
	},
};
