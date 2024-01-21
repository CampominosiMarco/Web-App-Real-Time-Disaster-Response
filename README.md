# Overview
Following the calamitous events of November 2nd and 4th in Quarrata, the inspiration behind this application stemmed from a deep-seated desire to aid future relief and rescue efforts. Witnessing the challenges faced during those events, the vision for this app emerged as a means to facilitate and enhance future intervention strategies. This app aims to streamline and support emergency response initiatives, ensuring more effective and coordinated assistance in times of need within Quarrata and similar communities.

### Some informations on events:
1. [La Nazione - Quarrata: esonda il fiume](https://www.lanazione.it/pistoia/cronaca/quarrata-esonda-fiume-nu02hj6e)
2. [La Nazione - Alluvione in Toscana](https://www.lanazione.it/cronaca/alluvione-toscana-orrzx3hn)
3. [Vigili del Fuoco TV - Alluvione a Quarrata](https://www.vigilfuoco.tv/toscana/pistoia/quarrata/alluvione-toscana-oltre-3-800-interventi-di-soccorso-625-vigili-del-fuoco)
4. [Il Sole 24 Ore - Maltempo in Toscana](https://stream24.ilsole24ore.com/video/italia/maltempo-toscana-drammatica-alluvione-quarrata/AFQqGlUB)
5. [Agenzia Giornalistica Italia (AGI) - Situazione in Toscana](https://www.agi.it/cronaca/news/2023-11-05/toscana-maltempo-situazione-critica-pistoia-ultime-notizie-23818527/)

<br><br>

# FullStack Project
This is a fullstack project created using Angular, Spring and SQL database. Thia is my first time with Angular so I tryed to create module, components, service and tests to understand better how this framework works. 
Hereafter, I will conduct an in-depth analysis of both the client and server components, accompanied by a brief assessment of the utilized database.

<br>

## Client Side
As explined before this is an Angular project.<br>
Please read:
1. [Angular.io](https://angular.io/)
2. [Angular CLI](https://angular.io/cli)
3. [Angular test: Jasmine + Karma](https://angular.io/guide/testing)
4. [Visual Studio Documentation](https://code.visualstudio.com/docs/nodejs/angular-tutorial)
5. [Node.js](https://nodejs.org/en)
6. [npm](https://www.npmjs.com/)

### Environment Note
- As explained on [Microsoft Powershell Security](https://learn.microsoft.com/it-it/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.4), if you encounter this issue during installation:
  
    ```bash
    Remeber, before use "ng new my-app", use promt as Administrator:
    "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser"
    "Set-ExecutionPolicy restricted"
    ```
- [jQuery](https://jquery.com/) installation: in app folder... `npm install jquery`
- [Bootstrap](https://getbootstrap.com/) installation: in app folder... `npm install bootstrap`
- You need to modify [angular.json](/angular-front-end/angular.json) file with Boostrap and jQuery scripts from Node.js

    ```json
    "styles": [
        "src/styles.css",
        "node_modules/bootstrap/dist/css/bootstrap.min.css"
    ],
    "scripts": [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ]
    ```
- You can test every single component using: `ng test --include="**/home.component.spec.ts"`
- You can test all project using: `ng test angular-front-end`





package.json

  "browser": {
    "crypto": false
  }



angular.json


            "allowedCommonJsDependencies": [
              "bcryptjs"
            ],





### Google Maps Note
This is the core of this project, so is very important to understand how use Google Maps API in Angular framework.<br>
Please read these documentation to install google-maps (`npm i @angular/google-maps`) and use it.<br>
<u>The third link is the most important to set correctly HTML, CSS and JS.</u>

1. [Angular google-maps](https://www.npmjs.com/package/@angular/google-maps)
2. [GitHub google-maps](https://github.com/angular/components/tree/main/src/google-maps#readme)
3. [Google Maps Developers Documentation](https://developers.google.com/maps/documentation/javascript/overview?hl=it#javascript) 




npm install @types/google.maps --save-dev
Add googlemaps to the types array in both files tsconfig.app.json respectively in tsconfig.spec.json (save both files)
"types": ["google.maps"]



per testare google.maps è necessario un MOCK, vedi (export class MockLatLng implements google.maps.LatLng)


<br>

## Server Side

### Database
In this example I used an SQL database as you can see in [db folder](/db)


ALTER TABLE `marker` ADD CONSTRAINT `FK_User_Marker` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);


### Spring Framework
As explained in [Visual Studio Code Spring Documentation](https://code.visualstudio.com/docs/java/java-spring-boot), I developed a basic backend code to manage user information storage and seamlessly respond to requests from the Angular frontend.<br>
This example comprises only the essential Entities, Controllers, and Repositories. Therefore, I'll not delving into details.<br>


ng add @angular/material
ng add ngx-pagination

