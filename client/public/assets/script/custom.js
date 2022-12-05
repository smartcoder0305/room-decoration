 $("#posts").owlCarousel({
   stagePadding: 150,
   loop:true,
   margin:20,
   nav:true,
   navText: ["<img src='file/images/left_arrow.png'>","<img src='file/images/right_arrow.png'>"],
    responsive:{
        0:{
            items:1,
            stagePadding: 50,
        },
        600:{
            items:2,
            stagePadding: 50,
        },
        1000:{
            items:3
        }
    }
    })
  
    

// $("#menu").click(function(){
//     $(".menu").css({"right":"0"})
//     $(".crs").click(function(){
//         $(".menu").css({"right":"-100%"})
//     })
// });

$("document").ready(function(){
    $(".preload").css({"display":"none"})
})