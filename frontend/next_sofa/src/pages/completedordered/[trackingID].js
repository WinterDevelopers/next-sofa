import { useDispatch } from 'react-redux';
import { resetCart } from '@/redux/cart';
import { useRouter } from 'next/router'; 
import nsapi from '../../../fetchurlconfig';
 
export default function Page({email,date,total,order,transaction_id,tracking_id}){
  const dispatch = useDispatch();
  dispatch(resetCart())

  function returnHome(){
    window.location.replace('/')
  }
  return <div style={{padding:'8rem 0rem'}}>
            <div className='completed_purchase'>
              <div>
                <h4>Purchase Receipt</h4>
                <div className='completed_purchase-note'>please take a screenshot of this Receipt and keep it safe</div>
                <h1>Successful</h1>
                <div className='transaction_ordernumber'>
                  <span>{transaction_id}</span>
                  <span>#{order}</span>
                </div>
                <ul>
                  <li>EMAIL: <b>{email}</b></li>
                  <li>DATE: <b>{date}</b></li>
                  <li>PRICE: <b>&#8358; {total}</b></li>
                  <li>TRACKING ID: <b>{tracking_id}</b></li>
                </ul>
              </div>
              <button type='button' className='btn-shadow' onClick={returnHome}>Close</button>
            </div>
        </div>;
}


export async function getServerSideProps(context){
  const slug = context.params['trackingID'];
  const url = `${nsapi}store/api/track-item/${slug}`;
  const fetched_data = await fetch(url);
  const product_data = await fetched_data.json();
  const {email,total,date,transaction_id,tracking_id, order} = product_data

  return {props:{email,total,transaction_id,tracking_id, date, order}}
}