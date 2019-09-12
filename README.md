# Purpose 
A web application which will help its audience see their favourite streamer's Twitch events in real-time. User can see the live stream, chat and recent events ( Subscription, Re-subscription and Gift).

# Architecture

![Architecture](https://i.ibb.co/JHHzQhb/architecture.png)

# Flow Chart

![Flow Chart](https://i.ibb.co/1Kw7zyB/use-case-new.jpg)

# Framework & Library 

- ReactJs
- Redux 
- SCSS
- Material UI

# Demo video 
https://www.loom.com/share/025aa4df331a4fdd89903fc1773a4fdb

# Deployed on Heroku
https://twitch-client-jemin.herokuapp.com/

# Area of improvements 
- CSS is not responsive. The stream page may not show properly in the screen which is larger than 13 inches.  But the user can resize the browser to see properly. 
- In chat, Emojis are not shown. Can be shown while displaying the messages. 
- As of now, it is just listening for Subscription, re-subscription and gift events. We can listen to more events as per our requirements. 

# Questions

- How would you deploy the above on AWS? (ideally, a rough architecture diagram will help)
    - There will be one ASG (Auto Scaling Group) of EC2 instances and on each instance the application is running. Initially, there will be 1 instance and as load increases upto 4 instances will be added.
    - ASG is behind the Load balancer which will route the requests to EC2 instances. 
     ![Architecture](https://i.ibb.co/6vTkxJR/arch-1.jpg)

- Where do you see bottlenecks in your proposed architecture and how would you approach scaling this app starting from 100 reqs/day to 900MM reqs/day over 6 months?
    - In proposed architecture requests can be failed if an availability zone becomes unavailable.
    - User may see high latency because static contents also served using the same servers and because of that serves are heavenly loaded. 
    - We need to consider the following things:
        - Multiple Availability Zones: If one AZ is not available then requests can be served from another AZ.
        - Move static content (CSS and Images) to Amazon Cloud Front: which will serve from edge location of Amazon 53 sever.  
        - We can also consider Amazon S3 to store static content.
        - Because in previous architecture all this content also served by end server only so they are heavily loaded and also there will be high latency.
        - We can also use CloudWatch using own custom metrics to scale our servers. 
        - In the diagram just shown 8 instances but we may need more no of EC2 instances to handle 600MM req/ day. 
        
        ![New Architecture](https://i.ibb.co/crgxZDx/Arch2.jpg)  
        
# Google Document
https://docs.google.com/document/d/1smQ7X7dkQ2aOGfJ7JwNtnQppZrqd7uNCigHviL4rCIg/edit?usp=sharing
