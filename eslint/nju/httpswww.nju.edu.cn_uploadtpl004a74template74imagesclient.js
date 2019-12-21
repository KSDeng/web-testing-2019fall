function goBack()
{   
	if(history.length < 1){
		window.close();
	}else{
		history.back();
	}
}  

function Trim(strInput)
{
	return strInput.replace(/^[\s¡¡]+/, "").replace(/[\s¡¡]+$/, "");
}