# How to create DVD animation in js


Do you ever wonder how can you create DVD animation to add in your website as screensaver or for any other reason.
I do, so I start think and think for a lot of time. In that thinking I forgot about this.
So you can say that I think about a project so much that I forget it.
But I recently remember about this and instead of think I start coding.
And it turns out that I wasted all that time thinking. Create DVD Animation in JavaScript is very easy.


## Let's create it. 

### Mark Up The Page With HTML First

First let's start with **HTML** 
To create this animation we only need 2 to 3 HTML element depending on your choice.

```html

<div class="container">
    <div class="dvd">
        <img src="./DVD_logo.svg" alt="dvd">
    </div>
</div>

```

Here is all the HTML for the animation. Let's understand what each element is doing.

- **div.container** :- It is used to act as the screen on which DVD logo will bounce around.
- **div.dvd [optional]** :- It is used to contain the DVD logo. And we will move this element instead of moving the image. You can skip this element and directly apply all the motion on the image.
- **img** :- It is used to show the DVD logo. In the code above you can see that I am using a SVG of logo which I have downloaded form [**WikiMedia**](https://commons.wikimedia.org/wiki/File:DVD_logo.svg).
Instead of using a img tag you can copy paste the svg code for the logo here.

Now all the HTML is done so let's go to CSS.

### Style Up The Page With CSS


```css 

.container {
    width: 1200px;
    aspect-ratio: 16/9;
    margin-inline: auto;
    outline: 2px solid black;
    position: relative;
}
.dvd {
    width: 51.2px;
    height: 22.5px;
    position: absolute;
    top: 0;
    left: 0;
}
.dvd img {
    display: block;
    width: 100%;
}

```

CSS for this is fairly straight forward.

- **in div.container** : we are setting some basic stuffs like width, outline etc. But it have 2 thing to notice.
First one is `position: relative;` because we will make DVD logo `position: absolute;` then we will use `top & left` to move it around. And the second one is we are not setting any `height` instead we are setting `aspect-ratio: 16/9;` to give it a monitor screen like feeling.

- **in div.dvd** : we are setting `width & height` of the logo and `position: absolute;` to move it around the screen.
As I told earlier this div is optional you can skip this div and put all this in the `img`.

- **in img** : we are just telling it to take 100% width of its parent.

### Bring It to Live Using JavaScript

Once all the html and css done we can jump into JavaScript to do the magic.


```js 

const dvd = document.querySelector('.dvd');
const container = document.querySelector('.container');
const containerRect = container.getBoundingClientRect();
const containerEdges = {
        top: containerRect.top,
        right: containerRect.right,
        bottom: containerRect.bottom,
        left: containerRect.left
}
let prevCords = [0, 0];
let isDvdGoingDown = 1; // if true then 1 else -1
let isDvdGoingRight = 1; // if true then 1 else -1
function moveDVD(top, left){
        dvd.style.top = top + 'px'
        dvd.style.left = left + 'px'
}
function changeDirection(direction){
        if ( 'up' == direction ){
                isDvdGoingDown = -1;
        }else if ( 'left' == direction){
                isDvdGoingRight = -1
        }else if ( 'down' == direction ){
                isDvdGoingDown = 1;
        }else { isDvdGoingRight = 1 }
}
setInterval(()=>{
        const dvdRect = dvd.getBoundingClientRect();
        if (dvdRect.bottom >= containerEdges.bottom){
                changeDirection('up')
        }else if (containerRect.right <= dvdRect.right){
                changeDirection('left')
        }else if (dvdRect.top <= containerEdges.top){
                changeDirection('down')
        }else if (dvdRect.left <= containerEdges.left){
                changeDirection('right')
        }
        const newTopCord = prevCords[0] + isDvdGoingDown;
        const newLeftCord = prevCords[1] + isDvdGoingRight;
        moveDVD(newTopCord, newLeftCord);
        prevCords = [newTopCord, newLeftCord]
}, 10)

```

Let's understand what is happening here.

Firstly we are selecting the DVD logo and the container. Then we are storing the **

``` js

const dvd = document.querySelector('.dvd');
const container = document.querySelector('.container');
const containerRect = container.getBoundingClientRect();
const containerEdges = {
        top: containerRect.top,
        right: containerRect.right,
        bottom: containerRect.bottom,
        left: containerRect.left
}

```
