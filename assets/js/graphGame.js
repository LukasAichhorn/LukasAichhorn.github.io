
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
    //reset Node array
    arrOfNodes = new Array();
   var prev_x=50;
    var prev_y=50;
    var x,y;
    let threshold = 0.2;
    for(i=0;i<matrix.length; i++){
        
        
        console.log("prev_x"+prev_x);
        console.log("prev_y"+prev_y);
        //get previous node position and get random number outside of boundaries
        let upperbound_x =prev_x + prev_x * threshold; console.log("uB_x: "+upperbound_x);
        let lowerbound_x =prev_x - prev_x * threshold; console.log("lB_x: "+lowerbound_x);
        
        do{  
            x = randomInt(100, 800);
            
        }while(x < upperbound_x && x > lowerbound_x); // if false continoue
         console.log(x+"  is inside boundaries");    
            
        
        
        let upperbound_y =prev_y + prev_y * threshold;
        let lowerbound_y =prev_y - prev_y * threshold;
        
        do{
            y =randomInt(100 , 400);
        }while(y < upperbound_y && y > lowerbound_y);  // if flase continoue            
              
        
        var randScore =randomInt(-5,5);
        
        arrOfNodes[i]= new Node("Node"+i,x,y,matrix[i],randScore);
        
        prev_x =x;
        prev_y =y;
       
    }
    console.log(arrOfNodes);
return arrOfNodes;
}










