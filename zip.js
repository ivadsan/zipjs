let $startBtn = document.getElementById("startBtn")
let $outputBits = document.getElementById("outputBits")
let $bits = document.getElementById("bits")
let $bytes = document.getElementById("bytes")
let $kilobytes = document.getElementById("kilobytes")
let $outputCompress = document.getElementById("outputCompress")
let $outputKey = document.getElementById("outputKey")
let $newBits = document.getElementById("newbits")
let $newBytes = document.getElementById("newbytes")
let $newKiloBytes = document.getElementById("newkilobytes")
let $compress = document.getElementById("compress")
const $size = 8;

$startBtn.addEventListener("click", function(){

	let $txtInput = document.getElementById("txtInput").value;
	let $txtInArray = textToArray($txtInput);
	let $charMap = setCharMap($txtInArray)
	let $textInBinary = textToBinary($txtInArray)	
	$outputBits.value = $textInBinary
	$bits.value = $textInBinary.length
	$bytes.value = (($textInBinary.length)/8)
	$kilobytes.value = ((($textInBinary.length)/8)/1024)
	let $compressBinary = compress($txtInArray, $charMap);
	$outputCompress.value = $compressBinary;

	$newBits.value = $compressBinary.length
	$newBytes.value = ($compressBinary.length/8)
	$newKiloBytes.value =  (($compressBinary.length/8)/1024)
	$compress.value = 100 - ($newBits.value * 100) / $bits.value

})

let textToArray = function(txt){
	return txt.split("");
}

let textToBinary = function(txtInArray){

	let output = "";
	
	txtInArray.forEach(function(data){

		let binary = data.charCodeAt(0).toString(2);
		let byte = new Array($size - binary.length + 1).join(0) + binary  
		
		output += byte;
	})

	return output;
}

let setCharMap = function(txtInArray){

	let charUnique = [];
	let count = 0;

	txtInArray.forEach(function(data, index){
	
		if(charUnique.indexOf(data) === -1){
			charUnique[count] = data
			count++;
		}
	})

	let charMap = [];

	for (var i = 0; i < charUnique.length; i++) {
		
		charMap[i] = [charUnique[i],0]

		txtInArray.forEach(function(data){
			if(data == charMap[i][0]){
				charMap[i][1]++
			}
		})
	}

	charMap.sort(function(a,b){

		if (a[1] > b[1]) {
			return 1;
		}
		if (a[1] < b[1]) {
			return -1;
		}
		// a must be equal to b
		return 0;
	})

	charMap = charMap.reverse();

	return charMap

}

let compress = function(txtInArray,charMap){
	
	$charMap = [];

	for(let i = 0; i < charMap.length; i++){
		$charMap[i] = charMap[i][0]
	}


	let output = "";

	txtInArray.forEach(function(data){

		let $count = 0;

		output += new Array($charMap.indexOf(data) + 1).join(0) + "1"
		

	})

	$outputKey.value = $charMap;

	return output
}

