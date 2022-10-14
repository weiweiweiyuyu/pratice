var color = "blue";
function changeColor(){
    let anotherColor = "red";
    function swapColor(){
        let tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        //这里能访问到tempColor、anotherColor、color
    }
    //这里能访问到anotherColor和color
    swapColor();
}
//这里只能访问到color
changeColor();

