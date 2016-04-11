$(function() {
  var twrEngine = [0 , 1];
  var twrShip = 1;
  $( "body" ).on("click", ".addTwr", function(){
      if(!$("#twr1").is(":visible")){
          $("#twr1").toggle();
          return;
      }
      twrShip++;
      twrEngine[twrShip] = 1;
      var newTwr = $("#twr1").clone();
      newTwr.attr('id', 'twr' + twrShip);
      newTwr.attr('class', 'ui-widget-content twr');
      newTwr.find('#twr-div1').attr('id', 'twr-div' + twrShip);
      newTwr.find('#gravity1').attr('id', 'gravity' + twrShip).val(0);
      newTwr.find('#twr-engine1-1').attr('id', 'twr-engine' + twrShip + '-1');
      
      newTwr.find('.mass1').attr('class', 'mass' + twrShip).val(0);    
      newTwr.find('.force1').attr('class', 'force' + twrShip).val(0);
      newTwr.find('#twr-calc1').attr('id', 'twr-calc' + twrShip);
      newTwr.find('#twr-result1').attr('id', 'twr-result' + twrShip).attr('class', 'twrResult' + twrShip).html(0);
      newTwr.find('#twr-addEngine1').attr('id', 'twr-addEngine' + twrShip);
            
      $( "body" ).off("click", ".twr-addEngine");      
      $( "body" ).on("click", ".twr-addEngine", twrAddEngine);
      $("body").on("click", ".twr-calculate", calc);
      
      var engines = twrEngine[1];
      newTwr.draggable(); 
      for(var i = 2; i <= engines; i++){
          newTwr.find('#twr-engine1-' + i).remove();
      }
      newTwr.height(180);
      $( "body" ).append(newTwr);
  });
  var calc = function(){
      
      var ship = this.id.split('calc')[1];
      var result = $( "#twr-result" + ship ).empty();
      var g = parseFloat($("#gravity"+ ship).val());
      
      var m = 0;
      $(".mass" + ship).each(function(){
          m += parseFloat($(this).val());
      });
      
      var f = 0;
      $(".force" + ship).each(function(){
          f += parseFloat($(this).val());
      });
      
      var twr = f/(m*g);
      result.html(twr);
    };
    $( ".twr-calculate" ).click(calc);
    var twrAddEngine = function(){
          var ship = this.id.split('Engine')[1];
          twrEngine[ship]++;
          var index = ship + '-' + twrEngine[ship];
          var result = $( "#twr-div" + ship );
          var newEngine = $("#twr-engine1-1").clone();
          newEngine.attr('id', 'twr-engine' + index);
          newEngine.find('h3').html('Engine ' + twrEngine[ship]);
          $( "#twr" + ship ).find('#twr-div' + ship).append(newEngine);
          $("#twr-calc" + index).click();
          $("#twr" + ship).height(function (ship, height) {
            return (height + 60.5 );
          });
    };
    $( "body" ).on("click", ".twr-addEngine", twrAddEngine);
  });
  $(function() {
     $( "#twr1" ).draggable(); 
  });