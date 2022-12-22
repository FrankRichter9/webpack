import Post from '@models/post'
import './styles/styles.css'
import json from './assets/json'
import webpackLogo from './assets/webpack-logo'

import * as $ from 'jquery'

import './babel'

import React from 'react'
import { createRoot } from 'react-dom/client'

const post = new Post('Webpack title')

console.log(post.toString())
console.log(json)
console.log(webpackLogo)

// $('pre').html(post.toString())

const App = () => (
    <div>
        <h3>React</h3>
    </div>
)

let root = createRoot(document.getElementById('app'))
root.render(<App />)

console.log('TEST', '123555323232')