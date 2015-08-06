### My CV - JSON config converted to HTML5 page(s): SPA

[See it in action here](https://iliyan-trifonov.com "Iliyan Trifonov's CV").

My CV: create your online CV with [Angular](https://angularjs.org/ "Angular.js") 
and [Twitter Bootstrap](http://getbootstrap.com/ "Twitter Bootstrap"). Configure it only with 
one [JSON](http://json.org/ "JSON") file.

A [SPApplication](http://en.wikipedia.org/wiki/Single-page_application "SPA") containing only static resources: 
[HTML](http://en.wikipedia.org/wiki/HTML "HTML"), [CSS](http://en.wikipedia.org/wiki/Cascading_Style_Sheets "CSS") 
and [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript "JS").

It needs the [config.json](src/js/config.json.dist) file to be populated with your CV data and everything else will be 
done automatically creating a beautiful [HTML5](http://en.wikipedia.org/wiki/HTML5 "HTML5") 
[responsive](http://en.wikipedia.org/wiki/Responsive_web_design "Responsive web design") web page(s) showing your own CV.

Sections in the CV: Personal information, Skills, Languages, Work experience, Education and training 
and Personal projects.

## Install

Make sure you have NodeJS/npm installed. Also Bower is used to install the front-end packages anf Gulp for building the
final CSS and JS bundles.

Install [Bower](http://bower.io/ "Bower") and [Gulp](http://gulpjs.com/):

    npm install -g bower gulp

Now install the local npm and Bower packages(Angular+plugins, Gulp build tools).
Go to the project's directory and run:

    npm install
    
The command above will run `bower install` automatically.
    
Now you're ready to run the build:

    gulp build

Finally copy [src/js/config.json.dist](src/js/config.json.dist "config.json.dist") to src/js/config.json and edit it 
with your data.

## Run

The application needs a simple web server to serve its static files. I use [Nginx](http://nginx.org/en/docs/ "Nginx") 
in production for this job.
Here's an example Nginx configuration:

    server {
            listen 80;
            server_name www.iliyan-trifonov.com iliyan-trifonov.com;
            root /var/www/mycv/src;
    
            access_log /var/log/mycv.access.log;
            error_log /var/log/mycv.error.log;
    
            location ~* ^.+.(jpg|jpeg|gif|css|png|js|ico|xml)$ {
                    access_log        off;
                    expires           30d;
            }
    
            location / {
                    index index.html;
                    try_files $uri /index.html;
            }
    
            location ~ /\.ht {
                    deny all;
            }
    }

You can also install a local static web server quickly with npm:

    npm install -g http-server
    
And run it with:

    http-server src/ -p 8080


## Configuration

Here's a sample JSON configuration to be put in src/js/config.json:

    {
      "cvTitle": "Iliyan Trifonov's CV",
      "cvDescription": "CV App built with AngularJS, uses JSON configuration",
      "personal_information": {
        "name": "Iliyan Trifonov",
        "image": "https://.....jpg",
        "address": "My address", // or "address": null
        "phone": "+11 111 111 111",  // or "phone": null
        "email": "me@host.com", // or "email": null
        "homepage": "https://iliyan-trifonov.com",
        "otherurl": "http://blog.iliyan-trifonov.com",
        "skype": "myskypename", // or "skype": null
        "twitter": "iliyan_trifonov",
        "github": "iliyan-trifonov",
        "sex": "Male",
        "birthdate": "day/month/year", // or "birthdate": null
        "nationality": "Bulgarian"
      },
      "skills": [
        "JavaScript",
        "Node.js",
        "Angular.js",
        //...
      ],
      "languages_spoken": [
        {
          "name": "English",
          "level": "Very good"
        },
        {
          "name": "Bulgarian",
          "level": "Native"
        },
        //...
      ],
      "work_experience": [
        {
          "date_start": "January 2015",
          "date_end": "December 2016",
          "company_name": "My Dream Company",
          "position": "Senior Web Developer",
          "about": "Scrum master, mentor for junior and medior developers, conference speaker"
        },
        {
          "date_start": "2014",
          "date_end": "2015",
          "company_name": "My old company",
          "position": "Web Developer",
          "about": "Work hard, play hard"
        },
        //...
      ],
      "education_and_training": [
        {
          "date_start": "October 1995",
          "date_end": "September 2000",
          "qualification": "Bachelor's degree of Computer Science",
          "organisation": "My cool university",
          "subjects": "Maths, C++, Java, PHP, JavaScript"
        },
        //...
      ],
      "projects": [
        {
          "name": "My great site",
          "thumb": "images/mygreatsite.png",
          "title": "The Giver",
          "sourceUrl": {
            "name": "https://github.com/iliyan-trifonov/mygreatsite", //or change the url here with any string like: "Click here"
            "url": "https://github.com/iliyan-trifonov/mygreatsite"
          },
          "demoUrl": {
            "name": "https://iliyan-trifonov.com/",
            "url": "https://iliyan-trifonov.com/"
          },
          "tech_used": "JavaScript, Angular.js, Twitter Bootstrap",
          "about": "It grants wishes"
        },
        //...
      ]
    }
    
Pay attention to the `property: null` properties. They hide some sensitive information that you may not want to
show publicly. Change it to `property: 'value'` when you are loading it locally where you can print or convert the page 
to pdf for sending by email.

## How it works

SPA. Angular 1.4 is used and it completely provides the modern ControllerAs functionality such as `controllerAs: ''` 
in the router and `bindToController: {...}` in the directives. I've also activated the Angular's HTML5 history mode 
which gives us better urls without the hash symbol: with the Nginx configuration above(`try_files`) such urls work 
directly and can be refreshed/loaded without the need to load the home page first.

A service loads the configuration from the JSON file and uses caching.

The router makes sure the configuration is loaded before the pages are parsed by using the `resolve` param with the 
service.

Additional app configuration that will be very rarely changed is in [app.js](src/js/app.js "app.js") in the form of:

    .value('configFile', 'js/config.json')
    .value('privatePropMessage', 'To be disclosed in person')

The JSON configuration is relaxed to allow free strings in most of the places so you can be creative by using just the 
config file.
