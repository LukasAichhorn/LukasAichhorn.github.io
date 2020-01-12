var row=[];
var maze=[];
var obstacles= [];
var SP;
var EP;
var SP_set = false;
var EP_set= false;
var open_list = [];
var closed_list = [];
var successors = [];
var target = [];
var endpoint_found = false;
var currentNode;
var leastF;
var finalPath=[];



$(document).ready(function() {
    createGrid(40);
    console.log("I created the grid ");
    
    
    listen_onclick();
    
    $('#BTN-Start').click(function() {
    RunA_star();
    });
    
    $('#BTN-Clear').click(function() {
    reset_layout();
    
    });
});









function RunA_star(){
    
open_list = [];
closed_list = [];
successors = [];
target = [];
endpoint_found = false;
finalPath=[];

    
open_list.push(getCellByName(SP));
var count = 0;

//solange openliste nicht leer ist :
while (open_list.length !=0){
    
    
    
    //find the node with the least F
    leastF=getMinF();
    
    console.log("Iam currently at "+ leastF.id);
    //remove leastF (current position) cell from open-list
    remove(leastF);
    //add the current position to the closed list
    if(containsObject(leastF,closed_list)===false){
    closed_list.push(leastF);}
    
    else{break;}
    
    if(leastF.id === EP){
        console.log("we found the endpoint Hurray");
       
       break;
    
    }
    // find sucessors and compare with walls
    leastF_name = leastF.id;
    
    findSuccessor(getCellByName(leastF_name));
    
    //calculate metrics for all targets
    for (var i = 0; i < target.length; i++){
        
        if(typeof(target[i]) === "object"){      
        
            if (containsObject(target[i],closed_list) === true){
            //do Nothing 
            }
        
            else if(containsObject(target[i],open_list) === false){    
                calcMetrics(target[i]);
        
                target[i].parent = leastF.id;
                open_list.push(target[i]);
            
            }
        else{
            
        console.log("++++++++++ "+ target[i].id);        
        var newG= leastF.g + (Math.sqrt(Math.pow(getCellByName(leastF_name).x-target[i].x,2)+Math.pow(getCellByName(leastF_name).y-target[i].y,2)));
        var newFscore = newG + target[i].h;
        
        if(newFscore < target[i].f){
          target[i].parent = leastF.id;
            console.log("++++++++++  new f score is lower for "+ target[i].id);
        }
    }
    
    
        
        
    }
    }
    
    
    count++;
    console.log("this is the "+ count + "loop." );
    
    
    
    
    
   animatePath();
        }//end while
    
GetParentPath(EP);
animateFinalPath();
    

    
        
}



function listen_onclick(){ 

        $(".grid").children().click(function(){
            
        if (SP_set == false){
            SP =$(this).attr("class");
            $(this).addClass("SP");
            SP_set = true;
            
            console.log("Start point = "+ SP);
        }//if
        else if (SP_set == true && EP_set == false){
            EP =$(this).attr("class");
            $(this).addClass("EP"); 
            EP_set = true;
            console.log("Endpoint= "+ EP);}
            
         else if (SP_set == true && EP_set == true){
            obstacles.push(getCellByName($(this).attr("class")));
             $(this).addClass("wall");
            
            console.log(obstacles);
            
        }//else if             
        });//Click Function
}//Listen_onclick

function reset_layout(){
        
        SP_set = false;
    console.log("SP_set: "+SP_set);    
    $(".SP").removeClass("SP");
        
    
        EP_set = false;
    console.log("EP_set: "+EP_set);
        $(".EP").removeClass("EP");
        
    
        obstacles = [];
        console.log(obstacles.length);
    
        $(".wall").each(function(){
            $(this).removeClass("wall");});
            
            
        $(".grid").children().each(function(){            
            $(this).removeClass("closed");});
    $(".grid").children().each(function(){            
            $(this).removeClass("FP");});
        
    
    }











function createGrid(size) {
    var ratioW = Math.floor($(".canvas").width()/size),
        ratioH = Math.floor($(".canvas").height()/size);

    var parent = $('<div />', {
        class: 'grid',
        width: ratioW  * size,
        height: ratioH  * size
        
    }).addClass('grid').appendTo('.canvas');

    for (var i = 0; i < ratioH; i++) {
        for(var p = 0; p < ratioW; p++){
            $('<div />', {
                width: size - 1,
                height: size - 1,
                class: "x"+p+"y"+i
                
            }).appendTo(parent);            
            maze.push({ id:"x"+p+"y"+i,x:p,y:i,f:0,g:0,h:0,parent:"none"});
            
        }
        
        //maze.push(row);
        //row=[];
    }
    
   
    
}
    
     


 
function getCellByName(name){
   return maze.find(x=>x.id == name);
}
function getCellByCoord(X,Y){
   return maze.find(z=>z.x == X && z.y==Y);
}

function getCellByF(val){
   return open_list.find(z=>z.f == val);
}

function getMinF(){
    var val_F=open_list.map(d=>d.f);
    var val_F_min= Math.min.apply(Math,val_F);
    return getCellByF(val_F_min);
    
    
    
}

function remove(name){
    for (var i=0; i < open_list.length;i++){
        
        if(open_list[i].id == name.id){
            open_list.splice(i,1);
        }
     }
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

function findSuccessor(activeCell){
    successors=[];
    target=[];
    var current_x= activeCell.x;
    var current_y=activeCell.y;
    
    successors.push(getCellByCoord(current_x,current_y-1));
    successors.push(getCellByCoord(current_x+1,current_y-1));
    successors.push(getCellByCoord(current_x+1,current_y));
    successors.push(getCellByCoord(current_x+1,current_y+1));
    successors.push(getCellByCoord(current_x,current_y+1));
    successors.push(getCellByCoord(current_x-1,current_y+1));
    successors.push(getCellByCoord(current_x-1,current_y));
    successors.push(getCellByCoord(current_x-1,current_y-1));
        
    for (var i = 0; i< successors.length;i++){
        if(containsObject(successors[i],obstacles)== false){
            target.push(successors[i]);
            
        }
    }
}

function setparents(arr,parent){
    for (var i = 0; i < arr.length; i++){
        arr[i].parent =parent.id;
        
    }
    
}


function calcMetrics(arr){
    
    
        
    arr.g= leastF.g + (Math.sqrt(Math.pow(getCellByName(leastF_name).x-arr.x,2)+Math.pow(getCellByName(leastF_name).y-arr.y,2)));
        
    arr.h= Math.sqrt(Math.pow(getCellByName(EP).x-arr.x,2)+Math.pow(getCellByName(EP).y-arr.y,2));
    arr.f = arr.g + arr.h;
    

}

function animatePath(){
for (var i = 0; i < closed_list.length; i++){
    
    if(closed_list[i].id === SP || closed_list[i].id === EP){
        
    
}
else{
    $("."+closed_list[i].id).addClass("closed");
    
}
}
 
    
}


function GetParentPath(cell_name){
try{
    while(typeof(getCellByName(cell_name).parent) != "undefined"){    
    finalPath.push(getCellByName(cell_name));
        cell_name =getCellByName(cell_name).parent;
    
        return GetParentPath(cell_name);}
}
catch(error){
        return finalPath;
}        
        
    }
    
function animateFinalPath(){

for (var i = 0; i < finalPath.length; i++){
if(closed_list[i].id === SP || closed_list[i].id === EP){
        
    
}
    
   else{ $("."+finalPath[i].id).addClass("FP");}
    
}
}
       
    



