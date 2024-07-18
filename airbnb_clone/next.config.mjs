/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    }
}
export default { images: {
        domains: ['avatars.githubusercontent.com',
                   'lh3.googleusercontent.com',]
    },
}