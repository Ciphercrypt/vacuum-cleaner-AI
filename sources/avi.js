$(document).ready(function(){
    
    
    function toggleState(act){
      if (act === 'o')
        act = 'x';
      else
        act = 'o'
      return act;
    }
    
    



 
    
    
    
    
    
    function boardClick(){
      if(enabled && moves < 9){
        $(this).append($(symbols[active])).off('click').removeClass('free');
        var pos = parseInt($(this).attr('id').slice(1));
        board[pos] = active;
        active = toggleState(active);
        moves++;
        var w = checkPatterns(pos);
        // game ends
        if (w){
          displayWin(w);
          enabled = false;
          setTimeout(function(){
            $('.screen').fadeIn();
            $('.console').fadeIn();
          },500);
          $('#cmd').append('<p class="line2">AI<img src="sources/ai_image.png" style="width:10%;height:10%;" />>_Tac Toe AI  active....,<span class="cursor1">_</span></p> <p class="line1">AI<img src="ai_image.png" style="width:10%;height:10%;" />>_Waiting for <img src="head.png" style="width:10%;height:10%;" />Human input..<span class="cursor2">_</span></p> ');

          return;

        } else if (moves === 9){
          enabled = false;
          displayTie();
          setTimeout(function(){
            $('.screen').fadeIn();
            $('.console').fadeIn();
          },500);
          $('#cmd').append('<p class="line2">AI<img src="sources/ai_image.png" style="width:10%;height:10%;" />>_Tac Toe AI  active....,<span class="cursor1">_</span></p> <p class="line1">AI<img src="ai_image.png" style="width:10%;height:10%;" />>_Waiting for <img src="head.png" style="width:10%;height:10%;" />Human input..<span class="cursor2">_</span></p> ');
          return;
        } else {
          human = !human;
          if(!human){
            enabled=false;
             setTimeout(function(){
               enabled=true;
               $('#n'+computerMove(pos)).click();
             },500);
          }
          return;
        }
      }   
    }
    
    function displayWin(obj){
      $('.el').removeClass('free').off('click');
      switch (obj.pattern) {
        case 'r' :
          $('div.r'+obj.number+' div').addClass('win');
          break;
        case 'c' :
          $('.c'+obj.number).addClass('win');
          break;
        case 'd' :
          $('.d'+obj.number).addClass('win');
          break;       
      }
      $('.out').text('WINS!')
      $('.el-o').append($(symbols[obj.symbol])).addClass('win');
      $('#cmd').empty();

    }
    
    $('#go_cr').click(function(){
      var rows="";
      var colms="";
      var selected1 = $("#x_row");
      if (selected1.length > 0) {
        rows = selected1.val();
        }

        var selected2 = $("#x_col");
        if (selected2.length > 0) {
          colms = selected2.val();
          }

          if(rows!=''||colms!='') {
            $('.select').fadeOut();
            $('.screen').fadeOut();

            $('#cmd').append('<p class="line3"><img src="sources/head.png" style="width:10%;height:10%;" />Human gave input: size of grid->['+rows+'x'+colms+']<b></b></p>');

            var m=+rows;
            var n=+colms;
          

            var count1=1;
            var count2=1;
            for( var i=0;i<m;i++){

              $('.wrap').append('<div class="row r0" id="avi'+count2+'" >');
              for( var j=0;j<n;j++){
                var k="#avi"
                var clsr=k.concat(count2.toString());
                $(clsr).append('<div id="block'+count1+'" class="el c0 d1 "> <div id="inner'+count1+'" ></div></div>');
                console.log(count1);

                count1++;
              }
              $('.wrap').append('</div>');

             count2++; 
            }


            createDirt(m*n);


            }


            
    });


statarr=[];
perarr=[];
    function Startcleaning(i){
      if(!statarr.includes(i)){
        statarr.push(i);
        console.log("arr"+i);

      }

    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    function addCsls(i){
      var k="#inner";
      var clsr=k.concat(i.toString());
      $(clsr).append('<img src="sources/paint.png" style="width:70%;height:70%;" />');
      console.log("apply dirt"+i);
      Startcleaning(i);

    }

    function Scanning(i,k){
      l=i-1;
      Descan(l,k);
      if(i!=k){
      $('#cmd').append('<p class="line1"> Vaccum cleaner scanning ->['+i+'<sup>th</sup>] grid..<b></b></p>');
      var h="#block";
      var clsr=h.concat(i.toString());
      $(clsr).empty();
      $(clsr).append('<img src="sources/vacuum.png" style="width:70%;height:70%;" />');

      }else{



          var total=0;
          for(var j in perarr) { total += perarr[j]; }
                    var score=total/k;
          if(statarr.includes(i)){
            
            $('#cmd').append('<p class="line3"> Dirt found..<span class="fa fa-exclamation-triangle"></span>->CLEANING ['+i+'<sup>th</sup>] grid..<b></b></p>');
            $('#cmd').append('<p class="line4"><img src="sources/ai_image.png" style="width:10%;height:10%;" /> AVERAGE PERFORMANCE->['+score+'] <b></b></p>');
  
        var h="#block";
        var clsr=h.concat(i.toString());
        $(clsr).empty();
        $(clsr).append('<img src="sources/checked.png" style="width:70%;height:70%;" />');
        console.log("scanning");
          }
          else{ 
            
            $('#cmd').append('<p class="line2"> Tile is already clean-> moving forward..END OF TILES<span class="fa fa-thumbs-up"></span></p>');
            $('#cmd').append('<p class="line4"><img src="sources/ai_image.png" style="width:10%;height:10%;" /> AVERAGE PERFORMANCE->['+score*100+'%] <b></b></p>');
          
          var h="#block";
      var clsr=h.concat(i.toString());
      $(clsr).empty();
      $(clsr).append('<img src="sources/vacuum.png" style="width:70%;height:70%;" />');

          }


      }

    }

    function Descan(i,k){

      if(l!=0){

        if(statarr.includes(i)){
          var score=(statarr.indexOf(i)+1)/k;
          perarr.push(score);
          $('#cmd').append('<p class="line3"> Dirt found..<span class="fa fa-exclamation-triangle"></span>->CLEANING ['+i+'<sup>th</sup>] grid..<b></b></p>');
          $('#cmd').append('<p class="line3"><img src="sources/ai_image.png" style="width:10%;height:10%;" />PERFORMANCE->['+score+'] <b></b></p>');

      var k="#block";
      var clsr=k.concat(i.toString());
      $(clsr).empty();
      $(clsr).append('<img src="sources/checked.png" style="width:70%;height:70%;" />');
      console.log("scanning");
        }
        else{ 
          
          $('#cmd').append('<p class="line2"> Tile is already clean-> moving forward..<span class="fa fa-thumbs-up"></span></p>');
      var k="#block";
      var clsr=k.concat(i.toString());
      $(clsr).empty();
      console.log("scanning");
        }

      }

    }

    function letsClean(i){
     console.log('clean');

    }




    function createDirt(k){
      $('#cmd').append('<p class="line3"><img src="sources/ai_image.png" style="width:10%;height:10%;" />Placing dirt randomly on the Grids....<b></b></p>');
      console.log(k);
      for(let i=1;i<=k;i++){
        if(getRandomInt(4987)%2==0){
        
          addCsls(i);
        }

      }

      VaccumeScan(k);


    }


    function VaccumeScan(k){

      for(let i=1;i<=k;i++){


        setTimeout(function timer() {
          Scanning(i,k);

          
        
        }, i * 1000);



       

      }

    }
    
    function init(){
      $('.el').empty().off('click').click(boardClick).removeClass('win').addClass('free');
      $('.el-o').empty().removeClass('win tie');
      active = 'x';
      board = new Array(9);
      enabled = true;
      human = true;
      moves = 0;
      $('.screen').fadeIn();
      $('.select').fadeIn();
      $('.console').fadeOut();
    }
  
    $('.console').click(init).click();
  });



  