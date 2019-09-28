# User stories

User stories and sub-tasks for the media viewer app.

## As a user, I want to app to cover the entire screen where it is viewed.

Status: in progress
Sub-tasks
- Create a shell script to start chrome with a URL viewed in full screen mode.
- `[DONE]` Serve a static page with a black background and nothing else.
- Make target browser configurable.

## As a user, I want to display an image on the app.

Status: in progress
Sub-tasks
- `[DONE]` Add sample images for testing. Include images that are large in
  dimension and small in file size. Ensure that images are distinct, have
  clear borders, and have unique features.
- `[DONE]` Display an image.
- Create a node.js server to act as an API.
- Add an API route to retrieve an image.
- Update the client to retrieve the image from the API using an AJAX call.
- Display an image received from the server.

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

> TODO: sub-tasks

## As a user, I want to be able to view the app on any computer or phone.

Status: backlog

> TODO: sub-tasks

## As a user, I want to display both images and video.

Status: backlog

> TODO: sub-tasks

## As a user, I want to give the app a URL to where my media is stored.

Status: backlog

> TODO: sub-tasks

## As a user, I want to provide multiple URLs/paths to media files.

Status: backlog

> TODO: sub-tasks

## As a user, I want an option to display the file name/path of displayed media.

Status: backlog

> TODO: sub-tasks

## As a user, I want media to be displayed in multiple randomly chosen layouts.

Status: backlog

> TODO: sub-tasks

## As a user, I want to see multiple images/video at once on the screen.

Status: backlog

> TODO: sub-tasks

## As a user, I want the option to enable/disable sound for video.

Status: backlog

> TODO: sub-tasks

## As a user, I want the option to install the client and server on different machines.

Status: backlog

> TODO: sub-tasks

## As a user, I want the option to protect access to the view with a password.

Status: backlog

> TODO: sub-tasks

## As a user, I want the background color to be configurable.

Status backlog

> TODO: sub-tasks

## As a user, I want a web-based interface to configure the app.

Status: backlog

> TODO: sub-tasks

## As a user, I want the app to automatically pick up configuration changes.

Status: backlog

> TODO: sub-tasks

## As a user, I want to install the app on a Raspberry Pi.

Status: backlog

> TODO: sub-tasks

## As a user, I want the app to start automatically when the server starts.

Status: backlog

> TODO: sub-tasks

## As a user, I want the app to include faces when panning a large image.

Details: When panning across and image that is larger than the screen,
the animation should pan towards the face of at least one person in the
picture. This is to avoid the behavior where the animation pans across
only the torsos of people in a picture but never shows their faces.

Status: backlog

> TODO: sub-tasks
> - research face-api.js
