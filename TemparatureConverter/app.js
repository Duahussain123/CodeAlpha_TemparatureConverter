var formula = `{
    "conversions": [
        {
            "from": "Celsius",
            "to": "Kelvin",
            "formula": "K = C + 273.15"
        },
        {
            "from": "Celsius",
            "to": "Fahrenheit",
            "formula": "F = (9/5)C + 32"
        },
        {
            "from": "Celsius",
            "to": "Rankine",
            "formula": "R = (9/5)C + 491.67"
            
        },
        {
            "from": "Celsius",
            "to": "Celsius",
            "formula": "C = C"
            
        },
        {
            "from": "Kelvin",
            "to": "Celsius",
            "formula": "C = K - 273.15"
        },
        {
            "from": "Kelvin",
            "to": "Fahrenheit",
            "formula": "F = (9/5)K - 459.67"
        },
        {
            "from": "Kelvin",
            "to": "Rankine",
            "formula": "R = K * 1.8"
        }, 
        {
            "from": "Kelvin",
            "to": "Kelvin",
            "formula": "K = K"
        },
        {
            "from": "Fahrenheit",
            "to": "Celsius",
            "formula": "C = (F - 32) * 5/9"
        },
        {
            "from": "Fahrenheit",
            "to": "Kelvin",
            "formula": "K = (F + 459.67) * 5/9"
        },
        {
            "from": "Fahrenheit",
            "to": "Rankine",
            "formula": "R = F + 459.67"
        },
        {
            "from": "Fahrenheit",
            "to": "Fahrenheit",
            "formula": "F = F"
        },
        {
            "from": "Rankine",
            "to": "Celsius",
            "formula": "C = (R - 491.67) * 5/9"
        },
        {
            "from": "Rankine",
            "to": "Kelvin",
            "formula": "K = R * 5/9"
        },
        {
            "from": "Rankine",
            "to": "Fahrenheit",
            "formula": "F = R - 459.67"
        },
        {
            "from": "Rankine",
            "to": "Rankine",
            "formula": "R = R"
        }
    ]
}`;


function _cmnRemoveAllErrorMessage()
{
    var allErrorBorder = document.getElementsByClassName('tool-error-border');
	var allErrorMessage = document.getElementsByClassName('tool-error-message');
	var i;
    // remove border
    for(i = (allErrorBorder.length) - 1; i>=0; i--)
    {
        allErrorBorder[i].classList.remove("tool-error-border");
    }
    // remove error message
    for(i = (allErrorMessage.length) - 1; i>=0; i--)
    {
        allErrorMessage[i].remove();
    }	  
}

function ValidateTemperatureCalculatorForm()
{
    _cmnRemoveAllErrorMessage();
    
    var inputTemperature = document.getElementById("inputTemperature").value;
    if(inputTemperature == "" || isNaN(inputTemperature) || Number(inputTemperature) <= 0)
    {
        _cmnShowErrorMessageBottomOfTheInputField("inputTemperature", "Enter valid temperature.");
        return false;
    }
    return true;
}

function CalculateTemperature()
{
    if(ValidateTemperatureCalculatorForm())
    {
        var fromUnit = document.getElementById("fromUnit").value;
        var toUnit = document.getElementById("toUnit").value;
        var inputTemperature = document.getElementById("inputTemperature").value;
        var outputTemperature = document.getElementById("outputTemperature");
        
        ShowFormula(fromUnit, toUnit);
        
        var result = ConverterTemperature(inputTemperature,  fromUnit,  toUnit);
        
        outputTemperature.value = result.toFixed(2);
        document.getElementById("temperatureResult").innerHTML = formatResult(inputTemperature,result,fromUnit,toUnit);

        //result div show
        _cmnHideElement("OutputInfo");
        _cmnShowElement("OutputResult", "flex");
    }
}

function ConverterTemperature(inputTemperature,  fromUnit,  toUnit)
{
    fromUnit = fromUnit.toLowerCase();
    toUnit = toUnit.toLowerCase();
    inputTemperature = Number(inputTemperature);
    var outputTemperature;

    if (fromUnit == "celsius")
    {
        if (toUnit == "kelvin")
        {
            outputTemperature = (inputTemperature + 273.15);
        }
        else if (toUnit == "fahrenheit")
        {
            outputTemperature = (inputTemperature * (9 / 5) + 32);
        }
        else if (toUnit == "rankine")
        {
            outputTemperature = (inputTemperature * 9/5) + 491.67;
        }else{
            outputTemperature = inputTemperature;
        }
    }
    else if (fromUnit == "kelvin")
    {
        if (toUnit == "celsius")
        {
            outputTemperature = inputTemperature - 273.15;
        }
        else if (toUnit == "fahrenheit")
        {
            outputTemperature = (inputTemperature - 273.15) * 9/5 - 459.67;
        }
        else if (toUnit == "rankine")
        {
            outputTemperature = inputTemperature * 9/5 + 491.67;
        }else{
            outputTemperature = inputTemperature;
        }
    }
    else if (fromUnit == "fahrenheit")
    {
        if (toUnit == "celsius")
        {
            outputTemperature = (inputTemperature - 32) * 5/9;
        }
        else if (toUnit == "kelvin")
        {
            outputTemperature = (inputTemperature + 459.67) * 5/9;
        }
        else if (toUnit == "rankine")
        {
            outputTemperature = inputTemperature + 459.67;
        }else{
            outputTemperature = inputTemperature;
        }
    }
    else if (fromUnit == "rankine")
    {
        if (toUnit == "celsius")
        {
            outputTemperature = (inputTemperature - 491.67) * 5/9;
        }
        else if (toUnit == "kelvin")
        {
            outputTemperature = inputTemperature * 5/9;
        }
        else if (toUnit == "fahrenheit")
        {
            outputTemperature = inputTemperature - 459.67;
        }else{
            outputTemperature = inputTemperature;
        }
    }  
    return outputTemperature;
}

function ShowFormula(fromUnit,toUnit)
{
    const formulaJSONobj = JSON.parse(formula);
    for(var i = 0; i <formulaJSONobj.conversions.length; i++)
    {            
        if(
            formulaJSONobj.conversions[i].from.toLowerCase() == fromUnit.toLowerCase() 
            && formulaJSONobj.conversions[i].to.toLowerCase() == toUnit.toLowerCase()
            )
        {
            document.getElementById("temperatureFormula").innerHTML = formulaJSONobj.conversions[i].formula;
        }
    }
}
