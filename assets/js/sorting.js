    var ARR=[];
    var log =[];

function createArr(size){
    ARR=[];
    for(var i =0;i< size;i++){
        ARR.push(Math.floor(Math.random() * 20)+1);
    }

    return ARR;

}



function draw(arr){
    //delete old
    $(".canvas").empty();
    console.log("I deleted the Array");

   for(var i =0;i<arr.length;i++){

    $('<div />',{
                width:(($(".canvas").width()/arr.length)),
                height:Math.floor($(".canvas").height()/arr[i]),

                class: "bar"}).appendTo(".canvas");


}
    return true;
}



//calculate Bubble sort

function bubbleSort(arr){



    //
    var done = false;
    var swapped = false;
    var it =0;
    while(done == false){
       swapped = false;
        it++;
        console.log("--------- this is the "+ it + "Iteration of the whole Array");


        //arr.forEach(async function(value,index){
         for(var index =0 ;index < arr.length;index++){

        var val_active=arr[index];
        var val_compared=arr[index+1];

        //console.log("compare " + val_active + " with " + val_compared);

            if(arr[index+1]<arr[index]){

                arr[index]=val_compared;
                arr[index+1]=val_active;
                n_arr = arr;
                console.log("we swapped " + arr  );
                temp = [];
                for(i of arr){
                temp.push(i);
                }

                log.push(temp);

                swapped= true;
        }

            else{

            }


    }//);


    if(swapped == false){
        done = true;
    }
    }
animateSteps(log,0);
    return arr;


}

function UpdateHeight(arr){
    var i = 0;


               $(".canvas > .bar").each(function(){
                    $(this).animate({
                    height: Math.floor($(".canvas").height()/arr[i])
                    },40);

            i++;

        });
     console.log("I animate" + arr );




    }

function test(arr){
for(const[index, value] of arr){
console.log(index);
}}


 function animateSteps(arr,v){
while(v != log.length){

    UpdateHeight(arr[v]);
    v++;

}




 }


function quickSort(arr,low,high){

    if (low < high){
        pi =partition(arr,low,high);
        console.log("looking at lowerbound"+ low + "to" + pi+"-1");
        quickSort(arr,low,pi-1);
        console.log("looking at upperbound"+ pi+"+1" + "to" + high);
        quickSort(arr,pi+1,high);

    }

return "quick sort Done";

}




function partition(arr,low,high){
//get last elemt
var last_index = high;
var pivot = arr[last_index];
var smaller_elem= (low -1);
var i=low;

    for(i; i <= last_index-1; i++){
    console.log("start loop with pivot= "+ pivot);

        if(arr[i] < pivot){
         console.log(arr[i] + " is smaller than pivot "+ pivot);
            smaller_elem++;
         console.log("we set position of smaller object to " + smaller_elem);

            swap(arr,i,smaller_elem);
            UpdateHeight(arr);
            console.log(arr);




        }
        else{
            //do nothing continou loop

        }

    }


    swap(arr,smaller_elem+1,last_index);
    console.log(arr);
    UpdateHeight(arr);
    return (smaller_elem+1);

    }


 function swap(arr,index1,index2){
     var index1C=arr[index1];
     var index2C=arr[index2];

     arr[index1]=index2C;
     arr[index2]=index1C;

 return arr;
 }


//Main function

$(document).ready(function() {
    $('#ArrSubmit').click(function() {
        var size = parseInt($("#ArrSize").val(),10);
        createArr(size);
        draw(ARR);
        console.log("I get triggerd");
    });





});

 $( "#BS" ).click(function() {
        bubbleSort(ARR);
});

    $( "#QS" ).click(function() {
        var low =0;
        var high =ARR.length-1;
        quickSort(ARR,low,high);
});

