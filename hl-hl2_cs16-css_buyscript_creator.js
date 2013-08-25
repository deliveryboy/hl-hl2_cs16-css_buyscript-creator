//var boolCSS = true;

var elemJsDiv;
var elemForm;
var elemTable;
var elemTbody;
var elemTr;
var elemTd;
var elemSelect;
var elemOption;
var elemOptionText;
var elemTextarea;

var elemValue;

var elemEval;
var y;
var x;
var evalData = new String();

var elemCloneKeys;
var elemCloneBindings;
var elemNewKeys;
var elemNewBindings;

keys.sort();
if(!boolCSS)
{
	bindings.sort();
}

function init_form()
{
	elemForm = document.createElement("form");
	elemForm.setAttribute("name", "formula1");
	elemForm.setAttribute("action", "");
	elemForm.setAttribute("method", "");
	elemTable = document.createElement("table");
	elemTable.setAttribute("border", "1");
	elemTable.setAttribute("cellpadding", "5");
	elemTable.setAttribute("cellspacing", "0");
	elemTbody = document.createElement("tbody");
	elemTr = document.createElement("tr");
	elemTd = document.createElement("td");
	elemSelect = document.createElement("select");
	elemSelect.setAttribute("name", "");
	elemSelect.onchange = 	function()
							{
								add_select(this);
								eval_data();
							}
	elemOption = document.createElement("option");
	elemOptionText = document.createTextNode("");

	elemOption.appendChild(elemOptionText);
	elemSelect.appendChild(elemOption);

	for(var i in keys)
	{
		elemOption = document.createElement("option");
		elemOptionText = document.createTextNode(keys[i]);

		elemOption.appendChild(elemOptionText);
		elemSelect.appendChild(elemOption);
	}

	elemTd.appendChild(elemSelect);
	elemTr.appendChild(elemTd);

	elemCloneKeys = elemTr.cloneNode(true);

	elemTbody.appendChild(elemTr);
	elemTable.appendChild(elemTbody);
	elemForm.appendChild(elemTable);

	elemJsDiv = document.getElementById("jsForm");
	elemJsDiv.appendChild(elemForm);

	elemTable = document.createElement("table");
	elemTable.setAttribute("border", "1");
	elemTable.setAttribute("cellpadding", "5");
	elemTable.setAttribute("cellspacing", "0");
	elemTbody = document.createElement("tbody");
	elemTr = document.createElement("tr");
	elemTd = document.createElement("td");
	elemTextarea = document.createElement("textarea");
	elemTextarea.setAttribute("name", "teamarena");
	elemTextarea.setAttribute("cols", "80");
	elemTextarea.setAttribute("rows", "25");

	elemTd.appendChild(elemTextarea);
	elemTr.appendChild(elemTd);
	elemTbody.appendChild(elemTr);
	elemTable.appendChild(elemTbody);

	elemJsDiv = document.getElementById("jsForm");
	elemJsDiv.lastChild.appendChild(elemTable);
}

function add_select(elem)
{
	elemTd = document.createElement("td");
	elemSelect = document.createElement("select");
	elemSelect.setAttribute("name", "");
	elemOption = document.createElement("option");
	elemOptionText = document.createTextNode("");

	elemOption.appendChild(elemOptionText);
	elemSelect.appendChild(elemOption);

	for(var i in bindings)
	{
		elemOption = document.createElement("option");
		elemOptionText = document.createTextNode(bindings[i]);

		elemOption.appendChild(elemOptionText);
		elemSelect.appendChild(elemOption);
	}

	elemTd.appendChild(elemSelect);

	elemCloneBindings = elemTd.cloneNode(true);

	elemNewKeys = elemCloneKeys.cloneNode(true);
	elemNewKeys.firstChild.firstChild.onchange = 	function()
													{
														add_select(this);
														eval_data();
													}
	elemNewBindings = elemCloneBindings.cloneNode(true);
	elemNewBindings.firstChild.onchange = 	function()
											{
												add_select(this);
												eval_data();
											}

	elemValue = elem.options[elem.selectedIndex].text;

	if(elemValue != "")
	{
		if(elem.parentNode == elem.parentNode.parentNode.lastChild)
		{
			elem.parentNode.parentNode.appendChild(elemNewBindings);
		}
		if((elem.parentNode.cellIndex == 1) && (elem.parentNode.parentNode == elem.parentNode.parentNode.parentNode.lastChild))
		{
			elem.parentNode.parentNode.parentNode.appendChild(elemNewKeys);
		}
	}
	else
	{
		if(elem.parentNode.cellIndex == 0)
		{
			if((elem.parentNode.parentNode == elem.parentNode.parentNode.parentNode.firstChild) && (elem.parentNode.parentNode == elem.parentNode.parentNode.parentNode.lastChild))
			{
				elem.parentNode.parentNode.removeChild(elem.parentNode.parentNode.lastChild);
			}
			else if((elem.parentNode.parentNode == elem.parentNode.parentNode.parentNode.lastChild) && (elem.parentNode.parentNode.previousSibling.firstChild.nextSibling == elem.parentNode.parentNode.previousSibling.lastChild))
			{
				elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
			}
			else if(elem.parentNode.parentNode == elem.parentNode.parentNode.parentNode.lastChild)
			{
				elem.parentNode.parentNode.removeChild(elem.parentNode.parentNode.lastChild);
			}
			else
			{
				elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
			}
		}
		else if(elem.parentNode.cellIndex == 1)
		{
			if((elem.parentNode.parentNode == elem.parentNode.parentNode.parentNode.lastChild.previousSibling) && (elem.parentNode == elem.parentNode.parentNode.lastChild.previousSibling) && (elem.parentNode.parentNode.parentNode.lastChild.firstChild == elem.parentNode.parentNode.parentNode.lastChild.lastChild))
			{
				elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode.parentNode.lastChild);
				elem.parentNode.parentNode.removeChild(elem.parentNode.parentNode.lastChild.previousSibling);
			}
			else
			{
				elem.parentNode.parentNode.removeChild(elem.parentNode);
			}
		}
		else
		{
			elem.parentNode.parentNode.removeChild(elem.parentNode);
		}
	}
}

function eval_data()
{
	elemEval = document.getElementById("jsForm");
	elemEval = elemEval.lastChild.firstChild.firstChild;

	evalData = "";

	y = elemEval.firstChild;
	while(y != elemEval.lastChild)
	{
		x = y.firstChild;
		if(x != x.parentNode.lastChild.previousSibling)
		{
			evalData += 'bind "';
			evalData += x.firstChild.options[x.firstChild.selectedIndex].text;
			evalData += '" "';
			x = x.nextSibling;
			while(x != y.lastChild)
			{
				if(!x.firstChild.options[x.firstChild.selectedIndex].text.match(/^---\s.*\s---$/))
				{
					if(boolCSS == true)
					{
						evalData += "buy ";
					}
					evalData += x.firstChild.options[x.firstChild.selectedIndex].text;
					if(x != x.parentNode.lastChild.previousSibling)
					{
						evalData += '; ';
					}
				}
				x = x.nextSibling;
			}
			evalData += '"\n';
		}
		y = y.nextSibling;
	}
	elemEval.parentNode.parentNode.lastChild.firstChild.firstChild.firstChild.firstChild.value = evalData;
}

init_form();
