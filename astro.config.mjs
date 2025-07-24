// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: "https://KeaneWong.com",
    base: "/Satellite-Shell",
    trailingSlash: "ignore",
    integrations: [mdx(), sitemap(), react()],
    // base: process.env.NODE_ENV === 'production' ? "/Satellite-Shell" : "/",
    output: 'static',
    outDir: './dist'
});