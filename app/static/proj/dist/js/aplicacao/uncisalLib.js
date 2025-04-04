  $(".removerItem").click( function(event){
		var updateElement = $(this).attr('updateElement');
		alert('aaaaaaaa');
		$.ajax(
			    {		   //pais/removerUnidadeFederativa/1
			        url: $(this).attr('urlDestino'),
			        type: "GET",
			        success:function(data, textStatus, jqXHR) 
			        {
				       //data: return data from server
						$('#' +  updateElement ).html(data);				            
			        },
			        error: function(jqXHR, textStatus, errorThrown) 
			        {
			            //if fails      
			        }
			    });
  		});
  
  $('.adicionarItem').click(function(){
	    var updateElement = $(this).attr('updateElement');
		var myForm = $(this).closest('form').attr('id');
		var postData = $('#'+myForm).serializeArray();
		var formURL = $('#'+myForm).attr("action");
	    
	    $.ajax(
	    {
	        url : formURL,
	        type: "POST",
	        data : postData,
	        success:function(data, textStatus, jqXHR) 
	        {
	            //data: return data from server
				$('#'+ updateElement).html(data);	
	        },
	        error: function(jqXHR, textStatus, errorThrown) 
	        {
	            //if fails      
	            alert('erro');
	        }
	    });
	});
		
function submeterForm( formulario ){
	formulario.submit();
}

function resetarForm( formulario ){
	formulario.each(function(){
		  this.reset();
	});
}