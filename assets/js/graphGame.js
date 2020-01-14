
//Generating 0 or 1
function RandZeroOne(){
    var rand= Math.random();
    if(rand <= 0.7){
        return 0;
    }else{
        return 1;
    }
    
}

function randomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
         }


//creating a node class
class Node {
    
    constructor(id,posX,posY,links,score){
        this.id= id;
        this.posX= posX;
        this.posY= posY;
        this.score= score;
        this.links= links;
    }
    
    getScore(){
        return this.score;
    }
    
    setScore(newScore){
    this.score = newScore;
    }
    
    onClickTrigger(){
        let d =dist(mouseX,mouseY,this.posX,this.posY);
        let rad = 10;
        if(d < rad){
            //summing up all elements in our links array to know to how many nodes we need to distribute
            this.score = this.score - this.links.reduce((a,b)=> a+b,0);
            for(i=0; i< this.links.length; i++){
                if(this.links[i]==1){
                    arrOfNodes[i].score++
                    
                }
                
            }
            
            console.log(this.id +" has been triggered");
           //change color:
            
           }
        
        
        
        
    }
    onHoverTrigger(){
        let d =dist(mouseX,mouseY,this.posX,this.posY);
        let rad = 10;
        if(d < rad){
            console.log("Hovering: "+ this.id);
         for(k=0; k < this.links.length ;k++)
        {
            if(this.links[k]==1)
        {
            
            strokeWeight(2);
            stroke('rgb(239, 215, 37)');
            line(this.posX,this.posY,arrOfNodes[k].posX,arrOfNodes[k].posY);
        }
    
}
    }
    
}
}



//create array of nodes:

var matrix = new Array();

//creating logic matric
function createNodeLogic(numberOfNodes){
    //reset matrix 
    matrix = new Array();

    
    var x,y;
    //create 0 filled 2d array:
    for(x=0; x < numberOfNodes;x++)
    {
        matrix[x]=[];
        for(y=0; y < numberOfNodes;y++)
        {
            matrix[x][y]=0;
        }
    }
            
            
            
    //assign values and making it inverse:
    for(x=0; x < numberOfNodes;x++)
    {
        
        for(y=0; y < numberOfNodes;y++)
        {
            //console.log("x:"+x+"|y:"+y);
            if(x==y)
            {
                //matrix[x][y]= 0; Keep the zero for no self-reference
            }
            else if(y == x+1)
            {
                
                matrix[x][y]= 1;
                matrix[y][x]= 1;
            }
            else if(y >=x+2)
            {
                var val =RandZeroOne();
                matrix[x][y]=val;
                matrix[y][x]=val;
            }
        }
    }
    
    return matrix;
}


//print logic Matrix jff:




var arrOfNodes = new Array();
function createNodes(){
    let W = $('.canvas').width();
    let H = $('.canvas').height();
    
    
    var prev_x;
    var prev_y;
    var x=40;
    var y=40;
    var radius=25;
    
    let threshold = 0.4;
    //reset Node array
    arrOfNodes = new Array();
  
    
    
    for(i=0;i<matrix.length; i++){
        //generate RandomScore for node
        var randScore =randomInt(-5,5);
        //if i =0 we create the initial node with starting values
        arrOfNodes[i]= new Node("Node"+i,x,y,matrix[i],randScore); 
        //we set up spaceboundaries for x and y
        
        console.log("current_x: "+x);
        console.log("current_y: "+y);
        //min max distance to next node
        var padding= x * threshold;
        
        //calculate upper and lower bounds in both dirextions
        let upperbound_x =x + radius + padding; console.log("uB_x: "+upperbound_x);
        let lowerbound_x =x - radius - padding; console.log("lB_x: "+lowerbound_x);
        
        let callsx=1;
        do{  
            x = randomInt(0, W);
            callsx++;
            if (callsx > 100) { debugger; }
        }while(x < upperbound_x && x > lowerbound_x); // if false continoue
         console.log(x+"  is inside boundaries");    
        
        
        let upperbound_y = y + radius + padding; console.log("uB_y: "+upperbound_y);
        let lowerbound_y =y + radius + padding; console.log("lB_y: "+lowerbound_y);
        
        let callsy=1;
        do{
            y =randomInt(0, H);
            callsy++;
            if (callsy > 100) { debugger; }
        }while(y < upperbound_y && y > lowerbound_y);  // if flase continoue            
             console.log(y+"  y is inside boundaries"); 
          
    }
    console.log(arrOfNodes);
return arrOfNodes;
}










