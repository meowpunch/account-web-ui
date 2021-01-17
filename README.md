# Integrate ReactJS into DjangoProj partially.

### INTRODUCTION

I was in charge of partially applying React JS to the existing Django web application. I am new to React JS. I tried to choose a minimum whenever i had to make a choice. It is beacuse it’s too big to study at once.

Mostly, i followed [this site](https://medium.com/@twagner000/django-create-react-app-without-ejecting-958251af362c) to accomplish this project.

### ENVIRONMENT

os - Windows 10

- frontend

    npm = 6.9.0

    - For instilling ReactJS to Django react-app-rewired webpack-bundle-tracker
- backend

    python = 3.6.9

    django = 1.10.8

    - For instilling ReactJS to Django django-webpack-loader
    - For RESTful API djangorestframework == 3.8.2 django-cors-headers == 2.4.1

### SETUP & FIXES

First, in order to use typescript, i followed [this doc](https://create-react-app.dev/docs/adding-typescript/)

```
> npx create-react-app frontend --template typescript
> cd frontend
> npm install webpack-bundle-tracker react-app-rewired --save-dev

> pip install django-webpack-loader
> pip install djangorestframework==3.8.2
> pip install django-cors-headers==2.4.1
```

It is impossible `conda install django-webpack-loader`. Instead we command `pip install django-webpack-loader`.

`pip install djangorestframework==3.8.2` ~~The lastest version requires more than Django 1.10. So, i have to install the lower version.~~

`pip install django-cors-headers==2.4.1` ~~The lastest version requires more than Django 1.10. So, i installed the lower version.~~

Actually we update Django version to 1.11. So, we can update DRF and DCH version! (Not update yet)

```
#settings/base/apps.pyTHIRD_PARTY_APPS = (...'webpack_loader','rest_framework','corsheaders',)INSTALLED_APPS = DEFAULT_APPS + THIRD_PARTY_APPS + LOCAL_APPS
```

```
# settings/base/__init__.pyMIDDLEWARE = ('corsheaders.middleware.CorsMiddleware',     # 추가...)
```

```
#settings/local.py...WEBPACK_LOADER = {'DEFAULT': {'BUNDLE_DIR_NAME': 'bundles/','STATS_FILE': str(os.path.join('seiyon/frontend','webpack-stats.dev.json')),},}# must be reivesd for safetyREST_FRAMEWORK = {'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.AllowAny',]}CORS_ORIGIN_WHITELIST =      ('localhost:3000/')
```

```
# advertisement/view.py
```

```
// seiyon/frontend/package.json"scripts": {"start": "react-app-rewired start","build": "react-app-rewired build && mv build ../static/try_bundles","test": "react-app-rewired test","eject": "react-scripts eject"},…"proxy": "http://localhost:8000",
```

```
// seiyon/frontend/config-overrides.jsconst BundleTracker = require('webpack-bundle-tracker');module.exports = {webpack: (config, env) => {config.optimization.splitChunks.name = 'vendors';if (env === 'development') {config.output.publicPath = 'http://localhost:3000/';config.plugins.push(new BundleTracker({path: __dirname,filename: 'webpack-stats.dev.json',}),);config.entry = config.entry.filter(x => !x.includes('webpackHotDevClient'));config.entry.push(require.resolve('webpack-dev-server/client') + '?http://localhost:3000');config.entry.push(require.resolve('webpack/hot/dev-server'));} else if (env === 'production') {config.output.publicPath = '/static/bundles/build/';config.plugins.push(new BundleTracker({path: __dirname,filename: 'webpack-stats.prod.json',}),);}return config;},devServer: function(configFunction) {return function(proxy, allowedHost) {const config = configFunction(proxy, allowedHost);config.headers = {'Access-Control-Allow-Origin': '*'};return config;};},};
```

### RESTful additional basic setup (User Object)

Django REST framework [API Gudie](https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset)

Model in `account/model` is already made

```
# account/serializers.pyfrom rest_framework import serializersfrom django.contrib.auth.models import Userclass UserSerializer(serializers.ModelSerializer):class Meta:model = Userfields = ('id', 'username', 'email')
```

```
# account/views.py...# For RESTful APIfrom rest_framework import viewsetsfrom rest_framework.response import Responsefrom .serializers import UserSerializerclass AccountViewSet(viewsets.ModelViewSet):queryset = User.objects.all()serializer_class = UserSerializerdef list(self, request, *args, **kwargs):user = request.userserializer = UserSerializer(user)return Response(serializer.data)
```

```
# seiyon/views.py...# for ReactJS & Djangofrom django.contrib.auth.decorators import login_required# For Frontend@login_requireddef myaccount(request):return render(request, 'myaccount.html')
```

```
# seiyon/url.py...# for ReactJS & Djangofrom .views import myaccountfrom rest_framework.routers import DefaultRouterfrom account.views import AccountViewSetrouter = DefaultRouter()router.register('account', AccountViewSet)urlpatterns = urlpatterns + [url(regex=r'^myaccount/(?:.*)/?$',view=myaccount),url(regex=r'^api/',view=include(router.urls))]
```

### RESTFUL API DESIGN

- local

frontend

Root: `localhost:8000/myaccount/`

backend

Root: `localhost:8000/api/`

account: `api/account/`

### ISSUES

### - with vs without ejecting

{% asset_img “Alternatives to Ejecting.PNG” %}

- with ejecting [Modern Django part 1 - setting up django and react](http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/) https://itinerant.tistory.com/140 (korean)
- instead, react-app-rewired https://medium.com/@twagner000/django-create-react-app-without-ejecting-958251af362c

As you can see [the cite](https://create-react-app.dev/docs/alternatives-to-ejecting/#docsNav), ‘ejecting’ have the trade-off. I decided not to use ‘ejecting’ until i really need it. Although i didn’t use it, i get a lot of help from ‘Modern Django part 1’.

### - Django [REST framework](https://www.django-rest-framework.org/)

[Why do we need Django REST API](https://medium.com/@whj2013123218/django-rest-api%EC%9D%98-%ED%95%84%EC%9A%94%EC%84%B1%EA%B3%BC-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95-a95c6dd195fd) (korean)

[view vs generics view vs viewset](https://devlog.jwgo.kr/2019/11/30/4-way-to-build-api-using-drf/) APIview -> generics -> viewsets more abstract and easier

[Tutorial: Django REST with React (Django 3 and a sprinkle of testing)](https://www.valentinog.com/blog/drf/)

https://this-programmer.com/entry/%EA%B0%84%EB%8B%A8%ED%95%9C-react-JS-Django-%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EB%A7%8C%EB%93%A4%EA%B8%B0 (korean)

### MORE

Without ejecting (My first trial and ~~failure~~, finally success) https://medium.com/labcodes/configuring-django-with-react-4c599d1eae63

### - create react app / Next JS

If you need server side rendering React application, use Next JS. It makes easier

### - Server Side Rendering vs Client Side Rendering

https://www.toptal.com/front-end/client-side-vs-server-side-pre-rendering

- Tech Blog Django + React Architecture https://hyperconnect.github.io/2019/10/25/webview-history.html (korean)

Why is React JS with SSR https://subicura.com/2016/06/20/server-side-rendering-with-react.html (korean)

### - React UI Library

Material design vs Reactstrap vs Bootstrap etc…

CSS vs SCSS

### TERMINOLOGY

- webpack (module bundler)

    [Webpack](https://en.wikipedia.org/wiki/Webpack) is an open-sorce Javascript module bundler. It is a module bundler primarily for javascript, but it can transform front-end assets like HTML, CSS, and images if the corresponding loader are included. Webpack take modules with dependencies and generates static assets representing those modules.

- babel (compiler)

    Babel is an open-source Javascript compiler that is mainly used to convert ECMAScript 2015+ (ES6+) code into a backwards compatible version of JavaScript that can be run by older JavaScript engines.

- CORS (Croos-Origin Resource Sharing)

    [Cross-Origin Resource Sharing](https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS) (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) from its own.
