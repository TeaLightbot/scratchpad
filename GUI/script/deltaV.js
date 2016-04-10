$(function() {
  var dvStage = [0 , 1];
  var dvShip = 1;
  $( "body" ).on("click", ".addDv", function(){
      if(!$("#deltaV1").is(":visible")){
          $("#deltaV1").toggle();
          return;
      }
      dvShip++;
      dvStage[dvShip] = 1;
      var newDv = $("#deltaV1").clone();
      newDv.attr('id', 'deltaV' + dvShip);
      newDv.find('#dv-div1').attr('id', 'dv-div' + dvShip);
      newDv.find('#dv-stage1-1').attr('id', 'dv-stage' + dvShip + '-1');
      
      newDv.find('#mass-start1-1').attr('id', 'mass-start' + dvShip + '-1').val(0);    
      newDv.find('#mass-end1-1').attr('id', 'mass-end' + dvShip + '-1').val(0);
      newDv.find('#si-input1-1').attr('id', 'si-input' + dvShip + '-1').val(0);
      newDv.find('#gravity1-1').attr('id', 'gravity' + dvShip + '-1').val(0);
      newDv.find('#dv-calc1-1').attr('id', 'dv-calc' + dvShip + '-1');
      newDv.find('#dv-result1-1').attr('id', 'dv-result' + dvShip + '-1').attr('class', 'dvResult' + dvShip).html(0);
      newDv.find('#totalDv1').attr('id', 'totalDv' + dvShip).html('Total Delta V: 0 <input class="dv-addStage" id="dv-addStage' + dvShip + '" type="button" value="Add stage">');
      newDv.find('#dv-addStage1').attr('id', 'dv-addStage' + dvShip);
            
      $( "body" ).off("click", ".dv-addStage");      
      $( "body" ).on("click", ".dv-addStage", dvAddStage);
      $("body").on("click", ".dv-calculate", calc);
      
      var stages = dvStage[1];
      newDv.draggable(); 
      for(var i = 2; i <= stages; i++){
          newDv.find('#dv-stage1-' + i).remove();
      }
      newDv.height(180);
      $( "body" ).append(newDv);
  });
  var calc = function(){
      var index = this.id.split('calc')[1];
      var ship = index.split('-')[0];
      var result = $( "#dv-result" + index ).empty();
      var ms = parseFloat($("#mass-start"+ index).val());
      var me = parseFloat($("#mass-end"+ index).val());
      var si = parseFloat($("#si-input"+ index).val());
      var g = parseFloat($("#gravity"+ index).val());
      var dv = (Math.log(ms/me) * si * g);
      result.append(dv);
          
      var total = 0;
      $(".dvResult" + ship).each(function(){
          total += parseFloat($(this).html());
      });
      $( "#totalDv" + ship).html("Total Delta V: " + total + '<input class="dv-addStage" id="dv-addStage' + ship + '" type="button" value="Add stage">');
    };
    $( ".dv-calculate" ).click(calc);
    var dvAddStage = function(){
          var ship = this.id.split('Stage')[1];
          dvStage[ship]++;
          var index = ship + '-' + dvStage[ship];
          var prevIndex = ship + '-' + (dvStage[ship] - 1);
          var result = $( "#dv-div" + ship );
          var newStage = $("#dv-stage1-1").clone();
          newStage.attr('id', 'dv-stage' + index);
          newStage.find('h3').html('Stage ' + dvStage[ship]);
          var me = $('#mass-end' + prevIndex);
          var si = $('#si-input' + prevIndex);
          var g = $('#gravity' + prevIndex);
          
          newStage.find('#mass-start1-1').attr('id', 'mass-start' + index).val(me.val());
          newStage.find('#mass-end1-1').attr('id', 'mass-end' + index).val(me.val());
          newStage.find('#si-input1-1').attr('id', 'si-input' + index).val(si.val());
          newStage.find('#gravity1-1').attr('id', 'gravity' + index).val(g.val());
          newStage.find('#dv-calc1-1').attr('id', 'dv-calc' + index);
          newStage.find('#dv-result1-1').attr('id', 'dv-result' + index).attr('class', 'dvResult' + ship);
          $("body").on("click", ".dv-calculate", calc)
          $( "#deltaV" + ship ).find('#dv-div' + ship).append(newStage);
          $("#dv-calc" + index).click();
          $("#deltaV" + ship).height(function (ship, height) {
            return (height + 88.5 );
          });
    };
    $( "body" ).on("click", ".dv-addStage", dvAddStage);
  });
  $(function() {
     $( "#deltaV1" ).draggable(); 
  });