## git
git push origin HEAD:main
git pull origin HEAD:main


## Two extensions
# 1. Angular language service
# 2. Angular console : for running ng g etc. commands on click

# ng lint  
checks code quality as per angular specifications
but first add
ESLint: ng add @angular-eslint/schematics

## Files anatomy

# tslint.json
for checking code quality

# 3 tsconfig files
to tell typescript on how to compile
your code to vanilla javascript

# karma.conf.json
config file for testrunner for testing purposes

# angular.json
this file controls the behavior of CLI
for SSR we need to customize this file

### main.ts file
starting point of project where app is initially bootstrapped

## index.html file

shell for the application

google font links (if any is placed in this file)

## To generate
ng g c home --skip-tests false

## To add angular material
ng add @angular/material

## to generate component in a module
ng g c shared/shell --export --skip-tests true

## To add firebase
>firebase logout
>firebase login
>ng add @angular/fire

## lazy loaded module
>ng g m user --routing

#component inside lazy loaded module
> ng g c user/login-page --skip-tests true

## changed this file in node modules
https://github.com/angular/angularfire/issues/3290
I installed @angular/fire with --force, then went to node_modules/@angular/fire/compat/firestore/interfaces.d.ts

## entry components Dialog components

entry compnents are deprecated

ng g c kanban/dialogs/board-dialog --flat -t -s --skip-tests t-dialog --flat --entry-component --skip-tests true

--flat tells to generate component without module directory
and -t and -s flags are for inline template and inline styles


