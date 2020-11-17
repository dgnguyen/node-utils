var fs = require('fs')
fs.readFile("./file.txt", 'utf8', function (err, data) {
  console.log({ data });
  var formatted = data.replace(/This is the old line/g, 'This new line replaces the old line');
  fs.writeFile("./file.txt", formatted, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

try {
  var array = fs.readFileSync('file.txt', 'utf8').split('\n');

  const writeStream = fs.createWriteStream('array.txt');
  const pathName = writeStream.path;
  // write each value of the array on the file breaking line
  array.forEach(value => writeStream.write(`\t\t[\n\t\t\t\t"${value}",\n\t\t\t\t"${value}",\n\t\t\t\t"${value}",\n\t\t\t\t"${value}",\n\t\t\t\t"${value}",\n\t\t\t\t"${value}"\n\t\t\t],\n`));

  // the finish event is emitted when all data has been flushed from the stream
  writeStream.on('finish', () => {
    console.log(`wrote all the array data to file ${pathName}`);
  });

  // handle the errors on the write process
  writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
  });

  // close the stream
  writeStream.end();



} catch (err) {
  console.error(err);
}