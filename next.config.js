/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Blog posts are read from disk at render time, so make sure they ship
    // with the server functions that re-render pages on a schedule.
    outputFileTracingIncludes: {
      "/**": ["./content/blog/**"],
    },
  },
};

module.exports = nextConfig;
