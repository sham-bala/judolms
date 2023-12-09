/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ui.shadcn.com",
          port: "",
          pathname: "/avatars/01.png",
        },
        {
          protocol: "https",
          hostname: "img.olympics.com",
          port: "",
          pathname: "/images/**",
        },
        {
          protocol: "https",
          hostname: "img.olympicchannel.com",
          port: "",
          pathname: "/images/**",
        },
        {
          protocol: "https",
          hostname: "static.actu.fr",
          port: "",
          pathname: "/uploads/**",
        },
        {
          protocol: "https",
          hostname: "www.hoc.gr",
          port: "",
          pathname: "/wp-content/uploads/**",
        },
        {
          protocol: "https",
          hostname: "cdn-us.anidb.net",
          port: "",
          pathname: "/images/**",
        },
        {
          protocol: "https",
          hostname: "www.thesun.co.uk",
          port: "",
          pathname: "/wp-content/uploads/**",
        },
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          port: "",
          pathname: "/duu3v9gfg/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  