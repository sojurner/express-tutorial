const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 5000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials'); //https://nodejs.org/docs/latest/api/modules.html#modules_dirname  //https://handlebarsjs.com/partials.html
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  const now = new Date().toString();
  let log = `${now}: ${request.method} ${request.url}`; //http://expressjs.com/en/api.html#req

  console.log(log); //http://expressjs.com/en/api.html#req

  fs.appendFile('server.log', log + '\n', error => {
    //appending to log file
    if (error) {
      console.log('unable to append');
    }
  });

  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //use method is executing a middleware in the order that is given.  In this example it is the /public path passed as an argument to static
//http://expressjs.com/en/api.html

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  //creating routes for the app (request,response)
  response.render('home.hbs', {
    //render
    pageTitle: 'home Page',
    welcomeGreeting: 'Hi dudes',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (request, response) => {
  //http://expressjs.com/en/api.html#res.get
  response.render('about.hbs', {
    //http://expressjs.com/en/api.html#res.render
    pageTitle: 'Paul',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (request, response) => {
  response.send({
    //http://expressjs.com/en/api.html#res.send
    champion: 'Viktor',
    likes: ['lasers', 'Awful Situations']
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
