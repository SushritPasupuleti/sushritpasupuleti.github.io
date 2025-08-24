---
slug: learn-and-use-these-2-languages-for-90-of-your-career-and-never-look-back
title: Learn & use these 2 languages for 90% of your career and never look back
authors: SushritPasupuleti
tags: [javascript, python, frontend, backend, fullstack, web-dev, mobile-developer, guide, beginner-friendly, ml]
cover_img_url: https://cdn-images-1.medium.com/max/2000/1*zXLl7IPt8lxhkTxndxNceQ.jpeg
---


## Learn & use these 2 languages for 90% of your career and never look back

![For most of us, 2 will do](https://cdn-images-1.medium.com/max/2000/1*zXLl7IPt8lxhkTxndxNceQ.jpeg)
>  This article will detail my beliefs on why for most people out there learning these 2 languages would be sufficient, and how you can dive deeper and deeper into them to cater to all your needs. Be it portfolio buidling, your next startup product, these 2 will have you covered. You can basically build a fullstack application by the end of this article by following the resources mentioned.
>  This will be a long post, so feel free to skim through sections you are familiar with.

In this universe, there are few things that you cannot avoid: [Getting Rick-Rolled](https://youtu.be/dQw4w9WgXcQ) and getting into a debate over which language/framework one should pick and stick to.

The dilemma of picking a language/framework comes from the fact that the time invested to learn it in the first place is a lot. And the possibility of finally understanding it enough only to realize it cannot do what we wanted to do with it. And finding another that can is what haunts everyone before they pull the trigger.

So why should you listen to me or anyone? The thing is no one has the right answers. All of us are inherently biased towards something. In my case, the only justification I can offer is that I have used these and many more languages/frameworks over the years (almost 15 years now)and I continue to explore new ones as time goes on. And I’ve found myself coming back to these.

## Enough talk let's get down to business

Now, let's discuss the solution I propose:

 1. **Node.js (JavaScript)**

 2. **Python**

JavaScript and Python are well known, and both receive their fair share of praises and criticism. And everything has pros and cons, these two are far from perfect from a purist's point of view. Just think of your favorite TV Show or Movie, there will always be haters, some with valid points too.

Let's list out everything possible with these 2 and the frameworks/libraries I use to make them yield good quality results.

In brief here are my suggestions:

* **Web**: NodeJS (React/NextJS)

* **Mobile**: React Native

* **Server**: Express/Django/FastAPI

* **Machine Learning**: Tensorflow

* **Database**: Mongoose for MongoDB, Sequelize for SQL Flavours

## Web Development

Web development is an easy answer. Everyone who has built a website has used some JavaScript somewhere.

**The Classic HTML+CSS+JS:** This will always be the easiest way to build a simple website add some [Bootstrap](https://getbootstrap.com/), [Materialize](https://materializecss.com/) and you can produce some beautiful and functional websites.

**[ReactJS](https://reactjs.org/)**: React allows you to do so much more, you still use HTML and CSS but you use NodeJS and you are basically creating User Interfaces that are as robust and feature Rich as an App would be. Its got some good to haves like reusable components (components are like tiny parts of your page that you would like to reuse Ex: a login form) that make development simpler. Plus you can build PWAs (Progressive Web Apps) which are websites that can be used after being installed like a native app from your device (No internet needed after the install).

React is kinda overkill when it comes to building a landing page though.

**[NextJS](https://nextjs.org/)**: NextJS is based on React, so you end up using a lot of the same principles, however, NextJS supports certain concepts like:

 1. [Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching)

 2. [Server-Side Rendering](https://nextjs.org/docs/basic-features/data-fetching)

You can click on the links to learn more, in a nutshell, they allow you to fetch data on the server, populate it into the page being sent to the user on a request or fetch it once when the website is being deployed.

This pattern is essential when you want to build Systems like Social Networks where each person has a profile on a path like **/users/username** and other similar pages that are dynamically generated. Or even blogs where you organize posts by date, categories, etc.

### Some good to haves with React/Next

**Component libraries and complementary resources**: We cannot start this list without discussing component libraries. Component libraries consist of prewritten components like buttons, dialogs, headers, etc that you can reuse in your application and customize to a degree.

* **[material-ui](https://material-ui.com/)**: This is my goto component library of choice. It’s based on [Material Design](https://material.io/design). Offers excellent theming options and if you are planning to build a PWA you can pass off your app as an actual Android app with similar UX.

* **[chakra-ui](https://chakra-ui.com/)**: Offers the same functionality as material-ui but has a different aesthetic you are not losing anything by using the other. I like chakra-ui’s aesthetic more but am deeply invested in material-ui (just a matter of which library I chose on a whim).

* **[tailwindcss/tailwind-ui](https://tailwindcss.com/)**: Everyone is talking about tailwind now and frankly it's good the learning curve is different but in the end no matter which you pick you’ll have a good-looking UI. Tailwind-ui however is paid and seems to have more options than the above 2. So go through the page and decide if it saves you time in designing your own components.

* **[styled-components](https://styled-components.com/)**: material-ui actually has adopted styled-components. This gives you more raw control over the CSS you can apply transformations, selectors with ease and reuse them everywhere with options to conditionally theme them. I use styled-components alongside material-ui. It will work with any component library, all you do is modify the CSS properties or add more.

**State management:** In React we render HTML based on changes to state (variable values assigned/modified by us). This is super handy as React is smart enough to render the exact node that needs to be updated and not the whole page (this is performant). The State can be shared between different components by passing props to child components (This is one way only from the higher level to lower level) (not ideal always).

* **[Context API](https://reactjs.org/docs/context.html)**: This is a built-in API that allows you to pass props in any direction as long as you wrap the components in your context. This is Simple to implement does what it says.

* **[React Redux](https://react-redux.js.org/)**: This allows you to do more than what Context API offers, it can also pass data in all directions, however, you can maintain one state across the entire App/Website and also your local states on the component level. Apart from this Redux offers actions that allow you to update state directly after executing business logic (API calls, some long async function, etc) without worrying about the asynchronous nature, promises, etc. Redux requires a lot of boilerplate, some people do not like it for this (it is also opinionated) but once you get used to the boilerplate it is very flexible. Go with [redux-thunk](https://github.com/reduxjs/redux-thunk)as your middleware of choice, this makes API call triggered state updates easier.

For NextJS I recommend using [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) you will never face any configuration issues.

**Data Fetching/Submission**: Every website requires data fetching, be it loading the active number of likes and comments on a post you’re currently viewing or submitting a form.
>  Always configure [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

* **[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)**: This is the built-in API that allows you to get send data across.

* **[axios](https://axios-http.com/)**: It’s functionally similar to fetch but more backward compatible with browsers. I use this by default.

When using Redux, you can call your data fetching code from within a Redux Action and then push the values you get from the request to update your state. Or just assign it local state whenever convenient.

### SEO

SEO (Search Engine Optimization) is one of the key concerns many developers have when building websites. React by itself uses something called client-side rendering because of which it has terrible SEO however NextJS does not share the same flaw.

* **[next-seo](https://github.com/garmeeh/next-seo)**: This module opens you up to every last SEO option on the web, configure this right and your site will be ready to greet search engines.

## Mobile Development

Building for mobile has always been expensive and challenging, Android and iOS have completely different APIs, different coding environments, and languages not to mention. This is where React saves us again.

### React Native

Once you learn React, you can apply all the concepts to pick up [React Native](https://reactnative.dev/). It builds apps for Android and iOS from one codebase. React Native has a similar API to ReactJS with a few changes that are obvious certain features that are available to the browser may not be available here (like window ). It's mostly simple and you can reuse Redux, Axios here as well.

### Some good to haves with React Native

* **[react-native-paper](https://callstack.github.io/react-native-paper/)**: This is the equivalent of material-ui for React Native, you get a good set of components to start with and you can always chain them together with ease,

* [redux-persist](https://www.npmjs.com/package/redux-persist): One of the advantages of using React Native is, you’re no longer dependent on browser sessions, you can write data to the device’s memory (yes browsers have localStorage). And have it persist. Redux Persist allows you to persist your redux state across multiple launches.

React Native has always been my go-to for mobile development, and there are very few times that you have to actually go tweak native code to get some things working. You can trust React Native in production.

## **Server-Side Development**

Now you need someplace your app can call home, someplace it can count on for data. And this data can come from Databases, from a machine learning pipeline, but someone has to glue these pieces together.

Enter Python with [Django](https://www.djangoproject.com/) and [FastAPI](https://fastapi.tiangolo.com/).

### Django

Django is like the WeChat to The WhatsApp that its competitors are. (WeChat is a super app that does like 50 different things for context). Django does almost everything:

* Routing

* Has an ORM (Object Relationship Mapper, more about this later)

* Support for Templating ([Jinja](https://jinja.palletsprojects.com/en/3.0.x/)) to create your own pages to go with the data you send

* Django-rest-framework

* And more.

Most of all Django has a “Django way” of doing things, so if you follow the way Django does things you won’t go wrong, your services will be secure and robust. This however comes at a cost of a lot of boilerplate that Django generates for you in one command, but you still have to understand a lot of it to get started and do things right.

Django was the first framework I used to build a production application and I liked the way it handled everything. Plus the fact that it's Python, it's easy to connect to your Machine Learning Logic that is guaranteed to be in Python.

### FastAPI

FastAPI is very different from Django, it's simpler to start with like you literally write one function and you have a route mapped, call a function, pass the data from the route and you have a working API. It doesn’t get more simpler. Plus you can always extend and add more features to it like ORMs.

I use FastAPI to call my machine learning pipelines and the API itself is accessed by my express services. It is super fast as the name suggests.

Now if you do not need the features Django offers or you do not need to connect any python code (ML/AI) you can stick to NodeJS and use [Express](https://expressjs.com/).

### Express

Express is basically like FastAPI in the sense that it's simple to get started with and can be extended into whatever you want it to be.

### Some good to haves with Express

* **[helmet](https://www.npmjs.com/package/helmet)**: Sets various HTTP headers that add a bit more security to your application, it's always good to have.

* **[cors](https://www.npmjs.com/package/cors)**: Sets CORS headers that protect your APIs from anonymous requests from untrusted sources.

* **[ejs](https://ejs.co/)**: You can use ejs to send HTML via express responses with conditional logic in it so that it can act as a website with lots of interactivity.

## Database Connectors/ORMs

Now databases are challenging, the queries are hard to make sense of at times, and you are naturally less comfortable testing out new queries, not to mention the query language may not always be what you are comfortable with. ORMs are amazing, they let you skip the native query language for the most part and make querying feel natural to the language you’re using it with.

For Python, nothing is as good as Django’s ORM from my experience. [Mongoengine](https://docs.mongoengine.org/tutorial.html) for MongoDB is good for mongo users.

### Seqeulize

Sequelize is great I’ve used it for 3 projects now and it has never let me down. It comes with a great CLI that handles migrations, the type support is great and it works with all SQL flavors.

### Some good to haves with Sequelize

* **[sequelize-slugify](https://www.npmjs.com/package/sequelize-slugify)**: Generate slugs (for URLs) from a specific field. Useful when you have things like blogs where titles may be the same but need to be converted into URLs (be unique)

* **[sequelize-paginate](https://www.npmjs.com/package/sequelize-paginate)**: Pagination is a common pattern one must implement when building something, it is simple to do, but sequelize-paginate makes it simple and you don’t have to duplicate code for it to work everywhere.

## Machine Learning

Machine Learning deserves a whole post for itself, and luckily [I’ve one](https://towardsdatascience.com/a-practical-beginners-guide-to-machine-learning-dcc9cf5c692b)! The gist is, I have used Tensorflow since the 1st stable launch and it has catered to everything I have wanted to build.

### Some good to haves with Tensorflow

* **[keras](https://keras.io/)**: They keep including and excluding it in the standard library so just wherever it is use Keras. Keras offers a very high-level approach to building models, where you can essentially create layers as objects and link them together instead of performing all the math operations yourself with Tensorflow.

* **[tensorfboard](https://www.tensorflow.org/tensorboard)**: Like chrome dev tools for your machine learning endeavors you can monitor in real-time the performance of your model, the resources it uses, the shape of it, and more things most of us do not understand (myself included).

* **[jupyter-notebook](https://jupyter.org/)**: Jupyter is more an interactive environment that I recommend over Python’s IDLE to everyone, and when you configure it well, it's excellent for data science, you can execute code as cells and make changes without rerunning the whole program each time.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ALM1R7SQUso" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

So that’s all from my side, be sure to let me know your thoughts in the comments down below 👇. Would love to hear your experiences and suggestions too 😁.

Until next time, keep at it!

