const Vestibular = (server)	=> {
	return {
		getDadosCandidato(candidatoCpf, vestibularId){
			return new Promise((resolv, reject)	=> {
				// @TODO - Efetuar a validação de CPF
				if(candidatoCpf && isFinite(vestibularId)){
					$.ajax({
						url: `/vestibular/candidato/${candidatoCpf}/${vestibularId}`,
						type: 'get',
						dataType: 'json',
						complete: (xhr, status) => {
							resolv(xhr.responseText);
						}
					});
				}
				else{
					reject("Favor verificar o cpf e/ou vestibular informado");
				}
			});
		},
		capturarFoto(){
			try{
				Webcam.snap( function(data_uri) {
							const base64Image = data_uri;
							
							document.getElementById('image_preview').innerHTML = '<img src="'+base64Image+'"/>';
							$("#foto_matriculado").val(base64Image);
						} );
			}
			catch(err){
				console.log(err);
			}
			
			return false;
		}
	}
}