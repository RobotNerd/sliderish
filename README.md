# Media Slideshow

> TODO

## Add images

To serve images, add symlinks to the paths where the images are stored.
Create the symlinks in the folder `assets/images/`.

```
cd media-viewer/server/assets/images/
ln -s /path/to/images ./
```

## Start automatically

> TODO

```
chromium-browser --start-fullscreen URL
```

## Development setup

- Start the server.
```
cd server
npm run build
npm run dev-server
```

- Start the client.
```
cd client
npm start
```
