---
slug: stop-being-an-insert-frameworklanguage-developer
title:  Stop being an "insert-framework/language" Developer
authors: SushritPasupuleti
tags: [advice,fullstack-developer,web-dev,backend,frontend,resources,javascript,python,typescript,react-js,react-native,flutter,express-js,next-js,fastapi,django,go,rust]
cover_img_url: https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/featured1693386498567.gif
---

> This article talks about the worst thing you can do to your career as a developer, and how you can avoid it. I will talk about how I grew out of the same problem, and how you can too. You will see why you should leave yourself open to try and learn new languages, and frameworks, as well as why it is equally necessary to break away and build the solution/replacement yourself instead of injecting another dependency.

Regardless of how long you have been in tech, you must have come across or been a "React Developer", "Python Developer", "C# Developer", and so on. Everyone starts somewhere, and once we find our niche/comfort zone, we tend to not leave it. As humans we are hesitant to embrace change, and that sadly turns out to be the worst quality to have as a developer/engineer (Please do not turn the comments into a war about Developer vs Engineer, this article isn't about that).

And yes, I am the same guy who wrote [this article about learning just 2 languages and being good for your entire career.](https://skillshack.dev/threads/learn-and-use-these-2-languages-for-90-of-your-career-and-never-look-back) The point of the article, still stands, for 90% of the kind of products out there, you could stick to JavaScript (TypeScript please) and Python, and do most of the things, and bring out the special sauce when really required. Having said that, I have learnt a lot since then, and that is why this article now exists.

Before we begin, let me provide a small anecdote that will help you understand why I am writing this article.

I initially started with Python and then moved to JavaScript, and during that time, I worked with Django, Flask, FastAPI and moved to ExpressJS and even NestJS. So I had seen and worked with libraries that came with batteries included as well as those that were barebones.

Sometime later, I picked up Rust, and as I was learning Rust, I wanted to implement a simple API that could serve a few reports from SQL. I needed caching on a few routes for my use case. This is when I realized that Axum had no middleware to implement caching of any kind. In FastAPI, it was as simple as `@cache` before the handler, and ExpressJS had a package for it, I spent a lot of time digging through `crates.io` to find one that worked with Axum, I had chosen Axum because it was both performant, and simple, while also having support for Tower middleware, which sort of guaranteed me a bunch of existing middleware in my opinion.

At some point it hit me that I was reluctant to write the middleware by myself, even though I roughly knew how they worked. That was the moment I realized that I was too dependent on libraries and frameworks (a problem that you develop when you work a lot with Node and Python). So I sat down to learn how Tower handled middleware and implemented my own caching middleware, that handled memcache as well as redis. For a subsequent project I'd also implement HTTP Signatures this way.

As I diversified my stack to include, Rust, and more importantly Go (where you want to rely on the standard library as much as possible), I realized that I could do a lot more things with greater flexibility, while incurring far less tech debt from all the dependencies I had to manage and work around with.

I still stick with my belief that you've to use the right tool for the right job, and you've to move fast when needed. Depending on the scope of work, you want to use what you know, to move fast, and when you need to work on something that has a longer lifespan than a MVP, you need to consider the stack much more carefully. As someone who has shipped MVPs as well as full fledged SaaS products, I have been on both sides, and as such this discovery was important for me since I was prioritizing making things work at any cost over the sustainability of the code I was writing.

Python and JavaScript still remain my recommendations for anyone trying to get into programming.

Story time's over, if you find yourself anywhere in the above cycle, then this article is for you, now let's break everything down by first discussing the typical journey of every developer and then discussing the problems with it.

## The first language and framework

No matter, what your reasons, or situation was, you started with a language. It could be Java, Python, C#, JavaScript, or any other language. You started with one, and you stuck with it. You learnt the basics, and then you started building things. You built a lot of things, and you got good at it. You got so good at it, that you started calling yourself a "Java Developer", "Python Developer", "C# Developer", "JavaScript Developer" or something like that.

Eventually, through work or side-projects you start using a framework, this could be for the backend, for the frontend or even Machine Learning (or AI for the hip crowd). You were either suggested this, or stumbled upon it after some research or maybe an article from someone like me. Frameworks are great, they prevent you from re-inventing the wheel and include a lot of best practices for solving the problems invloved in whatever you're working towards. Need authentication? Yeah this framework has support for all the authentication providers on the planet. Need RBAC? Yeah it has that too.

Initially, you'd not be completely wrong to build things solely with the framework, and think around this framework. A common example is "the Reactive" way of thinking that React developers use whenever they think about implementing something. "Sure we can build this in React".

I'll talk about the problems with this approach later, but first let's talk about the next step in your journey.

## The second language and framework

Eventually, and hopefully, as you work you'll have to learn a new language and framework. This could be because of a new job, or because you want to learn something new or even because whatever you picked first has limitations that are now holding you back. Let's focus on these limitations, I like to break down these limitations into two types:

- Limitations of the language

- Limitations of the framework in the language

### Limitations of the language

Every language has its own limitations, and you'll eventually find yourself being bothered by them, a few examples include:

- "C# is great, but I wish it had a better package manager"

- "Python is great, but I wish it had a better way to handle concurrency"

- "JavaScript is great, but I wish it had a better way to handle types" (*TypeScript has entered the chat*)

- "Java is great, but I wish it had a better way to handle nulls" (*Kotlin has entered the chat*)

- "C++ is great, but I wish it was easier to write safe code" (*Rust has entered the chat*)

In the above examples, I also included the language that solves the problem. This is because, you'll eventually find yourself learning a new language to solve the problems of the language you started with. This is a good thing, and you should embrace it. This is how you grow as a developer, and this is how you become a better developer and build better things.

### Limitations of the framework in the language

Limitations of the language will translate to limitations of the framework, but obviously each framework also has its own limitations. Which is why so many new frameworks are created and maintained.

<p align="center">
  <img height="500" src="https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/meme-11693386594323.jpg">
</p>

Here's a few examples you may have heard of:

- "React SPAs are great, but I wish the bundle size was smaller" (*Server Side Rendering has entered the chat*)

- "Flutter is great, but I wish it was easier to write native code" (*React Native has entered the chat*)

- "Django is great, but I wish the boilerplate was simpler" (*Flask and FastAPI have entered the chat*)

- "FastAPI is great, but I wish it came with more batteries included" (*Django has entered the chat*)

- "Material UI is great, but I wish it didn't bloat my bundle size" (*Tailwind CSS has entered the chat*)

- "Tailwind CSS is great, but my CSS is now all over the place" (*Material UI has entered the chat*)

Now, you'll see a pattern here, a lot of the frameworks in the examples, are solving the same problems, and creating new problems, for eachother to solve slighlty better. And yes some of these limitations can also come down to personal preferences. To some verbose CSS classes in their components is greater control, to some, pre-built styled components are hassle-free, it comes down to your particular needs. More on this later.

<p align="center">
  <img height="500" src="https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/meme-21693386615874.jpg">
</p>

## The "perfect" language and framework

Eventually, you'll have hopped through enough languages and frameworks, or a set is forced upon you (F in chat if you're stuck with COBOL), and you learn to live with it, or you simply do not care. 

- "Most web applications can be built with JavaScript, there's plenty of packages on npm written by the community so I am covered". 

- "React is backed by Facebook, and a lot of big companies use it, it will never die". (*coughs* PH*coughs*P)

- "Python is meant for Machine Learning, and there's a lot of libraries for it, so I am covered".

Through logic like this, you'll convince yourself that you've finally reached a comfortable spot in your career, and you can just stick to this language and framework that has served you well. You have probably solved enough business problems with this stack that you are understandably feeling this way. This is where your troubles begin.

## Change

Change is the only constant in life (ironically), and this is especially true in tech. You may think, that we have a lot more "stable" products now when compared to the early days when a lot of problems were unsolved, and a lot of technology was still in its infancy. There was no fancy "Just In Time Compilation" or "Garbage Collection" back then, we have a lot of solutions cooked up to address all sorts of problems, so it isn't like what it once was, and the rate of change, and more likely, the disruptive nature of change has gotten a lot better (to a degree probably).

<p align="center">
  <img height="300" src="https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/meme-61693386869615.gif">
</p>

These arguments have been thrown around for decades, but in each era, we have had multiple solutions devised for the problems of that time. To serve webpages back in the day, you had everything from PHP, to AJAX to a bunch of college students running their own custom network stack to serve up XML. And we know which of those survived to this day.

`create-react-app` was the way to go for React apps, until it became slow and bloated, and fell out of favour and eventually the team themselves stopped recommending it. A lot of people then flocked to `create-next-app`, the JavaScript web framework space is very competitive right now, and each framework is not just improving on its predecessor, but also adopting the good things its current competitors are. Like with all markets, competition is a good thing and the consumers win as they get better quality and innovative products, instead of rebadged products (Apple fans would know).

So competition is good, good things are coming out, what does this mean? There's more change, and that change requires you to adapt. People in tech respond to it in two ways as I see it:

- "X already gets the job done, people just need an excuse to build something new"

- "I am glad X is here, it solves a lot of problems that Y had"

### "X already gets the job done, people just need an excuse to build something new"

This is expected, and in a lot of cases, not everything new is better, sometimes new stuff has a lot of finer kinks that need to be ironed out before being ready for prime time. And sometimes it exists for the sake of existing.

But, this is not always the case, and you should not be so quick to dismiss something new. A lot of the times, the new thing is solving a problem that you didn't even know you had. And this is where the second response comes in.

### "I am glad X is here, it solves a lot of problems that Y had"

This is less common, but it is almost the right way to respond to change. Why is it "almost" the right way? Well let's discuss.

## The right way to respond to Change

As humans, like the technologies we work with, we too have limitations, to some people that may be their learning rate, ego, or a lack of time. As such what can you do?

Ego is a big one, and that is something that you need to lose as quickly as possible, but the other two, they are a bit more tricky. You can't just magically increase your learning rate, and you can't magically get more time. But you can make the most of the time you have, and you can learn to learn more effectively.

To make the best of the time you have, you should plan better, as with all things in life, planning makes your efforts more focused and effective. Here's how I plan my learnings:

- As I work on things, I make a note of the problems I face, and the limitations of the tools I am using.

- I then make a list of these problems and limitations, and I try to find solutions to them. 

This sounds nice, but if you've googled something like: "best SQL ORM for X", you'll be bombarded with a lot of options, and most resources don't do a better job at making the choice easier for you. What even is the point of saying "High Performance" in all of them, and listing features that are common to all of them?

> **NOTE**: I am using an ORM as an example here, but this applies to all sorts of tools, and even languages and frameworks. Plus I am not a fan of ORMs, and I prefer to write my own SQL, with some helpers, but that's a topic for another day.

It can become a quick timesink and it isn't unexpected for you to want to get out of it and stick to what you've been using with some clever hacks. Surely, a few caveats are better than potentially spending weeks learning something that may not be completeley better right?

Well, partially, what I like to do is that I go through the documentation of the tools I am considering, (the state of the documentation can sometimes tell you a lot about how easy it will be to work with) and skim through it to see the headline features that are showcased and how they're implemented. If a library boasts readability, and has atrocious naming, that's a strike in one aspect. If they claim to have the fastest query builder, but you cannot see how it works well enough with joins that's a strike. Compare all the libraries on your list.

Now this will not narrow down your list from 10 to 1, it will probably bring it down to 3-4, and that's good enough. Now you can start building a small project with each of them, and see how they feel. This is where you'll see the real differences, and you'll be able to make a better choice.

For projects, go with something that isn't a todo list, there's only so much complexity you can build into one, sure you can add caching, full text search, and a bunch of other things, but that's probably not robust enough to truly stretch a library to its limits. Most todo apps for example, may not require joins, or use of much more advanced DB features like indices, partitions, etc. It is here that you apply the wisdom from your long career of working on projects to come up with scenarios to test these libraries.

## When not to pick a new framework

Sometimes, you'll find yourself in a situation where you're working on a project, and you're using a framework that you're comfortable with, and you're faced with a problem that the framework doesn't solve well. You'll then find yourself looking for a new framework, and you'll find one that solves the problem well. But, you'll also find yourself in a situation where you'll have to rewrite a lot of code to make the switch. This is where you need to ask yourself, is it worth it?

Full rewrites are almost never worth it, unless you are burning millions in AWS bills because you're using an ExpressJS server to serve 20 Million requests an hour. Even then, what you end up going with or if at all (there are opportunity costs also to consider) is up to you and the team.

<p align="center">
  <img height="500" src="https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/meme-91693386726852.jpeg">
</p>

Sometimes, all you may be missing is a single feature, and you may find yourself looking for a framework or library (that may not couple well) to solve that problem. This is where you need to try and solve the problem yourself, can you come up with a patch/solution yourself?

It could be as simple as a missing implementation of a modulo operator in Rust that you can implement yourself with some googling, that doesn't require a whole new math library to be imported.

## What you should focus on learning instead

In the end, learning quickly is only half the solution, you can gain a lot of information about a framework from the examples provided and get started with them, but if you actively spend time in understanding how the underlying features are implemented and work, you'll be able to extend it to fit your requirements better when you encounter a missing feature.

Like what happened in my case, learning how middlewares work in a particular backend framework, and how you can write your own, by doing this, you can implement a lot of custom middlewares instead of hunting for an obscure package that does it for you (which may not be well maintained even) or hunting down a new framework that supports this out of the box.

Frameworks are unavoidable, and as such, for the above to be possible, you should pick frameworks that allow a degree of freedom to deviate from the "happy path", like how React Native lets you inject native code easily. A highly opinionated framework may not allow this.

## Conclusion

In the end, I want you to take away this, do not lock yourself to a single stack, no matter how good it is today, or has been for a while now. Nothing is set in stone, and will not have the same growth as it once did, no matter who is invloved. Familiarize yourself with the innerworkings of the languages, and frameworks you work with, and be in a position where you can patch/replace large portions of it whenever needed. By not limiting yourself to a particular stack, you also become open-minded and versatile, you will find more opportunities and be a welcome addition to teams due to that open-minded nature.

Build great software, and have fun doing it. Don't be stuck in dependency hell. The standard library of a well designed language is your friend.

<p align="center">
  <img height="300" src="https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/meme-51693386752624.gif">
</p>

And on the note of building great software, please check out my startup, [skillShack(⚡️);](https://skillshack.dev/) — A platform for people like you to:

- Network
- Share your projects (get feedback on your code or your execution from our community)
- Document your progress
- Connect with other developers
- Collaborate, find opportunities, and more!

You can have all your activities compiled into one amazing Resume that you can take anywhere, and certificates that commend you for each project you have worked on!

<p align="center">
    <img height=400 src="https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/skillshack1693386768812.png"/>
</p>

Thanks for sticking till the end, have a productive day! Consider following me if you want to join me on my journey ([you can read about my journey here](https://medium.com/@sushrit.pk21/how-i-built-my-startup-as-a-solo-developer-8561bf7eebde)) as I build and scale this company to reach more developers like you! 
