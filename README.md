# Repertoire Manager

Repertoire Manager is a web application that allows musicians (particularly collaborative pianists) to catalog and retrieve information on pieces of music they have played.

## Installation Instructions

Repertoire Manager is not currently live on the web. The backend is stored and run using a local file called db.json . Recommended 'installation' instructions are:
* Fork and Clone this Repo
* Install JSON-Server
* Within the home directory of the project, run json-server --watch db.json
* Open index.html in the browser
* Enjoy!

## Usage

Interacting with Repertoire Manager, users can:
* Add a new piece of music to their repertoire and store it on a local database
* Delete a piece of music from their local repertoire database
* Filter and display pieces from their repertoire:
  - By composer name
  - By instrument
* Display all pieces of music in their repertoire

![](https://github.com/IguanasEverywhere/repertoire-manager/blob/main/gifs/demonstrationGif.gif)

## Roadmap for Future Plans
Currently, Repertoire Manger is built to store repertoire data on a local host server. A potential improvement for the future would be for the data to be stored on a remote server. Along with particular user account sign-ups, this would provide the ability for different musicians to store distinct repertoire lists and access them on the web from any location. Other possible improvements could be: allowing the user to edit pieces in the database, and/or allowing for adding some other input/search parameters for pieces (dates performed or opus numbers, for example).

## Author
Scott Schwab, 2023

## Acknowledgements
* "Satisfy" and "Quicksand" fonts provided from Google Fonts, https://fonts.google.com
* README template ideas utilized from http://makeareadme.com and http://markdownlivepreview.com
* Demonstration GIF captured with GIPHY CAPTURE, https://giphy.com/apps/giphycapture
