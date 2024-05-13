<p align="center" id="top">
	<img height="60px" src="public/images/logo.png" alt="Event Photos Logo">
	<p align="center">👥 EP (Event Photos) is a customizable platform for uploading photos from your events. <br />⚡ Powered by Next.js, Edgestore & Netlify.</p>
</p>

<div align="center">

![](https://img.shields.io/github/stars/omzi/event-photos.svg?color=ff0)
![](https://img.shields.io/github/forks/omzi/event-photos.svg?color=ff0)
![](https://img.shields.io/github/languages/top/omzi/event-photos?color=222FE6)
![](https://img.shields.io/github/languages/code-size/omzi/event-photos?color=222FE6)
![](https://img.shields.io/github/issues/omzi/event-photos.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?color=222FE6)](https://github.com/omzi/event-photos/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?color=222FE6)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/twitter/follow/0xOmzi.svg?style=social&label=@0xOmzi)

</div>

<br>
<h4><a href="https://ep.omzi.dev/"><i>Live Demo</i> 🚀</a></h4>

---

## 📜 **About**

**EP (Event Photos)** is a customizable platform for uploading photos from your events.

## ⚙️ **Features**

- [x] Image Upload to Edgestore
- [x] Bare-Bones Authentication
- [x] Blurhash Generation
- [x] Image Rendering using Netlify CDN
- [ ] Adding & Editing Event Details
- [ ] CRUD Access to Uploaded Files
- [ ] Gallery Lightbox
- [ ] User Feedback Mechanisms
- [ ] Enhanced User Interface

## 🛠 **Tech Stack**

- **_Hosting:_** [Netlify](https://netlify.com/)
- **_CDN:_** [Netlify CDN](https://docs.netlify.com/image-cdn/overview/)
- **_Full Stack Framework:_** [Next.js](https://nextjs.org/)
- **_Database:_** [Neon](https://neon.tech/) (w/ [Prisma](https://www.prisma.io/))
- **_Authentication:_** JWT Cookies (w/ [Jose](https://github.com/panva/jose/))
- **_File Storage:_** [Edgestore](https://edgestore.dev/)
- **_Styling:_** [Tailwind CSS](https://tailwindcss.com/)
- **_Programming Language:_** [TypeScript](https://www.typescriptlang.org/)

## 🚩 **Prerequisites**

Ensure that your system meets the following requirements:

- [Node.js](https://nodejs.org/) version >= 18.18.0
- [npm](https://www.npmjs.com/) version >= 9.8.1

## ⚡ **Installation**

Before proceeding, make sure your system satisfies the prerequisites mentioned above. <br><br>
Firstly, clone the **EP** repository into your desired folder and navigate into it:

```shell
$ git clone https://github.com/omzi/event-photos && cd event-photos
```

Install the project dependencies using npm (or yarn if you prefer):

```shell
npm i
```

## ⚙ **Environment Variables**

**EP** requires certain environment variables to be set to function properly. Create a `.env` file in the root of your project and add the following variables:

```shell
AUTH_SECRET = # A random string. Eg: abcdefghijklmnopqrstuvwxyz
ADMIN_EMAILS = # A comma-space delimited string of admin emails. Eg: admin@event.com, admin@mail.com
ADMIN_PASSWORDS = # A comma-space delimited string of admin passwords. Eg: qwerty, asdfgh
NEXT_PUBLIC_EVENT_NAME = # Name of the event. Eg: DevFest 2024
EDGE_STORE_ACCESS_KEY = # Your Edgestore access key
EDGE_STORE_SECRET_KEY = # Your Edgestore secret key
DATABASE_URL = # Your SQL database URL. You can modify the `schema.prisma` to support other databases
NEXT_PUBLIC_DEPLOYMENT_URL = # Your deployment URL. Eg: https://ep.omzi.dev
```

Once the environment variables are set, you can run **EP** locally with:

```shell
npm run dev
```

Visit the URL `http://localhost:3000/` in your browser to access the **EP** application.

## 👥 **Contributors**

- [Omezibe Obioha](https://github.com/omzi/) (@0xOmzi)

## 📄 **License**

This project is licensed under the MIT License. See the [`LICENSE`](./LICENSE.txt) file for more details.

## ❌ **Disclaimer**

This project is a WIP. It is **NOT** yet production-ready 😉!

---

[Back To Top ↺](#top)

> Made with &#9829;
