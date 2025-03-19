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
        // isDvdGoingRight = containerEdges.right <= dvdRect.right ? -1 : 1;
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
        // console.log(dvdRect.bottom)
        const newTopCord = prevCords[0] + isDvdGoingDown;
        const newLeftCord = prevCords[1] + isDvdGoingRight;
        moveDVD(newTopCord, newLeftCord);
        let angle = Math.atan(Math.abs(newTopCord - prevCords[0]) / Math.abs(newLeftCord - prevCords[1]))
        prevCords = [newTopCord, newLeftCord]
}, 10)

