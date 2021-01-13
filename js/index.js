
jQuery(document).ready(function($){
	var counter = 0;
	console.log(counter);
	$('#skuform').submit(function(e){
		e.preventDefault();
		counter++;

		if(counter > 1){
			$('#testing').empty();
		}
		$(".signupForm").show(300);
		var skuinput = $('#sku').val();
		var d = new Date();
		var mm = d.getMonth()+1;
		var dd = d.getDate();
		var yy = d.getFullYear();
		var currentdate = yy + "-" + mm + '-' + dd

		
		console.log(franz2);
			var test = $.ajax({
				xhrFields: { withCredentials: true},
				url: 'http://192.138.138.50:5984/pos_transaction/_design/view_sku/_view/ViewSkuWithDesc?key=["'+skuinput+'","'+currentdate+'"]&reduce=false',
				headers:{ 
					'Authorization' : 'Basic ' + btoa('admin:admin')
				},
				type: 'GET',
				dataType: 'JSON',
				success: function(response){
					console.log(response);
					if(response.rows.length == 0){
						var petsa = new Date();
						var oras = petsa.getHours();
						var minuto = petsa.getMinutes();
						console.log(petsa.toLocaleTimeString());
						$('#noitem').show();
						$('table').hide();
						alert('No recorded sales as of ' + petsa.toLocaleTimeString());
						// location.reload();
						$('#activity_pane').hideLoading();
					}else{
					document.getElementById('descriptioncenter').textContent =  "Desription: " + response.rows[0].value.shortDesc;
					$('#skucenter').html("<b>SKU:</b> " + response.rows[0].key[0]);
					$('#datecenter').html("<b>Sales Date :</b> " + response.rows[0].key[1]);
					$('#price').html("<b>Price: </b>" + response.rows[0].value.currentPrice);
					for(x in response.rows){
						$('#testing').append("<tr>");
						$('#testing').append("<td>" + response.rows[x].id + "</td>");
						$('#testing').append("<td>" + response.rows[x].value.quantity + "</td>");
						$('#testing').append("<td>" + response.rows[x].value.priceSubtotal + "</td>");
						$('#testing').append("</tr>");
					}
					$('#activity_pane').hideLoading();
					}
			}
			});
	
			var test2 = $.ajax({
				xhrFields: { withCredentials: true},
				url: 'http://192.138.138.50:5984/pos_transaction/_design/view_sku/_view/ViewSku?key=["'+skuinput+'","'+currentdate+'"]',
				headers:{ 
					'Authorization' : 'Basic ' + btoa('admin:admin')
				},
				type: 'GET',
				dataType: 'JSON',
				beforeSend: function(data) {
					$('#activity_pane').showLoading();
				},
				success: function(response){
					  $('#totalcenter').html("<b>Total Quantity:</b> " + response.rows[0].value);		  
			}
			});	
			$(".policy").css("visibility","visible");
		// });




	})


	
});