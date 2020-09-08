// JavaScript Document
var pics = new Array();
for(i=0;i<=8;i++)
{
	pics[i]=new Image();
	pics[i].src='image'+i+'.gif';
}
var j = 1;
var map = new Array;
for (i = 0; i<= 15; i++)
{
	map[i++] = j;
	map[i] = j;
	j++;
}
var user = new Array();
var temparray=new Array();
var clickarray=new Array(0,0);
var ticker, sec, min, ctr, id=0, oktoclick, finished;
function init() 
{
	clearTimeout(id); //Ngăn hàm được thiết lập với setTimeout () để thực thi
	for(i=0;i<=15;i++)
		user[i]=0;
		ticker=0; 
		min=0;
		sec=0;
		ctr=0;
		finished=0;
		oktoclick=true;
		document.forms["f"].b.value="Đang tải hình ảnh";
		scramble();
		id=setInterval('runclk()', 2000); //setInterval: thực hiệ hàm trong khoảng thời gian nhất định
		for(i=0;i<=15;i++)
		{
			document.images[('img'+i)].src="image0.gif";
			document.images[('img'+i)].alt="";
		}
}
function runclk()
{
	min=Math.floor(ticker/60);
	sec=(ticker-(min*60))+'';
	if(sec.length==1)
	{
		sec="0"+sec;
	}
	ticker++;
	document.forms["f"].b.value="    "+min+":"+sec+"    ";
}
function scramble() // hoan doi vi tri anh 
{
	for(z=0;z < 5;z++){
		for(x=0;x<=15;x++){
			temparray[0]=Math.floor(Math.random()*16);
			temparray[1]=map[temparray[0]];
			temparray[2]=map[x];
			map[x]=temparray[1];
			map[temparray[0]]=temparray[2];
		}
	}
}

function showimage(but) // chọn đc 2 ảnh
{
	if(oktoclick == true)
	{
		oktoclick=false; 
		document.images[('img'+but)].src='image'+map[but]+'.gif';
		document.images[('img'+but)].alt='Image '+map[but];
		if(ctr==0)
		{
			ctr++;
			clickarray[0]=but;
			oktoclick=true;
		}
		else
		{
			clickarray[1]=but;
			ctr=0;
			setTimeout('returntoold()', 600); // hiển thị hộp thoại returntoold sau 600 mili giây
		}
	}
}

function returntoold() //xử lý xự kiện
{
	if((clickarray[0]==clickarray[1])&&(!user[clickarray[0]]))
	{
		document.images[('img'+clickarray[0])].src="image0.gif";
		document.images[('img'+clickarray[0])].alt="";
		oktoclick=true;
	}
	else
	{
		if(map[clickarray[0]]!=map[clickarray[1]])
		{
			if(user[clickarray[0]]==0)
			{
				document.images[('img'+clickarray[0])].src="image0.gif";
				document.images[('img'+clickarray[0])].alt="";
			}
			if(user[clickarray[1]]==0)
			{
				document.images[('img'+clickarray[1])].src="image0.gif";
				document.images[('img'+clickarray[1])].alt="";
			}
		}
		if(map[clickarray[0]]==map[clickarray[1]])
		{
			if(user[clickarray[0]]==0&&user[clickarray[1]]==0){
				finished++;
			}
			//làm trắng màn hình
			document.images[('img'+clickarray[1])].src="image9.png";
			document.images[('img'+clickarray[1])].alt="";
			document.images[('img'+clickarray[0])].src="image9.png";
			document.images[('img'+clickarray[0])].alt="";
			user[clickarray[0]]=1;
			user[clickarray[1]]=1;
		}
		if(finished >= 8)
		{
			setTimeout(alert('You did it in '+document.forms["f"].b.value+' !'), 10000);
			init();
		}
		else
		{
			oktoclick=true;
		}
	}
}
var t='<table cellpadding="0" cellspacing="0" border="0">';
for(r=0;r<=3;r++)
{
	t+='<tr>';
	for(c=0;c<=3;c++)
		t+='<td align="center"><a href="javascript:showimage('+((4*r)+c)+')" onClick="this.blur()"><img src="image0.gif" name="img'+((4*r)+c)+'" alt="" border="0"></a></td>';
			t+='</tr>';
		}
		t+='</table><br><br><form name="f"><input type="button" value="Downloading images...." name="b" onClick="init()"></form>';
		document.write(t);

		window.onload=init;