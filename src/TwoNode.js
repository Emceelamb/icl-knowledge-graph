import { useEffect } from 'react';
import { useCSV } from './useCSV';

export const TwoNode = () => {

  const dataURL = [
    'https://gist.githubusercontent.com',
    'Emceelamb',
    '184a627df887fc945d202c69333cb133',
    'raw',
    '016259ba32443fd673e01693b30f3f91920aed7c',
    //'transformers_2021-11-09.csv'   // AAPL STOCKS
    'correlation_bert_2021-10-13_10_59_32.csv'  // BERT
  ].join('/')


  const data = useCSV(dataURL)

  useEffect(()=>{
    if(!data){
      return <>Loading...</>

    }
      console.log(data)
  })


  return (
    <>
      <p>hello</p>
    </>
  )
} 