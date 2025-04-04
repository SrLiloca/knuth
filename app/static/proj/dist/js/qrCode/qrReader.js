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
				data = data.split('z');
				var divisor = data[0][0];
				console.log(divisor);
				// Pegando os caracteres restantes
				var hash = data[0].substring(1);
				var valorBigInt = BigInt( parseInt(hash, 16) );
				console.log(valorBigInt);
				var valorBigIntStr = valorBigInt.toString();
				console.log(valorBigIntStr);
				var input = ( BigInt( parseInt(valorBigIntStr) ) / BigInt(parseInt(divisor) ) ).toString();
				var dataHoraString = input.substring(1, 11);
				console.log(dataHoraString)
				dataHoraString = dataHoraString.replace(
				    /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
				    '$1-$2 $3:$4:$5'
				);
				var inscricaoId = input.substring(11);
				console.log(data[1]);
				var atividadeIdOuvinte = parseInt( data[1], 16 );
				const date = new Date();
				const anoAtual = date.getFullYear();
				dataHoraString = anoAtual + "-" + dataHoraString;
				console.log(dataHoraString);
				console.log(inscricaoId);
				console.log(atividadeIdOuvinte);
				console.log(atividadeId);
				
				$.ajax({
		            url: '/evento/14-cacun/' + atividadeId + '/processarFrequenciaLeitorQrCode', // Endpoint para onde os dados serão enviados
		            method: 'POST',
		            data: { dataHoraGerada: dataHoraString,
						    inscricaoId : inscricaoId,
						    atividadeIdOuvinte: atividadeIdOuvinte,
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
