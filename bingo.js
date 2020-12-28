var numlist = [];
var maxlevel = 8;
var missionlist = getCSV("mission.csv");
var checkedlist = [];
makeCheckList();
var size = 5;
var bingo = [[" ","1","2","3","4","5","6","7"],
				 ["A"," "," "," "," "," "," "," "],
		  		 ["B"," "," "," "," "," "," "," "],
				 ["C"," "," "," "," "," "," "," "],
				 ["D"," "," "," "," "," "," "," "],
				 ["E"," "," "," "," "," "," "," "],
				 ["F"," "," "," "," "," "," "," "],
				 ["G"," "," "," "," "," "," "," "]];
var colors = [[0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0]];
var table = document.createElement('table');
table.border = "1px";
table.style = "border-collapse: collapse; font-size: 10px";
var tcount = 0;
makeTable();


function getCSV(url){
  //CSVファイルを文字列で取得。
  var txt = new XMLHttpRequest();
  txt.open('get', url, false);
  txt.send();

  //改行ごとに配列化
  var arr = txt.responseText.split('\n');
  //console.log(arr)
  // レベルわけ
  for (var i=0;i<arr.length;)
  {
	  str = arr[i];
	  if(str.charAt(0)=="#")
	  {
		  numlist.push(i);
		  arr.splice(i,1);
	  }else{
		  i++;
	  }
  }
  numlist.push(arr.length-1);
  //1次元配列を2次元配列に変換
  var res = [];
  for(var i = 0; i < arr.length; i++){
    //空白行が出てきた時点で終了
    if(arr[i] == '') break;

    //","ごとに配列化
    res[i] = arr[i].split(',');

    /*for(var i2 = 0; i2 < res[i].length; i2++){
      //数字の場合は「"」を削除
      if(res[i][i2].match(/\-?\d+(.\d+)?(e[\+\-]d+)?/)){
        res[i][i2] = parseFloat(res[i][i2].replace('"', ''));
      }
    }*/
  }

  return res;
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
		  	if(i==0){td.height = "30px";}else{td.height = "100px";}
		  	if(j==0){td.width = "30px";}else{td.width = "100px";}
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
	for(var lv=1;lv<=maxlevel;lv++)
	{
		str += "<br><b>Level " + lv + "</b><br><input type='button' value='すべてチェック' onclick='checkAll(" + lv + ",true);'/> <input type='button' value='すべて解除' onclick='checkAll(" + lv + ",false);'/><br>";
		for(var i=numlist[lv-1];i<numlist[lv];i++)
		{
			str += "<label><input type='checkbox' id='checkbox" + i + "' checked/>" + missionlist[i][0] + "</label><br>";
		}
	}
	document.getElementById('checklist').innerHTML = str;
}

function checkAll(lv,tf)
{
	for(var i=numlist[lv-1];i<numlist[lv];i++)
	{
		document.getElementById("checkbox" + i).checked = tf;
	}
}

function chgSize(dif)
{
	if(size+dif>=3 && size+dif<=7)
	{
		size += dif;
		document.getElementById('sizetext').innerHTML = "<font size='5'>" + size + "x" + size + "</font>";
	}
}

function makeBingo()
{
	var ccount = 0;
	checkedlist = [];
	for(i=0;i<numlist[maxlevel];i++)
	{
		box = document.getElementById("checkbox" + i);
		if(box.checked == true)
		{
			checkedlist.push(missionlist[i][0]);
			ccount++;
		}
	}
	var r = 0;
	for(i=1;i<=size;i++)
	{
		for(j=1;j<=size;j++)
		{
			r = Math.floor(Math.random()*checkedlist.length);
			bingo[i][j] = checkedlist[r];
			checkedlist.splice(r,1);
		}
	}
	colors = [[0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0]];
	makeTable();
}

function clickTable(obj,i,j)
{
	row = obj.id.charAt(2);
	col = obj.id.charAt(3);
	console.log(colors[row][col])
	if(colors[row][col]==0)
	{
		obj.style.background = "#ffeeee";
		colors[row][col] = 1;
	} else if(colors[row][col]==1) {
		obj.style.background = "#eeeeff";
		colors[row][col] = 2;
	} else if(colors[row][col]==2) {
		obj.style.background = "#ffffff";
		colors[row][col] = 0;
	}
	console.log(colors[row][col])
}