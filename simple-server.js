const fs = require('fs');
const http = require('http');
const path = require('path');

const SERVER_PORT = 5000;
const SERVER_ADDRESS = '127.0.0.1';

const mimeTypes = [
  /(.*)\.txt$/, 'text/plain',
  /(.*)\.html?$/, 'text/html',
  /(.*)\.css$/, 'text/css',
  /(.*)\.less$/, 'text/less',
  /(.*)\.(js|mjs)$/, 'application/javascript',
  /(.*)\.png$/, 'image/png',
  /(.*)\.(jpg|jpeg)$/, 'image/jpeg',
  /(.*)\.webp$/, 'image/webp',
];

const mimeTypesLength = Math.trunc(mimeTypes.length / 2);

const internalError = (response) => {
  response.statusCode = 500; /* INTERNAL SERVER ERROR */
  response.end();
};

const fileNotFound = (response) => {
  response.statusCode = 404; /* NOT FOUND */
  response.end();
};

const respondWithFile = (response, filename, mime) => {
  const readStream = fs.createReadStream(filename);

  readStream.on('open', () => {
    response.statusCode = 200;
    response.setHeader('Content-Type', mime);
    readStream.pipe(response);
  });

  readStream.on('end', () => {
    response.end();
  });

  readStream.on('error', (error) => {
    if (error.code === 'ENOENT') {
      fileNotFound(response);
    } else {
      internalError(response);
    }
  });
};

const server = http.createServer((request, response) => {
  let unixPath = null;
  for (let i = 0; i < request.url.length; i += 1) {
    if (request.url[i] === '?') {
      unixPath = request.url.substring(0, i);
      break;
    }
  }

  unixPath = unixPath !== null ? unixPath : request.url;

  const foldersNames = [];
  let slashIndex = 0;
  for (let i = 1; i < unixPath.length; i += 1) {
    if (unixPath[i] === '/') {
      const folderName = unixPath.substring(slashIndex + 1, i);
      foldersNames.push(folderName);
      slashIndex = i;
    }
  }

  let requestFile = unixPath.substring(slashIndex + 1);
  requestFile = requestFile.length !== 0 ? requestFile : 'index.html';

  const folderPath = slashIndex === 0 ? '.' : unixPath.substring(1, slashIndex);

  fs.readdir(folderPath, (error, files) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fileNotFound(response);
      } else {
        internalError(response);
      }
      return;
    }

    let filePathMatch = null;
    let mimeMatch = null;
    let nothingFound = true;
    for (let i = 0; nothingFound && i < files.length; i += 1) {
      const filename = files[i];

      for (let j = 0; nothingFound && j < mimeTypesLength; j += 1) {
        const regexIndex = 2 * j;
        const mimeIndex = 2 * j + 1;

        const regex = mimeTypes[regexIndex];
        const mime = mimeTypes[mimeIndex];

        const groups = filename.match(regex);
        if (groups !== null) {
          if (groups[0] === requestFile || groups[1] === requestFile) {
            filePathMatch = path.join(...foldersNames, filename);
            mimeMatch = mime;
            nothingFound = false;
          }
        }
      }
    }

    if (nothingFound) {
      fileNotFound(response);
    } else {
      respondWithFile(response, filePathMatch, mimeMatch);
    }
  });
});

server.listen(SERVER_PORT, SERVER_ADDRESS);

server.on('error', (error) => {
  const port = SERVER_PORT;
  const message = `[${error.code}] Failed! Is another process holding the port ${port}?\n`;
  process.stderr.write(message);
});

server.on('listening', () => {
  const port = SERVER_PORT;
  const address = SERVER_ADDRESS;
  const family = 'IPv4';
  const welcome = `Listening on port ${port}, address ${address} [${family}]\n`;
  process.stdout.write(welcome);
});
