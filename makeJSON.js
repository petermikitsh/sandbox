const fs = require('fs');

let writeStream = fs.createWriteStream('static/large.json');

// write some data

writeStream.write('{"records":[')

for (let i = 0; i < 100; i++) {
  const query = {
    id: i,
    query: `SELECT ${i}${"+1".repeat(Math.pow(2, 20) / 6)}`
  };
  if (i >= 1) {
    writeStream.write(',');
  }
  writeStream.write(JSON.stringify(query));
}

writeStream.write(']}')

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
    console.log('wrote all data to file');
});

// close the stream
writeStream.end();
