# Demo microfrontend Angular

This project is implemented to work as microfrontend components, using a mono-repository structure, which allows to get a standard version between our projects and have shared libraries, components and styles.

## Configuring the workspace

<hr>

### Create angular workspace

As a Mono-repository structure.

```shell
ng new demo-microfrontend --create-application=false
```

### Create shell (container)

The shell app will be the root of all Microfrontend projects.

```shell
ng g application mf-shell --style=scss --routing=true
```

### Create payment application

An application for the payment's transactions

```shell
ng g application mf-payment --style=scss --routing=false
```

### Create shopping application

An application for the shopping functionality

```shell
ng g application mf-shopping --style=scss --routing=true
```

### Creating a library project

A library to share services, styles, components, etc. between all the microfrontend's projects.

```shell
ng g library common-lib
```

## Configuring the Module Federation library

<hr>

The Module federation library allows to bundle all the micro projects using webpack into a single project that contains all of them (shell)

### Install module federation library

```
npm install -D @angular-architects/module-federation
```

### Set the host project

Use the project mf-shell as a container (host).

```shell
ng add @angular-architects/module-federation --project=mf-shell --port=4200 --type=host
```

This command will create a webpack config file to inject the others microfrontends

### Set the remote to the projects

```shell
ng add @angular-architects/module-federation --project=mf-shopping --port=4201 --type=remote
ng add @angular-architects/module-federation --project=mf-payment --port=4202 --type=remote
```

## Configuring the common library to share info between microfrontends

### Adding RXJS

Add rxjs from workspace **package.json** into common-lib's **package.json**, then run.

```shell
npm install
```

### Adding library to tsconfig.json file

Set the path of the library as follow.

- on the **tsconfig.json**

```json
{
    ...,
    "compilerOptions": {
        ...,
        "paths":{
            "@common-lib":[
                "projects/common-lib/src/public-api.ts"
            ]
        }
    }
}
```

### Making a service on common lib

We will use **common-lib.service.ts** file to make a function to save the products list into local storage. on the file

```javascript
export class CommonLibService {
    /**List of products */
    private _products: ICommonProduct[] = []
    /**Channel source as a behavior subject */
    private _channelSource = new BehaviorSubject<number>(0);
    /**Channel payment as observable*/
    channelPayment = this._channelSource.asObservable();

    /** Function that store the products into localStorage */
    sendData(product: ICommonProduct) {
        this._products.push(product);
        localStorage.setItem('products', JSON.stringify(this._products));
        this._channelSource.next(this._products.length);
    }
}
```

### Adding the common-lib on webpack file (mf-shopping)

It's necessary to add into **webpack.config.js** the common-lib alias, this will allow to use that library into our microfrontend being injected by the angular-architects/module-federation library.

- Add on _projects/mf-shopping/webpack.config.js_:

```javascript
module.exports = withModuleFederationPlugin({
    ...,
    "sharedMappings": ["@common-lib"],
})
```

On the same file we will change the name of our microfrontend and configure the module path that we will share on the expose attribute.
With this configuration we will setting that the product module will be integrated on the shell module.

```javascript
module.exports = withModuleFederationPlugin({
  name: "mfShopping",
  exposes: {
    "./ProductsModule": "./projects/mf-shopping/src/app/products/products.module.ts",
  },
  ...
});
```

**Note: Do the same for the mf-payment project**

## Integrating the microfrontends into shell module

### Adding the common-lib on webpack file (mf-shell)

Now we will integrate the shopping component on the shell module.
Add the sharedMapping property to get the common lib.

- on _projects/mf-shell/webpack.config.js_:

```javascript
module.exports = withModuleFederationPlugin({
    ...,
    "sharedMappings": ["@commons-lib"],
})
```

### Adding the file.d.ts to shell project

Due the microfrontend module is outside of our shell project is necessary to create a file to map the module that we want to use.

- create a file **custom.d.ts** on _projects/mf-shell/src_:
- Add on _projects/mf-shell/src/custom.d.ts_:

```javascript
declare module 'mfShopping/*'
declare module 'mfPayment/*'
```

### Adding mf-shopping and mf-payment on shell

- on _projects/mf-shell/app.component.html_:

```html
<div class="container">
  <h1 routerLink="/">Shell</h1>
  <div class="cart" routerLink="/payment">
    <span class="material-icons">shopping_cart</span>
    <span class="cart_count">
      {{ commonLibService.channelPayment | async }}
    </span>
  </div>
</div>
<router-outlet></router-outlet>
```

Now add the common service

- on _projects/mf-shell/app.component.ts_:

```javascript
export class AppComponent{
    constructor(public commonLibService: CommonLibService) { }
}
```

Add the route of shopping

- on _projects/mf-shell/app-routing.module.ts_:

```javascript
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("mfShopping/ProductsModule").then((m) => m.ProductsModule),
  },
  {
    path: "payment",
    loadChildren: () =>
      //Standalone component
      import("mfPayment/PaymentComponent").then((m) => m.PaymentComponent),
  },
];
```

### Add the remotes to shell's webpack

- On shell _projects/mf-shell/webpack.coonfig.js_

```javascript
module.exports = withModuleFederationPlugin({
  remotes: {
    /* ["name" on each webpack.config.js]: http://localhost:[assignedPort]/remoteEntry.js */
    mfShopping: "http://localhost:4201/remoteEntry.js",
    mfPayment: "http://localhost:4202/remoteEntry.js",
  },
});
```

### Run the microfrontends and shell
To serve all the projects run:

```shell
npm run run:all
```
