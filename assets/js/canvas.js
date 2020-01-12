


function setup() {
    
var canvasX= $(".canvas").position().top;
var canvasY= $(".canvas").position().left;
    
var DivCanvasWidth = $(".canvas").width();
var DivCanvasHeight = $(".canvas").height();

console.log("width: "+ DivCanvasWidth +" height: "+DivCanvasHeight);
cnv= createCanvas(DivCanvasWidth,DivCanvasHeight);

cnv.parent("canvas_container");
cnv.position(canvasY,canvasX);    
cnv.mouseOver(myMouseOver);



    
    
    
    
createNodeLogic(7);
createNodes();
    

    
}

function drawlines(){
    
    for (i = 0; i < arrOfNodes.length; i++){
    for(k=0; k < arrOfNodes[i].links.length ;k++)
    {
        if(arrOfNodes[i].links[k]==1/*&& k>i*/)
        {
            
            strokeWeight(2);
            stroke('rgb(33, 31, 31)');
            line(arrOfNodes[i].posX,arrOfNodes[i].posY,arrOfNodes[k].posX,arrOfNodes[k].posY);
        }
    
}
    }
}

function draw() {
    
    drawlines();
    myMouseOver();
    
    for (i = 0; i < arrOfNodes.length; i++){
            
        
        
        if(arrOfNodes[i].score >= 0){
        // green for good 
        stroke('rgb(70, 244, 63)');
        strokeWeight(4);
        
         ellipse(arrOfNodes[i].posX,arrOfNodes[i].posY,50,50);
        
        noStroke();
        text(arrOfNodes[i].score,arrOfNodes[i].posX,arrOfNodes[i].posY);
        }
        
        else if (arrOfNodes[i].score < 0){
            // Red for bad
            stroke('rgb(244, 19, 19)');
            strokeWeight(4);
            ellipse(arrOfNodes[i].posX,arrOfNodes[i].posY,50,50);
            noStroke();
            text(arrOfNodes[i].score,arrOfNodes[i].posX,arrOfNodes[i].posY);
            
        }
}
}

function mousePressed() {
    
    for(i =0; i < arrOfNodes.length; i++){
        arrOfNodes[i].onClickTrigger();
        
    }
    
    
}

function myMouseOver(){
    for (i = 0; i < arrOfNodes.length; i++){
        node=arrOfNodes[i];
    let d = dist(mouseX,mouseY,node.posX,node.posY);
        let rad = 10;
        if(d < rad){
            console.log("Hovering: "+ node.id);
         for(k=0; k < node.links.length ;k++)
        {
            if(node.links[k]==1)
        {
            
            strokeWeight(2);
            stroke('rgb(113, 195, 247)');
            line(node.posX,node.posY,arrOfNodes[k].posX,arrOfNodes[k].posY);
        }
    
}
    }
    
}
}



