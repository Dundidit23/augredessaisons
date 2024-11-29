import React from 'react'
import PresentationPic from '../../../assets/images/20240609_172459.jpg';
import './presentation.scss'


const Presentation = () => {
  return (
    <div>
         <div className='presentation'>
         <h1>La nature vous accompagne</h1>
         </div>
         <div className='insider'>
             <div className='insider__img'>
               <img className='presentation__img' src={PresentationPic} alt="" />
             </div>
              <div className='insider__text'>
                  <p> In et dolor nulla. Fusce nec condimentum sem, vel laoreet massa. Nullam aliquet at arcu nec viverra.
                  Mauris eu leo porttitor, porttitor dolor nec, tincidunt metus.</p> 
                
                  <p> Maecenas at tincidunt ligula, molestie cursus risus. Mauris at massa suscipit metus rutrum posuere ut in neque. Cras vitae porta mi, sit amet placerat risus. Mauris libero tortor, tristique eget urna vel, pellentesque mattis dolor. Vivamus ut risus aliquam, efficitur mi ac, eleifend est. Maecenas vulputate tempor tincidunt. Duis mauris tortor, ornare sed erat vel, lobortis efficitur arcu. Phasellus luctus lacinia dictum. Aliquam a enim metus. Aenean quis pellentesque ante, et molestie leo. Aliquam ex mauris, aliquet non eros eget, cursus sagittis dolor. Nunc nec massa orci. Nunc laoreet efficitur efficitur. </p>   
             <h3>Au Gré des Saisons  <br/>   <span>vous conseille toute l'année</span></h3>
              </div>
           </div>
    </div>
  )
}
export default Presentation
