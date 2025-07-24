// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: "https://KeaneWong.com",
    base: "/satellite-shell",
    trailingSlash: "ignore",
    integrations: [mdx(), sitemap(), react()],
    // base: process.env.NODE_ENV === 'production' ? "/satellite-shell" : "/",
    output: 'static',
    outDir: './dist'
});