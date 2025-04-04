const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const resultDisplay = document.getElementById('resultDiv');

// Função para acessar a câmera
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
        video.srcObject = stream;
        video.setAttribute('playsinline', true); // necessário para iOS
        video.play();
        requestAnimationFrame(scanQRCode);
    })
    .catch(err => console.error('Erro ao acessar a câmera: ', err));
	
	
	    // Função para enviar os dados do QR Code via AJAX
	    //function processarFrequenciaLeitorQrCode {
		function sendQRCodeData(data){
			try{
				console.log(data);
				console.log(parseInt(data, 16));
				var valorBigInt =  parseInt(data, 16) ;
				console.log(valorBigInt);
				console.log( valorBigInt / 10000);
				var valorBigIntStr = (valorBigInt/10000).toString();
				console.log(valorBigIntStr);
				$.ajax({
		            url: '/avulso-inscricao/processarFrequenciaLeitorQrCode', // Endpoint para onde os dados serão enviados
		            method: 'POST',
		            data: { avulsoInscricao: valorBigIntStr,
					 },
		            success: function (response) {
		                // Mostra o resultado na div
		                $('#result').html(response);
		                // resultDiv.text('Resultado: ' + response);
		            },
		            error: function (xhr, status, error) {
						$('#result').html('Erro ao enviar o QR Code: ' + error);
		       //         resultDiv.text('Erro ao enviar o QR Code: ' + error);
		            }
		        });
		    } catch (error) {
			    // Código para tratar a exceção
			    console.error("Ocorreu um erro:", error.message);
			}  
	    }	
var code_aux = '';
function scanQRCode() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
			if ( code.data != code_aux){
		            //resultDisplay.textContent = 'QR Code detectado: ${code.data} em Processamento';
					$('#result').html('QR Code detectado: ' + code.data + ' em Processamento ' );
					sendQRCodeData(code.data);
					code_aux = code.data;
		 	}
        }
    }
    requestAnimationFrame(scanQRCode);
}
