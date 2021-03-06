var rule = "1"
var numlist1 = [];
var numlist2 = [];
var numlist3 = [];
var titlelist1 = [];
var titlelist2 = [];
var titlelist3 = [];
var maxlevel1 = 8;
var maxlevel2 = 11;
var maxlevel3 = 3;
url1 = "mission1.csv";
url2 = "mission2.csv";
url3 = "mission3.csv";
var missionlist1, missionlist2, missionlist3;
getCSV();
var checkedlist = [];
var highcheckedlist = [];
makeCheckList(rule);
var size = 5;
var bingo = [[" ","1","2","3","4","5","6","7","8","9","10"],
				 ["A"," "," "," "," "," "," "," "," "," "," "],
		  		 ["B"," "," "," "," "," "," "," "," "," "," "],
				 ["C"," "," "," "," "," "," "," "," "," "," "],
				 ["D"," "," "," "," "," "," "," "," "," "," "],
				 ["E"," "," "," "," "," "," "," "," "," "," "],
				 ["F"," "," "," "," "," "," "," "," "," "," "],
				 ["G"," "," "," "," "," "," "," "," "," "," "],
				 ["H"," "," "," "," "," "," "," "," "," "," "],
				 ["I"," "," "," "," "," "," "," "," "," "," "],
				 ["J"," "," "," "," "," "," "," "," "," "," "]];
var colors = [[0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0]];
var rednum = 0;
var bluenum = 0;
var table = document.createElement('table');
table.border = "1px";
table.style = "border-collapse: collapse; font-size: 15px";
makeTable();

function getCSV(url){
  var txt = new XMLHttpRequest();
  txt.open('get', url1, false);
  txt.send();
  var arr = txt.responseText.split('\n');
  for (var i=0;i<arr.length;)
  {
	  str = arr[i];
	  if(str.charAt(0)=="#")
	  {
		  numlist1.push(i);
		  titlelist1.push(arr[i]);
		  arr.splice(i,1);
	  }else{
		  i++;
	  }
  }
  numlist1.push(arr.length-1);
  var res = [];
  for(var i = 0; i < arr.length; i++){
    if(arr[i] == '') break;
    res[i] = arr[i].split(',');
  }
  missionlist1 = res;
  
  var txt = new XMLHttpRequest();
  txt.open('get', url2, false);
  txt.send();
  var arr = txt.responseText.split('\n');
  for (var i=0;i<arr.length;)
  {
	  str = arr[i];
	  if(str.charAt(0)=="#")
	  {
		  numlist2.push(i);
		  titlelist2.push(arr[i]);
		  arr.splice(i,1);
	  }else{
		  i++;
	  }
  }
  numlist2.push(arr.length-1);
  var res = [];
  for(var i = 0; i < arr.length; i++){
    if(arr[i] == '') break;
    res[i] = arr[i].split(',');
  }
  missionlist2 = res;
	
  var txt = new XMLHttpRequest();
  txt.open('get', url3, false);
  txt.send();
  var arr = txt.responseText.split('\n');
  for (var i=0;i<arr.length;)
  {
	  str = arr[i];
	  if(str.charAt(0)=="#")
	  {
		  numlist3.push(i);
		  titlelist3.push(arr[i]);
		  arr.splice(i,1);
	  }else{
		  i++;
	  }
  }
  numlist3.push(arr.length-1);
  var res = [];
  for(var i = 0; i < arr.length; i++){
    if(arr[i] == '') break;
    res[i] = arr[i].split(',');
  }
  missionlist3 = res;
}

function makeTable()
{
	for(var i=0;table.rows.length>0;i++)
	{
		table.deleteRow(-1);
	}
	for (var i=0;i<size+1;i++) {
		var tr = document.createElement('tr');
	  	tr.height = "100px";
	  	for (var j = 0; j < size+1; j++) {
			var td = document.createElement('td');
		  	td.textContent = bingo[i][j];
		  	if(i==0){td.height = "30px";}else{td.height = "80px";}
		  	if(j==0){td.width = "30px";}else{td.width = "150px";}
		  	td.align = "center";
			td.id = "td" + i + j;
			if(i!=0&&j!=0){td.onclick = function(){clickTable(this)}}
		  	tr.appendChild(td);
	  }
	  table.appendChild(tr);
	}
	// 生成したtable要素を追加する
	maintable = document.getElementById('maintable');
	maintable.appendChild(table);
}

function makeCheckList()
{
	str = "";
	if(rule=="1")
	{
		str += "現在のリスト：レースファイル用<br>";
		for(var lv=1;lv<=maxlevel1;lv++)
		{
			str += "<br><b>" + titlelist1[lv-1].slice(2) + "</b><br><input type='button' value='すべてチェック' onclick='checkAll(" + lv + ",true);'/> <input type='button' value='すべて解除' onclick='checkAll(" + lv + ",false);'/><br>";
			for(var i=numlist1[lv-1];i<numlist1[lv];i++)
			{
				if(lv<=3)
				{
					str += "<label><input type='checkbox' id='checkbox" + i + "' checked/>" + missionlist1[i][0] + "</label><br>";
				} else {
					str += "<label><input type='checkbox' id='checkbox" + i + "'/>" + missionlist1[i][0] + "</label><br>";
				}
			}
		}
	} else if(rule=="2") {
		str += "現在のリスト：クリア済みファイル用<br>"
		for(var lv=1;lv<=maxlevel2;lv++)
		{
			str += "<br><b>" + titlelist2[lv-1].slice(2) + "</b><br><input type='button' value='すべてチェック' onclick='checkAll(" + lv + ",true);'/> <input type='button' value='すべて解除' onclick='checkAll(" + lv + ",false);'/><br>";
			for(var i=numlist2[lv-1];i<numlist2[lv];i++)
			{
				if(lv<=9)
				{
					str += "<label><input type='checkbox' id='checkbox" + i + "' checked/>" + missionlist2[i][0] + "</label><br>";
				} else {
					str += "<label><input type='checkbox' id='checkbox" + i + "'/>" + missionlist2[i][0] + "</label><br>";
				}
			}
		}
	} else {
		str += "現在のリスト：クリア済みファイル用(S人生オセロ)<br>"
		for(var lv=1;lv<=maxlevel3;lv++)
		{
			str += "<br><b>" + titlelist3[lv-1].slice(2) + "</b><br><input type='button' value='すべてチェック' onclick='checkAll(" + lv + ",true);'/> <input type='button' value='すべて解除' onclick='checkAll(" + lv + ",false);'/><br>";
			for(var i=numlist3[lv-1];i<numlist3[lv];i++)
			{
				if(lv<=3)
				{
					str += "<label><input type='checkbox' id='checkbox" + i + "' checked/>" + missionlist3[i][0] + "</label><br>";
				} else {
					str += "<label><input type='checkbox' id='checkbox" + i + "'/>" + missionlist3[i][0] + "</label><br>";
				}
			}
		}
	}
	document.getElementById('checklist').innerHTML = str;
}

function checkAll(lv,tf)
{
	if(rule=="1")
	{
		for(var i=numlist1[lv-1];i<numlist1[lv];i++)
		{
			document.getElementById("checkbox" + i).checked = tf;
		}
	} else if(rule=="2") {
		for(var i=numlist2[lv-1];i<numlist2[lv];i++)
		{
			document.getElementById("checkbox" + i).checked = tf;
		}
	} else {
		for(var i=numlist3[lv-1];i<numlist3[lv];i++)
		{
			document.getElementById("checkbox" + i).checked = tf;
		}
	}
}

function chgSize(dif)
{
	if(size+dif>=3 && size+dif<=10)
	{
		size += dif;
		document.getElementById('sizetext').innerHTML = "<font size='5'>" + size + "x" + size + "</font>";
	}
}

function makeBingo()
{
	var ccount = 0;
	checkedlist = [];
	highchekedlist = [];
	if(rule=="1")
	{
		for(i=0;i<numlist1[maxlevel1];i++)
		{
			box = document.getElementById("checkbox" + i);
			if(box.checked == true)
			{
				checkedlist.push(missionlist1[i][0]);
				ccount++;
			}
		}
	} else if(rule=="2") {
		for(i=0;i<numlist2[maxlevel2];i++)
		{
			box = document.getElementById("checkbox" + i);
			if(box.checked == true)
			{
				checkedlist.push(missionlist2[i][0]);
				ccount++;
			}
		}
	} else {
		for(i=0;i<numlist3[maxlevel3];i++)
		{
			if(i<numlist3[maxlevel3-1])
			{
				box = document.getElementById("checkbox" + i);
				if(box.checked == true)
				{
					checkedlist.push(missionlist3[i][0]);
					ccount++;
				}
			} else {
				box = document.getElementById("checkbox" + i);
				if(box.checked == true)
				{
					highcheckedlist.push(missionlist3[i][0]);
					ccount++;
				}
			}
		}
	}
	var r = 0;
	for(i=1;i<=size;i++)
	{
		for(j=1;j<=size;j++)
		{
			if(rule!="3"||(i>1&&i<size)||(j>1&&j<size))
			{
				r = Math.floor(Math.random()*checkedlist.length);
				bingo[i][j] = checkedlist[r];
				checkedlist.splice(r,1);
			} else {
				r = Math.floor(Math.random()*highcheckedlist.length);
				bingo[i][j] = highcheckedlist[r];
				highcheckedlist.splice(r,1);
			}
			
		}
	}
	colors = [[0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0,0,0]];
	makeTable();
	rednum = 0;
	bluenum = 0;
	document.getElementById('rednum').innerHTML = "" + rednum;
	document.getElementById('bluenum').innerHTML = "" + bluenum;
}

function clickTable(obj,i,j)
{
	row = obj.id.charAt(2);
	col = obj.id.charAt(3);
	if(colors[row][col]==0)
	{
		obj.style.background = "#ffcccc";
		colors[row][col] = 1;
		rednum += 1;
	} else if(colors[row][col]==1) {
		obj.style.background = "#ccccff";
		colors[row][col] = 2;
		rednum -= 1;
		bluenum += 1;
	} else if(colors[row][col]==2) {
		obj.style.background = "#ffffff";
		colors[row][col] = 0;
		bluenum -= 1;
	}
	document.getElementById('rednum').innerHTML = "" + rednum;
	document.getElementById('bluenum').innerHTML = "" + bluenum;
}

function changeList()
{
	if(rule=="1")
	{
		rule = "2";
	} else if(rule=="2"){
		rule = "3";
	} else {
		rule = "1";
	}
	makeCheckList();
}