import React, { useRef, useState } from 'react';


interface timeUnit{
  hours:string|number;
  minutes:string|number;
  seconds:string|number;

}


const TimeBox= () => {
  // const {timeUnit}=props;
  const [units,setUnits]=useState<timeUnit>({
    hours:'',
    minutes:'',
    seconds:'',
  });
 

  const hour='Hour';
  const minute='Minutes';
  const second='Seconds';
  const start='Start';
  const stop='Stop';
  const restart='Restart';
  const intervalId=useRef<any>(null);
  const handleInput=(e:React.FormEvent<HTMLInputElement>)=>{
    const value=e.currentTarget.value;
    if(value.length>2){
      e.currentTarget.value=value.slice(0,2);
    }

  }
  const timerLogic=()=>{
    setUnits(prev=>{
      let {hours,minutes,seconds}=prev;
      minutes=Number(minutes);
      hours=Number(hours);
      seconds=Number(seconds);

      if(hours===0&&minutes===0&&seconds===0){
        hours='';
        minutes='';
        seconds='';
        handleStop();
        return {hours,minutes,seconds};

      }else if(seconds!==0){
        seconds=`${seconds<10?`0${seconds-1}`:seconds-1}`;

      }else if(minutes!==0&&seconds===0){
        seconds=59;
        minutes=`${minutes<10?`0${minutes-1}`:minutes-1}`
      }else if(hours!==0&&minutes===0){
        minutes=60;
        hours=`${hours<10?`0${hours-1}`:hours-1}`;
      }


      return{hours,minutes,seconds}
    }
      
      
     )
    
    

  }

  const handleStart=()=>{
    
    
    intervalId.current=setInterval(()=>{
      timerLogic();
      

    },1000);



  }
  const handleRestart=()=>{
    setUnits({
      hours:0,
      minutes:0,
      seconds:0,

    });
  }
  const handleStop=()=>{
    if(intervalId.current)
    clearInterval(intervalId.current)
  }
  const handleOnchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    // const value:string=(e.target.value);
    // const numericValue=Number(value);
    // if(numericValue>=24){
    //   e.target.value=((numericValue%24)).toString();
    // }
    const {value,name}=e.target;
    setUnits(prev=>
      ({...prev,[name]:value}))




  }
  
  return (
    <>
    <h1>Countdown Timer</h1>
    <form onSubmit={(e)=>{e.preventDefault();}} >
    <div className='timer-box-arrangement'>
      
      <div>
      <h3>{hour}</h3>
      <input type="number" className='timer-box-arrangement-input' name='hours' onChange={handleOnchange}  value={units.hours} onInput={handleInput} min={0} max={99} maxLength={2} placeholder='00' />
      <button className='button-start' onClick={handleStart}>{start}</button>

      </div>
    <div>
      <h3>{minute}</h3>
      <input type="number" className='timer-box-arrangement-input' name='minutes' value={units.minutes} onChange={handleOnchange} onInput={handleInput} min={0} max={99} maxLength={2} placeholder='00' />
      <button className='button-restart' onClick={handleRestart}>{restart}</button>

      </div>
    <div>
    <h3>{second}</h3>
      <input type="number" className='timer-box-arrangement-input' value={units.seconds} name='seconds' onChange={handleOnchange} onInput={handleInput} min={0} max={99} maxLength={2} placeholder='00' />
      <button className='button-stop' onClick={handleStop}>{stop}</button>

    </div>
    


    
    </div>
    </form>


      
      
      
    </>
  )
}

export default TimeBox;
