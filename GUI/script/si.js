$(function() {
  var siEngine = [0 , 1];
  var siShip = 1;
  $( "body" ).on("click", ".addSi", function(){
      if(!$("#si1").is(":visible")){
          $("#si1").toggle();
          return;
      }
      siShip++;
      siEngine[siShip] = 1;
      var newSi = $("#si1").clone();
      newSi.attr('id', 'si' + siShip);
      newSi.find('#si-div1').attr('id', 'si-div' + siShip);
      newSi.find('#si-engine1-1').attr('id', 'si-engine' + siShip + '-1').attr('class', 'si-engine' + siShip);
      
      newSi.find('.siForce1').attr('class', 'siForce' + siShip).val(0);
      newSi.find('.siImpulse1').attr('class', 'siImpulse' + siShip).val(0);    
      newSi.find('#si-calc1').attr('id', 'si-calc' + siShip);
      newSi.find('#si-result1').attr('id', 'si-result' + siShip).attr('class', 'siResult' + siShip).html(0);
      newSi.find('#si-addEngine1').attr('id', 'si-addEngine' + siShip);
            
      $( "body" ).off("click", ".si-addEngine");      
      $( "body" ).on("click", ".si-addEngine", siAddEngine);
      $("body").on("click", ".si-calculate", calc);
      
      var engines = siEngine[1];
      newSi.draggable(); 
      for(var i = 2; i <= engines; i++){
          newSi.find('#si-engine1-' + i).remove();
      }
      newSi.height(180);
      $( "body" ).append(newSi);
  });
  var calc = function(){
      
      var ship = this.id.split('calc')[1];
      var result = $( "#si-result" + ship ).empty();
      var i = 0;
      var f = 0;
      $(".si-engine" + ship).each(function(){
          var force = parseFloat($(this).find('.siForce' + ship).val());
          f += force;
          i += force/parseFloat($(this).find('.siImpulse' + ship).val());
      });
      
      var si = f/i;
      result.html(si);
    };
    $( ".si-calculate" ).click(calc);
    var siAddEngine = function(){
          var ship = this.id.split('Engine')[1];
          siEngine[ship]++;
          var index = ship + '-' + siEngine[ship];
          var result = $( "#si-div" + ship );
          var newEngine = $("#si-engine1-1").clone();
          newEngine.attr('id', 'si-engine' + index).attr('class', 'si-engine' + ship);
          newEngine.find('h3').html('Engine ' + siEngine[ship]);
          $( "#si" + ship ).find('#si-div' + ship).append(newEngine);
          $("#si-calc" + index).click();
          $("#si" + ship).height(function (ship, height) {
            return (height + 58.5 );
          });
    };
    $( "body" ).on("click", ".si-addEngine", siAddEngine);
  });
  $(function() {
     $( "#si1" ).draggable(); 
  });