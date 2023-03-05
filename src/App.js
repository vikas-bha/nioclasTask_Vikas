import './App.css';
import {MathJaxContext, MathJax} from "better-react-mathjax"
import { useState , useEffect} from 'react';
import axios from "axios"


function App() {

   const questionTitles = ['AreaUnderTheCurve_901', 'BinomialTheorem_901', 'DifferentialCalculus2_901']
  // const questionObj = {'AreaUnderTheCurve_901': '', 'BinomialTheorem_901': '', 'DifferentialCalculus2_901':''}
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState('');

  const prevSlide = () => {
    console.log("previous")
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ?  questionTitles.length-1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    console.log("next slide")
    const isLastSlide = currentIndex ===  questionTitles.length-1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

 
useEffect(()=>{
  // if(!Object.entries(questionObj)[currentIndex][1])

  // {
    // console.log(Object.entries(questionObj)[currentIndex][1]);

    const questionSetter = async()=>{
      //Object.entries(questionObj)[currentIndex][0]
      fetch(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionTitles[currentIndex]}`
      )
        .then((response) => {
  
         if (response.ok) return response.json();
        })
        .then((data) => {
          console.log(data[0].Question);
          setQuestion(data[0].Question);
  
        })
      
  
    }
    questionSetter();

  // }
  
},[currentIndex])
  return (
   
     <MathJaxContext>
              <div className='container'>
              <div className='box'>
              <MathJax>{question}</MathJax>
              <button disabled={currentIndex===0} onClick={()=>prevSlide()}>prev</button>
              <button disabled={currentIndex===questionTitles.length-1} onClick={()=>nextSlide()}>next</button>

              </div>

              </div>
              
            
              

        </MathJaxContext>

  
  );
}

export default App;
