# Project Title

d3hiring Practical test. (https://gist.github.com/d3hiring/4d1415d445033d316c36a56f0953f4ef)

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement. Install mysql for database.

### Mysql
- #### Click this link to setup mysql in Windows 10. (https://www.onlinetutorialspoint.com/mysql/install-mysql-on-windows-10-step-by-step.html)
Note: Create database with name d3hiring. Table will get auto generate through migration.

---

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.14.1

    $ npm --version
    6.13.4

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/naisargparmar/d3hiring.git
    $ cd d3hiring
    $ npm install

## Configure app

Open `config.js` then edit it with your mysql database settings. You will need hostname, login user, login password and database name.

## Running the project

    $ npm start

## Simple build for production

    $ npm build

---

Postman collection file is at root folder named as Postman
