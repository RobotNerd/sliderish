# User stories

User stories and sub-tasks for the media viewer app.

## As a user, I want to app to cover the entire screen where it is viewed.

Status: in progress

Sub-tasks
- Create a shell script to start chrome with a URL viewed in full screen mode.
- `[DONE]` Serve a static page with a black background and nothing else.

## As a user, I want to display an image on the app.

Status: **DONE**

Sub-tasks
- `[DONE]` Add sample images for testing. Include images that are large in
  dimension and small in file size. Ensure that images are distinct, have
  clear borders, and have unique features.
- `[DONE]` Display an image.
- `[DONE]` Create a node.js server to act as an API.
- `[DONE]` Add an API route to retrieve an image.
- `[DONE]` Update the client to retrieve the image from the API using an AJAX call.
- `[DONE]` Display an image received from the server.

## As a user, I want to display and pan across an image larger than the screen.

Status: backlog

Sub-tasks
- Display a zoomed version of an image.
- Animate the image so that it moves across the screen. Ensure that all
  parts of the visible screen are covered by some part of the image.
- Create start and end points to the animation and stop animation once the end
  has been reached.

## As a user, I want to display the output on a TV.

Status: backlog

> TODO: Sub-tasks

## As a user, I want to be able to view the app on any computer or phone.

Status: backlog

> TODO: Sub-tasks

## As a user, I want to display both images and video.

Status: backlog

> TODO: Sub-tasks

## As a user, I want related media to be grouped together when displayed.

Media files are considered to be related based on folder structure. All
video and image files at the same level in a folder are assumed to be
part of the same group. This makes it easy for users to organize their
media in folders however they want to.

Status: in progress

Sub-tasks:
- Add a set of root paths to the server where all media are stored.
- Randomize the order of directories that files are served from once at startup,
  and re-randomize it once media have been served from all directories.
- When serving media from a directory, create a randomized list of all media
  paths and serve them in that order. (Only serve a media file once.)
- Accept requests for multiple media files from the client.
  - If more files are requested than available, serve a previously served
    image from the same group again.
  - If there are fewer files in the entire group than what is requested,
    serve the same image(s) multiple times as necessary.
- Provide a configuration option to reload all image paths and reset the
  order in which media are served.
- When adding additional root paths via the configuration page, append these
  paths to the current list of directories being served.


## As a user, I want to give the app a URL to where my media is stored.

Status: backlog

> TODO: Sub-tasks

## As a user, I want to provide multiple URLs/paths to media files.

Status: backlog

> TODO: Sub-tasks

## As a user, I want an option to display the file name/path of displayed media.

Status: backlog

> TODO: Sub-tasks

## As a user, I want media to be displayed in multiple randomly chosen layouts.

Status: backlog

> TODO: Sub-tasks

## As a user, I want to see multiple images/video at once on the screen.

Status: backlog

> TODO: Sub-tasks

## As a user, I want the option to enable/disable sound for video.

Status: backlog

> TODO: Sub-tasks

## As a user, I want the option to install the client and server on different machines.

Status: backlog

> TODO: Sub-tasks

## As a user, I want the option to protect access to the view with a password.

Status: backlog

> TODO: Sub-tasks

## As a user, I want application configuration stored in a file.

Status: backlog

Sub-tasks
- Create a config file.
- Load the config file when the application starts.

## As a user, I want the background color to be configurable.

Status backlog

Sub-tasks
- Make these items configurable:
  - Background color
  - Target browser

## As a user, I want a web-based interface to configure the app.

Status: backlog

> TODO: Sub-tasks

## As a user, I want the app to automatically pick up configuration changes.

Status: backlog

> TODO: Sub-tasks

## As a user, I want to install the app on a Raspberry Pi.

Status: backlog

> TODO: Sub-tasks

## As a user, I want the app to start automatically when the server starts.

Status: backlog

> TODO: Sub-tasks

## As a user, I want the app to include faces when panning a large image.

Details: When panning across and image that is larger than the screen,
the animation should pan towards the face of at least one person in the
picture. This is to avoid the behavior where the animation pans across
only the torsos of people in a picture but never shows their faces.

Status: backlog

> TODO: Sub-tasks
> - research face-api.js
