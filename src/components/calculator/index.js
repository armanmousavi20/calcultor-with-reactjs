import React , { useState } from 'react';
import { Container , Screen , Previous , Current , Button } from './Styled';


const Calculator = () =>
{
    const [current,setCurrent] = useState('');
    const [previous,setPrevious] = useState('');
    const [operation,setOperation] = useState('');
    const appendValue = (e) =>
    {
       const value = e.target.getAttribute('data');
       if(value === '.' && current.includes('.')) return
       setCurrent(current + value);
    }

    const handleDelete = () => { setCurrent(String(current).slice(0,-1));  }
    const handleAllClear = () =>{ setCurrent('');
                                  setPrevious('');
                                  setOperation(""); }

    const compute = () =>
       {
         let result;
         let previousNumber = parseFloat(previous);
         let currentNumber = parseFloat(current);
         if(isNaN(previousNumber) || isNaN(currentNumber)) return;
         switch(operation)
         {
            case '+' :
                result = previousNumber + currentNumber;
                break;

            case '-' :
                result = previousNumber - currentNumber;
                break;

            case 'x' :
                result = previousNumber * currentNumber;
                break;

            case '/' :
                result = previousNumber / currentNumber;
                break;
            
            default :
                break;
         }

         return result;
       }                                  
    const chooseOperation = (e) =>
    {
        if(current === '' && operation ==='') return;
        if(current ==='' && operation !== '')
         { 
            setOperation(e.target.getAttribute('data'));
            return
         }
        
        if(previous !== '')
          {
            let value = compute();
            setPrevious(value);
          }
        else 
          {
             setPrevious(current);
          }  
        setCurrent('');
        setOperation(e.target.getAttribute('data'));
    }    
     
    const equals = () => 
    {
        const value = compute();
        if( value === undefined || value === null ) return ;
        setCurrent(value);
        setPrevious('');
        setOperation('');
    }
    return(<Container> 
                 <Screen>
                    <Previous> {previous} {operation} </Previous>
                    <Current> {current} </Current>                    
                 </Screen>
                 <Button gridSpan={2}
                         onClick={handleAllClear}
                         id="button1"                       
                         style={{backgroundColor:'skyblue'}}
                         onMouseOver={()=>{document.getElementById("button1").style.backgroundColor='white'}} 
                         onMouseLeave={()=>{document.getElementById("button1").style.backgroundColor='skyblue'}}>AC</Button>
                 <Button onClick={handleDelete} control>DEL</Button>
                 <Button onClick={chooseOperation} data={'/'} operation>/</Button>
                 <Button data={'7'} onClick={appendValue}> 7 </Button>
                 <Button data={'8'} onClick={appendValue}> 8 </Button>
                 <Button data={'9'} onClick={appendValue}>9</Button>
                 <Button onClick={chooseOperation} data={'x'} operation>x</Button>
                 <Button data={'4'} onClick={appendValue}> 4 </Button>
                 <Button data={'5'} onClick={appendValue}> 5 </Button>
                 <Button data={'6'} onClick={appendValue}> 6 </Button>
                 <Button onClick={chooseOperation} data={'+'} operation>+</Button>
                 <Button data={'1'} onClick={appendValue}> 1 </Button>
                 <Button data={'2'} onClick={appendValue}> 2 </Button>
                 <Button data={'3'} onClick={appendValue}> 3 </Button>
                 <Button onClick={chooseOperation} data={'-'} operation>-</Button>
                 <Button control style={{ borderBottomLeftRadius : '10px' }}
                         data={'.'} onClick={appendValue}>.</Button>
                 <Button data={'0'} onClick={appendValue}>0</Button>
                 <Button data={'='} id="id1" gridSpan={2} 
                         onClick={equals}
                                  style={{backgroundColor:'gray',
                                          borderBottomRightRadius : '10px'}}
                                  onMouseOver={()=>{document.getElementById("id1").style.backgroundColor='white'}} 
                                  onMouseLeave={()=>{document.getElementById("id1").style.backgroundColor='gray'}}>=</Button>
            </Container>)
}

export default Calculator;