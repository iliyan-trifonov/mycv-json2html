### My CV - JSON config converted to HTML5 page(s): SPA

[See it in action here](https://iliyan-trifonov.com "Iliyan Trifonov's CV").

My CV: create your online CV with Angular and Twitter Bootstrap. Configure it only with one JSON file.

A SPApplication containing only static resources: HTML, CSS and JavaScript.

It needs the config.json file to be populated with your CV data and everything else will be done automatically creating 
a beautiful HTML5 responsive web page(s) showing your own CV.

Sections in the CV: Personal information, Skills, Languages, Work experience, Education and training 
and Personal projects.

## Install

Bower is used to install Angular and its additional modules needed by the application.
Go to the project's directory and run:

    bower install

Copy src/js/config.json.dist to src/js/config.json and edit it with your data.

## Run

The application needs a simple web server to serve its static files. I use Nginx in production for this job.
Here's an example Nginx configuration:

    server {
            listen 80;
            server_name www.iliyan-trifonov.com iliyan-trifonov.com;
            root /var/www/mycv;
    
            access_log /var/log/mycv.access.log;
            error_log /var/log/mycv.error.log;
    
            location ~* ^.+.(jpg|jpeg|gif|css|png|js|ico|xml)$ {
                    access_log        off;
                    expires           30d;
            }
    
            location / {
                    index index.html;
            }
    
            location ~ /\.ht {
                    deny all;
            }
    }

You can also install a local static web server quickly with npm:

    npm install -g http-server
    
And run it with:

    http-server src/


## Configuration

Here's a sample JSON configuration to be put in src/js/config.json:

    {
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

The application is a Single Page Application. 
Angular 1.4 is used and it completely provides the modern ControllerAs functionality such as `controllerAs: ''` 
in the router and `bindToController: {...}` in the directives.

A service loads the configuration from the JSON file and uses caching.

The router makes sure the configuration is loaded before the pages are parsed by using the `resolve` param with the 
service.

Additional app configuration that will be very rarely changed is in app.js in the form of:

    .value('configFile', 'js/config.json')
    .value('privatePropMessage', 'To be disclosed in person')

All paths are set as relative, not absolute, for easy refactoring of the app's structure.

The JSON configuration is relaxed to allow free strings in most of the places so you can be creative by using just the 
config file.
