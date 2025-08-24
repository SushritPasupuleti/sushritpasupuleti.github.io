---
slug: how-when-and-why-you-should-switch-from-vercel-to-a-different-hosting-provider-especially-for-nextjs
title:  How, When, and Why you should switch from Vercel to a different Hosting Provider (Especially for Next.js)

authors: SushritPasupuleti
tags: [deployment, startup, next-js, javascript, typescript, aws, cloud, guide, frontend, resources]
cover_img_url: https://braggi-free-bucket.s3.ap-south-1.amazonaws.com/undefined%20-%20Imgur1644069541547.gif
---

> This article aims to be a one stop research point for those looking/considering to deploy their Apps off Vercel and why that may be the most important decision you make, provided you do it at the right time. If you are a hobbyist or someone just building projects for your portfolio you are completely fine and are going to be happy with Vercel.
> 

> Now, this article in no way hopes to thrash on Vercel. Full disclosure, I have been using Vercel since 2020 now and almost everything I have built since then (and few from before) have all ended up on Vercel.
> 

> I absolutely love the Developer Experience and pain-free experience in general that they have worked so hard to perfect! I would recommend it to anyone, any day as long as they are within certain limits as we will discuss below!
> 

> So strap in, it is going to be a long, number filled article that breaks down just how much money Vercel spends per user and why their pricing makes sense, but may not be worth it for you if you have the resources.
> 

### So who am I, and why should you listen to me?

Well, I am a full-stack (and no I am equally good with the front-end) developer and a SaaS founder who has been building and deploying for the better part of the last decade.

In that time I’ve gone from serving via my personal laptop (please don’t do this) a random VPS provider for cheap, AWS, Azure, Netlify, and finally Vercel (I still make use of AWS for my Databases and Backends of course).

As established above, I have been on Vercel since 2020, and honestly, it is so darn convenient to build with. You literally never have to worry about anything going down. Just keep your configurations (environment variables, domains, etc) consistent and you never have to worry about setting up Staging, Prod environments, and maintaining them actively.

I recently launched my startup *[skillShack(⚡️)](https://skillshack.dev/)*; (You can read about my journey building it [here](https://medium.com/@sushrit.pk21/how-i-built-my-startup-as-a-solo-developer-8561bf7eebde)). For the front-end (Next.js, also built and maintained by Vercel) I went with Vercel because that as discussed above is the easiest way to deploy Next.js apps and fully utilize all the features offered by it. It has been over a month since the launch at the time of writing this blog, and now I have sufficient data to explain when and why you should consider switching from Vercel to someone like AWS, and also if that’s actually worth it for everyone.

### The Promises and Problems of Vercel

**Promises**: As stated before, it is like pure magic, and in the ideal world almost no one would have a complaint.

**Problems**: The Pricing. Yes, it is just the pricing, and to most people, it would make sense, because once you realize Vercel makes use of AWS ([source](https://vercel.com/docs/concepts/edge-network/regions)) under the hood to handle your hosting and everything else, it is obviously going to be at least slightly more expensive than an apples to apples AWS config you or I come up with to deploy our app. This is the added cost that is meant to offset R&D and whatnot, and everyone deserves to charge how much ever they see fit.

Not to mention, the generous free tier that is bordering on charity. Someone has to pay for it too, and yes those costs could be recouped with the paid tiers.

### Understanding The Pricing (Why it is justified)

**Free tier**: Let’s look at the free tier or “Hobby” as they call it!

![https://cdn-images-1.medium.com/max/800/1*IE6T25vvSkflswgIlJTrsg.png](https://cdn-images-1.medium.com/max/800/1*IE6T25vvSkflswgIlJTrsg.png)

You can basically host unlimited portfolio projects without ever paying a dime!

![https://cdn-images-1.medium.com/max/800/1*0HyeSMEUk4PVRv5Jtjputw.png](https://cdn-images-1.medium.com/max/800/1*0HyeSMEUk4PVRv5Jtjputw.png)

![https://cdn-images-1.medium.com/max/800/1*GBhZTC8PRibTqJaNFYsfEg.png](https://cdn-images-1.medium.com/max/800/1*GBhZTC8PRibTqJaNFYsfEg.png)

Alright, those were all the relevant screenshots to our case with respect to the free tier.

Let’s break it down, the free tier is basically aimed at everyone looking to host as many portfolio projects as possible. These might include your Portfolio website, your blog, any front-end challenges you have participated in.

Basically, anything that will not exceed the 100GB bandwidth limit (it is quite impossible to exceed honestly when you have a small number of visitors coming in every day).

You get free domains linked to all projects, and they’re not randomly generated numbers and letters smashed together, they’re usually like: *your-project-name.vercel.com*

You make one push to master/main on GitHub and viola Vercel starts building and deploying your site for you! You can also get updates on Slack via their integrations.

Now all this for free is quite generous and I actually made a simple chart comparing exactly how much a similarly configured AWS deployment would cost:

![https://cdn-images-1.medium.com/max/800/1*04kZtWA2QaGi-BKFwdUGeA.png](https://cdn-images-1.medium.com/max/800/1*04kZtWA2QaGi-BKFwdUGeA.png)

For mobile users, if the above table isn’t clear let me just summarize by saying that the free tier (if fully utilized to all limits set by Vercel) would cost Vercel about $29.30. That is almost $30 per user (there are a few things to keep in mind like function invocation costs, which are $0.20 per Million Invocations that Vercel does not charge you), quite a huge number considering Vercel has about 25,000 customers ([source](https://venturebeat.com/2021/11/23/web-app-dev-platform-vercel-lands-150m/#:~:text=Among%20the%2025%2C000%20customers%20using,Capital%20managing%20partner%20Glenn%20Solomon.)). Here is a quote from the article talking about their recent (well deserved) fundraise:

> [Vercel] operates a content delivery network (CDN) in 70 cities globally that sits between the internet and Vercel deployments, receiving over 24 billion unique requests per week. The company claims the CDN serves 9 petabytes of data, scaling from millions to billions of web pages through dynamic code execution.
> 

That is a lot of traffic and you can probably imagine how much of it stems from free tier users (I will make no estimates here, but feel free to assume any percentage of free users among the 25K and $30 cost per user).

**Pro Tier**: Let’s look at the “Pro” tier which starts at $20(+$10 for analytics).

![https://cdn-images-1.medium.com/max/800/1*0y_8thhhZ-UHOE3IG1Vkkg.png](https://cdn-images-1.medium.com/max/800/1*0y_8thhhZ-UHOE3IG1Vkkg.png)

![https://cdn-images-1.medium.com/max/800/1*DwXEf2bwNXsqPDqnL4tiPA.png](https://cdn-images-1.medium.com/max/800/1*DwXEf2bwNXsqPDqnL4tiPA.png)

So as you can see, the bump in limits from Hobby to Pro range between 3–10 fold depending on the type of resource. Let’s recollect that the Hobby tier when deployed with AWS would cost $29.30 and the Pro tier (with a 3–10 time limit increase) starts at $20(+$10 analytics).

Now let's open Excel one more time and compare these two plans!

![https://cdn-images-1.medium.com/max/800/1*IhL1B3_yhanmP1hJdSwQcQ.png](https://cdn-images-1.medium.com/max/800/1*IhL1B3_yhanmP1hJdSwQcQ.png)

For mobile users, the summary is as follows: for the $30 you pay (as long as you don’t exceed any of these limits, beyond which you pay quota-based prices) Vercel spends $236.30 to service you. So for every user who subscribes to Pro while staying within its limits, Vercel spends $206.30 servicing you.

- *Sweats** oh boy, Vercel has been such a great value so far! And this probably explains why everyone including myself loves it so much, because even though not everyone has done the math, it is clear just how much value you are getting for your money (and usually for no money).

Feel free to estimate just how much of the 25K customers are probably within these limits and how much they would net Vercel in terms of costs every month.

### Beyond the base limits of Pro

Now in the screenshots from the Vercel websites I’ve included above, you would have noticed this symbol (the dollar in the solid circle) beside a few of the limits specified:

![https://cdn-images-1.medium.com/max/800/1*V5sz7tkQnatOnnFasALZuA.png](https://cdn-images-1.medium.com/max/800/1*V5sz7tkQnatOnnFasALZuA.png)

![https://cdn-images-1.medium.com/max/800/1*u9cxvpQK8eyG2E4TYNogDA.png](https://cdn-images-1.medium.com/max/800/1*u9cxvpQK8eyG2E4TYNogDA.png)

When you hover over it, you see that upon exhausting the allocated 1TB of Bandwidth (per month) you will be charged an extra $55 per 100GB (or $550 per 1TB going forward).

Now obviously this is something you will not hit as a solo developer building and deploying projects for your Portfolio, but as someone serving a website to 1000s of users a day you are sure to saturate the first 1TB and move into the next 100GB.

Let’s just consider a simple load on our website that just exceeds the Pro tier base limits by one (i.e we just consume the first additional 100GB after 1TB and so on with all the resources)

![https://cdn-images-1.medium.com/max/800/1*n67U8fJoMrh1M305ywcpRw.png](https://cdn-images-1.medium.com/max/800/1*n67U8fJoMrh1M305ywcpRw.png)

Again, for mobile users, you can see that the final bills for AWS and Vercel after exceeding the 1TB Bandwidth Quota are $85 and $251.30 respectively.

The Vercel bill jumped from $30 to $85 (Straight addition of $55), while the AWS bill jumped from $236.30 to $251.30 (a modest $15 increase).

Before we draw a conclusion, let's look at a scenario where we consume an extra 500GB and 1TB over the base 1TB limit.

![https://cdn-images-1.medium.com/max/800/1*XL2314EcsL4fyD13ihOADQ.png](https://cdn-images-1.medium.com/max/800/1*XL2314EcsL4fyD13ihOADQ.png)

500GB over 1TB Transfer

![https://cdn-images-1.medium.com/max/800/1*bFrzfyDE0MlmZfnv-p2lGw.png](https://cdn-images-1.medium.com/max/800/1*bFrzfyDE0MlmZfnv-p2lGw.png)

Includes both 500GB and 1TB over 1TB Transfer

Again, for mobile users, let's summarize the final bills for AWS and Vercel:

For 500GB over the base 1TB transfer limit:

- AWS: $311.30 (increased by $40 from $251)
- Vercel: $305.30 (increased by $220.30 from $85)

For 1TB over the base 1TB transfer limit:

- AWS: $386.00 (increased by $74.7 from $311.30)
- Vercel: $580.00 (increased by $274.70 from $305.30)

![https://cdn-images-1.medium.com/max/800/1*96vu865sDgtTbGw6q0MXyQ.gif](https://cdn-images-1.medium.com/max/800/1*96vu865sDgtTbGw6q0MXyQ.gif)

Well as you can see, once you double the bandwidth consumed across both, you see just how much wider the gap between AWS and Vercel gets. Needless to say, for anyone on a tight budget the rising cost difference between the two will become the primary consumer of funds.

And yes I acknowledge there are a lot of factors we did not take into account like increased Serverless Function Execution Time costs, image optimization (this will bleed your money on Vercel but is so handy and bordering on magical). In the end, no matter how you twist your dials, there will be a point beyond which Vercel will hit a point of diminishing returns, the insane value of 200$ worth of compute you get while you stay below the base limits of the Pro Tier will be quickly lost.

Now we are close to a conclusion for the problem part and will soon venture into possible solutions, like the AWS config I’ve been referring to since the start, but before that, I encourage anyone on a tight budget to run your numbers and see just how far it makes sense for you to stick to Vercel. It must also be accepted that moving out of Vercel with something like Next.js is going to be painful, hard to manage, debug, troubleshoot as such there will be higher costs on your end, but if you are that kind of a developer (I am one) then it would be worth it for you to move away from Vercel, and for the rest, who are just hacking away at a MVP and testing waters with a small group of users, you could stomach the excess costs in exchange for all the time saved in trying to set up an AWS or any other platform equivalent deployment for Next.js.

### Ok, I would like to explore alternatives for Vercel, tell me about them

![https://cdn-images-1.medium.com/max/800/1*S3X7mx-xWmEjZ_miUjfzXA.gif](https://cdn-images-1.medium.com/max/800/1*S3X7mx-xWmEjZ_miUjfzXA.gif)

Before we begin, I would like you to read the paragraph above this section in case you skipped to this section. (There is a consideration of convenience vs cost to be made and depending on who you are and what you are trying to do, your needs may change). And again these alternatives are not all perfect, not all the latest Next.js features are guaranteed to work immediately. You would have to wait a few weeks for the community to figure it out, and we do it quickly though!

Alright, let's go through the alternatives. I’ll list them in order of convenience to set up and use (this list is going to be opinionated of course since what I find convenient or inconvenient may not be the same for you, but I will list exactly why as well to help you decide!)

### AWS Amplify — The Easiest one to Setup among the rest | Most expensive among the alternatives too!

AWS Amplify has been continually adding support for Next.js over the years and right now they [support all features of Next.js 11](https://aws.amazon.com/about-aws/whats-new/2021/08/aws-amplify-hosting-support-next-js-version-11/).

Do note the current version, Next.js 12 comes with a host of fun features you can read about [here](https://nextjs.org/blog/next-12) that will not all work out of the box here or with most of the solutions below since they’re being worked on to ensure stability. Vercel is good at the things they do and they deserve all the love the community gives them!

You can find a simple tutorial to set up your Next.js App with Amplify [here](https://aws.amazon.com/blogs/mobile/host-a-next-js-ssr-app-with-real-time-data-on-aws-amplify/).

Now, this alternative costs about the same as Vercel, but a bit less because it’s all AWS infrastructure being used by AWS services. So if you want slight savings with slightly on par developer experience as Vercel go for AWS Amplify!

### Terraform Next.js module for AWS — Easy DIY Setup with no support for ISR!

Everyone loves Terraform, it makes it simple to set up infrastructure from your favorite cloud service provider for common use cases and it’s easy to configure if you do some digging.

One major issue is that it does not support [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/overview#incremental-static-regeneration) which is like a flagship offering of Next.js, simply put you can choose to generate pages at build time and have them be recreated with up-to-date data periodically. Now that is a key feature for the working of my Startup *[skillShack(⚡️)](https://skillshack.dev/)*; so I avoided this solution, but Terraform is well received and easy to use so I put it up here! Plus they are actively working on support for ISR.

You can find it [here](https://registry.terraform.io/modules/milliHQ/next-js/aws/latest).

### Serverless Next.js Component — Easy DIY with support for ISR

Now serverless (the company, not the architectural paradigm) has been around for a long time and they have a great track record with a robust set of solutions for different use cases, and they also built one for Next.js. Their approach is similar to Terraform, you write a config and deploy it through their platform and the respective AWS resources are provisioned on your account with your code.

You can find a simple tutorial on how to set up your Next.js project [here](https://www.serverless.com/blog/serverless-nextjs).

Find the complete project [here](https://www.serverless.com/plugins/serverless-nextjs-plugin#lambda-at-edge-configuration).

This is the current candidate of choice for the migration of my Startup *[skillShack(⚡️)](https://skillshack.dev/)*; from Vercel. (I’m still below the limits of Pro, by a lot, but will soon be hit with what I call “tech debt”)

### Serverless Stack — Extra Steps DIY with support for all features and lots of customization

This solution is quite similar to the one above, but the configuration is done outside YAML files and you’ve to set up quite a lot of boilerplate to get it working. It is [excellently documented](https://docs.serverless-stack.com/constructs/NextjsSite), however, perhaps the best documentation among the bunch!

You can find a simple tutorial on how to set up your Next.js project [here](https://serverless-stack.com/examples/how-to-create-a-nextjs-app-with-serverless.html#create-an-sst-app).

### Conclusion

So that was a long article or it feels like one because of all the tables and comparisons within. Either way, there are a lot of takeaways here. If you value your time and sanity, stick to Vercel, and honestly, I would stick to Vercel for as long as I can, because it's not just about how much of a value it is initially, but the fact that their developer experience is second to none and the wide range of frameworks they support makes them my primary destination to deploy all things front-end. I have 13 projects on Vercel currently, 2 of which are linked to my Pro Account, and I have never had a bad time with them, consider it a solid recommendation if you are someone looking to just host a few portfolio websites.

On the topic of building portfolio projects and side projects, if that sounds like you, you could hop on my Startup *[skillShack(⚡️)](https://skillshack.dev/)*; which is built for developers working on side projects. It is a community built for those building in public to share their projects, get feedback, collaborate, and network!

![https://cdn-images-1.medium.com/max/800/1*gvwDl_E9rdmXg7EFrcoF9g.png](https://cdn-images-1.medium.com/max/800/1*gvwDl_E9rdmXg7EFrcoF9g.png)

That’s all from my side! Would love to hear your thoughts in the comments and hopefully see you on *[skillShack(⚡️)](https://skillshack.dev/)*; !

Follow me on [Twitter](https://twitter.com/sushrit_lawliet) if you want to see tweets detailing my journey building my startup and insights into topics like these that may not become full-fledged articles!