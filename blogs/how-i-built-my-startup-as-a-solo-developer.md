---
slug: how-i-built-my-startup-as-a-solo-developer
title: How I built my Startup as a solo developer
authors: SushritPasupuleti
tags: [launch, guide, personal-update, announcement, fullstack, startup, mern-stack, react-js, next-js, express-js, postgresql, aws]
cover_img_url: https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/banner-m-21640954520466.png
---

> This article will detail my journey from a Full Stack Engineer to Startup founder over the course of 10 months. Throughout this article I’ll explain the rationale behind choosing each part of my stack and how it played out in the end.

So strap in, it is going to be a long yet fun article!
> 

## So what is my Startup about ?

Well it took a couple weeks to get a clean pitch drafted so I’ll lead with that.

> skillShack(⚡); is a community for software professionals looking to share the projects they are working on and get feedback. From side projects to startups!
> 

![caption](https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/banner-m-11640954836966.png)


![caption](https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/banner-m-21640954903701.png)

![caption](https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/banner-m-31640954903705.png)


With “skillShack(⚡);” I wanted to build a platform for developers to share the projects they are working on, and for those stuck in tutorial hell provide a curated list of challenges that can be built into projects to put their skills to use.

It has been my firm belief since the start that you can only get better at Software Development by actually DEVELOPING SOFTWARE (obvious right ?) and yet most people engage in endless sprints of watching tutorial after tutorial to add new buzz words to their Resumes. Most coding centric platforms online have catered to the problem solving aspects of programming, which while giving you a good understanding of the fundamentals of the language and engaging your intellect have diminishing returns after a while.

So I set out to build this platform with hopes of providing a safe space for developers to share their projects, get feedback from the community and learn from one another.

## Deciding on a Stack

Once I wrote down all the features I would want to make the experience truly unique, I set out to finalise a tech stack. I needed the following attributes:

- Easy to Scale and Deploy
- A Good ORM with a strong API and support for formatted output on Raw Queries.
- React on the frontend (it’s 2021 or 2022 by the time you read this)
- Excellent SEO Support
- PWA Support
- Admin tools that were served separately from the main website
- Social Authentication
- GitHub Integration so that users can link their repositories.

For each requirement I put together a list of possible technologies/frameworks.

## The Stack

- Frontend: Next.js
- Backend: Express.js
- Database: PostgreSQL with Sequelize ORM
- Admin Tools: react-admin
- DevOps: GitHub Actions, Vercel CLI and Docker
- Hosting:
    - AWS EC2 (Backend)
    - Vercel (Both Frontends)

### Why Next.js ?

As stated earlier SEO was crucial for me, and with create-react-app you subscribe to Client-Side Rendering which will not play well with Web Crawlers of Search Engines (they do not execute JS).

Next.js supports SSR(Server Side Rendering), SSG (Static Site Generation) and ISR (Incremental Static Regeneration). I’ll summarize each in simple terms below:

- SSR: Essentially serves documents with all the components rendered and populated with necessary data (from APIs). This way a bot can see all the info without the need for JavaScript execution. This makes serving pages with no real time updates like Blogs, Profile data etc simple and allows for good SEO.
- SSG: It serves purely static pages (No API data), and offers good SEO at the same time. Useful for things like documentation.
- ISR: It’s like SSR but it periodically refreshes the static Pages with new API data. Useful for things like blogs and profiles where updates may not be frequent but do happen and must be reflected.

Bonus: Next.js and Vercel have the perfect ecosystem.

### Authentication: next-auth

It couples perfectly with Next.js, its served as a serverless function via Next.js which fully supports them and Vercel does too in production, so no extra configurations. You can even remotely monitor the function and check for errors through Vercel. It is perfect in every way, you should just look at their website to learn more.

The docs were simple and I was able to setup Google and GitHub authentication in under an hour (had to wait for Google to sync callback urls).

### Component Library: material-ui

I started the project before the Tailwind hype train hit its peak. And I did eventually try it on another project, but it’s not my kind of thing. I’m very good at pure CSS already so I went with material-ui, it comes with a good set of components out of the box and a few more from other community made packages like treasury, pickers etc.

### Admin Tools: react-admin

It comes with a good set of tools out of the box it makes use of material-ui (so easier to customize and share components). Plus you can easily assign roles and give restricted access to different aspects of the App.

### Backend: Express.js

Express has been around since forever and it is pretty much the goto for most people. I added a few packages like express-sequelize-crud so that I could allow my admin tools to query it easily without the need for more endpoints. Secured all the endpoints with JWT authentication and setup Role Based Permissions.

### Database: PostgreSQL

This project was going to have a lot of inter linked tables, so No SQL was not going to cut it. I also needed support for JSON documents to store certain nested data (Resumes). PostgreSQL also supports Full-Text Search (FTS) out of the box which made it easier to build a feature rich Search option.

Sequelize was good, it supported TS_Vectors out of the box which was necessary for me to build FTS supported documents. And the support for formatted Raw Queries made writing joins simpler (kind of a pain doing it through the ORM’s native API).

### Deployment

So my deployment workflow goes as follows:

- Merge a Pull Request to main to Trigger GitHub Actions.
- Build Preview Deployments for the admin and main website on Vercel.
- Once the Preview build is built successfully, promote it to production. (I get notifications for each step on Slack thanks to a sweet Slack Integration).
- In parallel a docker image is created with contents of the backend code and pushed to my EC2 instance, where its run with pm2. A script then performs necessary database migrations via sequelize-cli.

## Closing thoughts

It was a great journey building out the whole project by myself, I learnt a lot of thing along the way including Canva and Figma. Spent a lot of time binging YC Startup School videos to figure out my pitch, website content. I also tweeted my entire journey on Twitter, which was great because I got to connect with a lot of cool people.

I’m excited to close this article by saying skillShack(⚡); is live at skillshack.dev!

Would love to hear your thoughts in the comments!
