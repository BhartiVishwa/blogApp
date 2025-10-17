<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev


```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
1. facing issue into image api 
to upload image to the server 

2. In React (and Next.js), if you want to show data inside a child component,
you must pass it as props from the parent.


3. Add role based authentication where 

Admin: Can manage everything (add, edit, delete all blogs)
User: Can only view blogs and manage their own blogs (add their own, delete only their own)

    3 when user is ones login that verifed user can intered inside the app 
      if user want to use another email ID so need to logout first then use other accound 

4. add  who's user  login show the users name  header 

5. when delete blog from the bloglist its delete from the fist blogpage and also delete in database also 

6.
Method 1:

Create a separate /api/auth/admin-signup route

Use an admin secret key from .env

After first admin is created, remove or disable this route

Let admins manage other users through admin panel