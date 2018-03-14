# swan_hack coding crash course
This document is designed to teach members of [swan_hack](https://swanhack.co.uk) how to code. It assumes no prior knowledge and aims to get members to a point where they can complete simple coding task unassisted.

## Some terms
- __Programming:__ The process of writing computer programs.
- __Hacking:__ Developing or changing an existing product to suit your needs. Usually involves a rapid and light weight development style.

## The tools
For this course it's assumed the member has a laptop they can install stuff on. We make no requirements for them to use a specific Operating System though so therefore use cross platform tools. They should be all installed before carrying on.

 - __[atom.io](https://atom.io):__ Friendly general use text editor.
 - __Chrome or Firefox__
 - __[node.js](https://nodejs.org/en/):__ Run time for the JavaScript programming language.

## What is JavaScript?
JavaScript was originally developed to make websites more interactive. Since then it's expanded in uses and now has the capabilities to make fully fledged applications. The ability to rapidly build projects in it makes it ideal for hackathons and rapid project development.

### Basics

```js
// This is a comment
console.log('this is code')
```

```js
// This is a variable
var bob = 'bill'

// These are as well
let bob = 0
const bob = 'A'
```

```js
// This is a String
let bob = 'bill'

// This is a Number
let bob = 0

// This is an Array
let bob = []

// This is an Object
let bob = {}
```

```js
// This is a more complex Array
let bob = ['bob', 'bill']

// We can access values in it like this
console.log(bob[0])
```

```js
// This is a more complex Object
let bob = { bob: 'bill', bill: 0 }

// We can access properties like this
console.log(bob.bill)
```

```js
// This is a function
function bob () {
  // It does something here
}

// We call it like this
bob()

// This is a special function
() => {
  // Something happens here
}
```

```js
// This is a loop
for (let i=0; i<10; i++) {
  // It will run this code 10 times
}
```

```js
let bob = 0

// This is an if statement
if (bob == 0) {
  // This code will be run
}

// This is a more complex if statement
if (bob == 0) {
  // This check happens first
} else if (bob > 10) {
  // Then this check happens
} else {
  // If neither is true this is run
}
```

### What is REST?
Rest is a way for a web browser and a server to communicate with each other. They do this via HTTP calls. The most basic of these is a GET request and a POST request. A GET request asks the server to provide data. A POST request sends the server data.

### Lets start coding!
First we need to setup our project. If you are on a Mac or Linux machine then simply open a `terminal`. If you are on Windows press the start button and type `Power Shell`, this opens a command line interface in Windows. Next we run these commands to create our project directory.

```sh
# Create a projects directory
mkdir projects
# Enter the projects directory
cd projects
# Create a directory for the project
mkdir rest
# Enter the project directory
cd rest
```
A useful tip when using the command line is you can press the tab key to auto complete commands. You can run the previous command by pressing the up arrow and enter. And you can clear the log using the key combination CTRL + L

Next we need to setup a node project. To do this we simple run this command:
```sh
npm init
```
We can then press enter until the setup tool is finished since we don't need to do anything else.

Before we can write a line of code we need to install the projects dependencies. For this project this is `Express` and `Body-Parser` they can be installed by running this:
```sh
npm install body-parser --save
npm install express --save
```

Now we can open our project in Atom. To do this launch the Atom text editor and select `File -> Add Project Folder` then navigate to the projects directory we created. On Mac and Linux this should be in `~/projects/rest` on Windows this will be in `C:\Users\<Your Username>\projects\rest`. Open the project in Atom.

We need a starting file to run our code in. Right click on the `rest` folder that should have appeared in Atom's sidebar. Select the New file option and create a new file called `app.js`.

Open this file and add the following code:
```js
console.log('Hello World!')
```

We can then run this by going back to our terminal / power shell and running this command:
```sh
node app.js
```
We should get the words `Hello World!` on our screen.

Now lets move to something slightly more complex. First we need to import our libraries:
```js
const express = require('express')
var bodyParser = require("body-parser")
const app = express()
```
These lines of code import our libraries and setup a app variable that will be used to interface with express.

Next we can create a simple endpoint (Think of these like webpages):
```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

We now need to tell express to start serving this content:
```js
app.listen(8000, () => {
  console.log('REST app listening on port 8000!')
})
```

If we open a web browser and navigate to `localhost:8000` we should now be greeted with a page that just has the words `Hellow World!` on it.

While this is somewhat useful we want to be able to serve up whole webpages at a time. Right click on the rest folder in the Atom sidebar again and create a new folder called `static`. Right click on that folder and create 2 files `index.html` and `index.js`.

Open the `index.html` file and copy past this inside:
```html
<!-- Open the page -->
<html>
  <!-- Setup headers -->
  <head>
    <!-- Set a page title that will show up in the tab menu -->
    <title>Rest</title>
  </head>

  <!-- Open the body tag, this contains the pages content -->
  <body>
    <!-- Create a header so our page has some content -->
    <h1>
      Hello!
    </h1>

    <!-- Create a text input box -->
    <input type="text" id="colour"></input>

    <!-- Create a submit button -->
    <button onclick="submit()">Submit</button>
  </body>

  <!-- Load our REST library -->
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

  <!-- Load our JavaScript -->
  <script src="/index.js"></script>

  <!--
    It's important to note that since our JS is going
    to use the REST library it has to be loaded after
    the library has been otherwise you will get an error.
  -->
</html>
```

We then want to tell express to serve this file up. This is done by replacing:
```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```
With:
```js
app.use(express.static('static'))
```
This will tell express to serve files from the static folder. We can also add these lines underneath it as they will be needed later:
```js
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
```

We now need to restart node. This can be done by going to our terminal and doing pressing `CTRL + C` then running:
```sh
node app.js
```

Now if we refresh our web browser we should see the web page we just made.

Next we're going to write the code to change the pages colour. Starting in `app.js` we're going to add this variable at the top of the file:
```js
const express = require('express')
var bodyParser = require("body-parser")
const app = express()

let colour = '#ffff00'
```

Now we can define some end points that the web browser will use to talk to the server. This one is for getting the current colour:
```js
app.get('/getColour', (req, res) => {
  res.send(colour)
})
```

This one is for setting the colour:
```js
app.post('/setColour', (req, res) => {
  colour = req.body.colour
})
```

Now we need to write some code to talk to the server. This can be done by adding code to the `index.js` file. First we want to get the colour from the server and set the background to it:
```js
setInterval(() => {
  axios.get('/getColour').then((response) => {
    if (document.getElementById('colour') != document.activeElement) {
      document.body.style.backgroundColor = response.data
      document.getElementById('colour').value = response.data
    }
  }).catch((error) => {
    console.log(error)
  })
}, 1000)
```

Breaking that block down first we want to run some code on repeat at a set interval of every second:
```js
setInterval(() => {console.log('This is run every second')}, 1000)
```

This code then goes and gets the colour:
```js
axios.get('/getColour').then((response) => {
  if (document.getElementById('colour') != document.activeElement) {
    console.log('The colour is: ' + response.data)
  }
}).catch((error) => {
  console.log(error)
})
```

This then sets the background of the page:
```js
document.body.style.backgroundColor = response.data
document.getElementById('colour').value = response.data
```

This code then submits the colour when the user presses submit:
```js
function submit() {
  let colour = document.getElementById('colour').value

  axios.post('/setColour', {
    colour: colour
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })
}
```

Now if we restart the node process by going to our terminal pressing `CTRL + C` and then run `node app.js`.

## And we're done
Now the challenge is to extend this to add more features. A fun and simple extension would be having to areas on the page that can have separately controlled colours.
