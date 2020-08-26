const audioSprite = require('audiosprite-ffmpeg');
const fs = require('fs');

// Please create 'input' and 'output' folder into your project
const INPUT_PATH = './input/';
const OUTPUT_PATH = './output/';

const FILE_TYPES = ['mp3', 'ogg', 'wav', 'caf', 'ac3', 'm4a'];

let files = [];
try {
	fs.readdirSync(INPUT_PATH).forEach(item => {
		let fileName = INPUT_PATH + item;
		let extension = item.substr(item.lastIndexOf('.') + 1);
		FILE_TYPES.forEach(ext => {
			if (extension.toLowerCase() === ext) {
				files.push(fileName);
			}
		});
	});
} catch (e) {
	console.error('[ERROR] read files error,', e);
}

let opts = {
	output: OUTPUT_PATH + 'audioSprite',
	format: 'howler2',
	export: 'mp3',
	bitrate: 64,
	samplerate: 22050
};

audioSprite(files, opts, function (err, obj) {
	if (err) {
		console.error(err);
		return;
	}

	fs.writeFile(OUTPUT_PATH + 'audioSprite.json', JSON.stringify(obj, null, 2), 'utf8', (error) => {
		if (error) {
			console.error('[ERROR] ', error);
		}
	});
	console.log(JSON.stringify(obj, null, 2));
});
