# Media management system

![alt text](https://github.com/nuipawarit/media-management-system/blob/master/images/image-1.png?raw=true)

### Features
* Supports image (jpg, jpeg, png) and video (mp4) media files under 50 MB.
* Supports file name, upload date and uploader name storage.
* Automatically generate thumbnail.
* Can search media by name, type and upload date.
* Infinite scroll.


## Installation

**1.** Install package dependencies:

```sh
npm install
```

**2.** Install `ffmpeg` on the local machine (for support video thumbnail generator).

###### For Mac OS
```sh
brew install ffmpeg
```

###### For Linux
```sh
sudo apt-get update && apt-get install ffmpeg 
```


## Starting the application

**1.** Run the API server by running the following command:

```sh
npm start:server:dev
```

**2.** Run the development server by running the following command:

```sh
npm start
```

**3.** Open [http://localhost:3000](http://localhost:3000) to launch application in the browser.

> Tip: press `control + c` to stop the development server.


## Technology Stack
* **TypeScript** as main programming language.
* **React 17.0.1** for build single page application.
* **Redux** and **Redux-Saga** for state management.
* **Node.js** with **express** framework for build Media server.
* [**lowdb**](https://github.com/typicode/lowdb) as database.


## Database Schema

```
{
  author: string;
  extension: "jpg" | "jpeg" | "png" | "mp4";
  id: string;
  name: string;
  size: number;
  thumbnail: string;
  uploadTime: number;
}
```


## Browser Support

Because this project uses CSS3 features, it’s only meant for modern browsers. Some browsers currently fail to apply some of the styles correctly.

Chrome and Firefox have full support, but Safari and IE have strange behaviors.


## Credits

This project was bootstrapped with [Create React App](https://create-react-app.dev).
